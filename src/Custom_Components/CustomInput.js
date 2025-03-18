import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
const CustomInput = ({
  label,
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
}) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry);
  return (
    <View>
      <View style={styles.lavelView}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.passwordFieldView}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="rgba(125,125,125,0.4)"
          secureTextEntry={showPassword}
        />
        {secureTextEntry && (
          <View style={styles.eyeIcon}>
            <TouchableOpacity
              style={{width: 24}}
              onPress={() => setShowPassword(!showPassword)}>
              {!showPassword ? (
                <Icon name="eye-off-outline" color={'black'} size={24} />
              ) : (
                <Icon name="eye-outline" color={'black'} size={24} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    height: 43,
    width: 300,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingLeft: 8,
    fontSize: 17,
  },
  label: {
    marginTop: 10,
    marginLeft: 3,
    fontSize: 19,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  passwordFieldView: {
    flexDirection: 'row',
  },
  eyeIcon: {
    marginLeft: '-10%',
    marginTop: '3%',
    paddingRight: '3.5%',
  },
});
