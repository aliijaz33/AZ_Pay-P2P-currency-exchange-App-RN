import React, {createContext, useState, useEffect} from 'react';
import io from 'socket.io-client';

const MessageNotificationContext = createContext();
const socket = io('http://10.0.2.2:4200');

export const MessageNotificationProvider = ({children}) => {
  const [newMessageReceived, setNewMessageReceived] = useState(false);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const handleMessageReceive = message => {
      setMessages(prevMessages => {
        const updatedMessages = {...prevMessages};
        if (
          !updatedMessages[message.sender]?.some(
            msg => msg.timestamp === message.timestamp,
          )
        ) {
          if (!updatedMessages[message.sender]) {
            updatedMessages[message.sender] = [];
          }
          updatedMessages[message.sender].push(message);
        }
        return updatedMessages;
      });
      setNewMessageReceived(true);
    };

    socket.on('receiveMessage', handleMessageReceive);

    return () => {
      socket.off('receiveMessage', handleMessageReceive);
    };
  }, []);

  const fetchMessages = async (email, notificationId) => {
    try {
      const response = await fetch(`http://10.0.2.2:4200/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, notificationId}),
      });
      const data = await response.json();
      setMessages(prevMessages => ({
        ...prevMessages,
        [email]: data.messages,
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const clearMessages = async (email, notificationId) => {
    try {
      await fetch('http://10.0.2.2:4200/clearMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, notificationId}),
      });
      setMessages(prevMessages => {
        const updatedMessages = {...prevMessages};
        if (updatedMessages[email]) {
          updatedMessages[email] = updatedMessages[email].filter(
            msg => msg.notificationId !== notificationId,
          );
        }
        return updatedMessages;
      });
    } catch (error) {
      console.error('Error clearing messages:', error);
    }
  };

  return (
    <MessageNotificationContext.Provider
      value={{
        newMessageReceived,
        setNewMessageReceived,
        messages,
        setMessages,
        fetchMessages,
        clearMessages,
      }}>
      {children}
    </MessageNotificationContext.Provider>
  );
};

export default MessageNotificationContext;
