import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
const TransferInput = ({
  label,
  onChangeText,
  value,
  placeholder,
  currencySymbol,
  onIconPress,
  numeric,
}) => {
  return (
    <View style={{width: '100%'}}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fieldView}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="rgba(125,125,125,1)"
          keyboardType={numeric}
        />
        {currencySymbol && (
          <View style={styles.icon}>
            <Text style={styles.iconText}>{currencySymbol}</Text>
          </View>
        )}
        {onIconPress && (
          <TouchableOpacity style={styles.icon} onPress={onIconPress}>
            <Text style={styles.iconText}>{onIconPress}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default TransferInput;

const styles = StyleSheet.create({
  input: {
    height: 43,
    width: '92%',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingLeft: 10,
    fontSize: 17,
    marginLeft: '4%',
    marginBottom: '1.5%',
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: '5%',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins Regular',
  },
  fieldView: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: '-10%',
    marginTop: '3%',
    paddingRight: '3.5%',
  },
  iconText: {
    marginLeft: -25,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
});
