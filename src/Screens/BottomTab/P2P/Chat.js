import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import io from 'socket.io-client';
import UserContext from '../../../UserContext';
import useRefreshUser from '../../../useRefreshUser';

const socket = io('http://10.0.2.2:4200');

const Chat = ({route}) => {
  const {recipientEmail} = route.params;
  const {user} = useContext(UserContext);
  const refreshUser = useRefreshUser();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');

  const scrollViewRef = useRef();

  useEffect(() => {
    socket.emit('joinRoom', {email: user.email});
    console.log(`Joining room: ${user.email}`);

    socket.on('receiveMessage', message => {
      console.log(`Message received: ${JSON.stringify(message)}`);
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.emit('leaveRoom', {email: user.email});
      console.log(`Leaving room: ${user.email}`);
    };
  }, [user.email]);

  const handleSendPress = () => {
    //refreshUser();
    if (msg.trim()) {
      const message = {email: user.email, text: msg, timestamp: new Date()};
      console.log(
        `Sending message: ${JSON.stringify(message)} to ${recipientEmail}`,
      );
      socket.emit('sendMessage', {email: recipientEmail, message});
      setMessages(prevMessages => [...prevMessages, message]);
      setMsg('');
    }
  };

  return (
    <Custom_BG>
      <View style={styles.container}>
        <ScrollView
          style={styles.messagesContainer}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.message,
                msg.email === user.email
                  ? styles.sentMessage
                  : styles.receivedMessage,
              ]}>
              <Text>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.chatContainer}>
          <TextInput
            style={styles.input}
            value={msg}
            placeholder="Type here"
            onChangeText={txt => setMsg(txt)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Custom_BG>
  );
};
export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '2%',
    paddingBottom: '10%',
  },
  messagesContainer: {flex: 1, marginBottom: 16, marginHorizontal: '1%'},
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  chatContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  input: {
    width: '83%',
    height: 45,
    borderColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: '2%',
    paddingLeft: 10,
    marginRight: '2%',
    backgroundColor: 'white',
  },
  sendButton: {
    height: 45,
    width: '15%',
    borderColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  sendButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins Regular',
  },
});
