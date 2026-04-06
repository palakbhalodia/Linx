import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  isPassword,
  onTogglePassword,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label} <Text style={styles.asterisk}>*</Text>
        </Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />

        {isPassword && (
          <TouchableOpacity onPress={onTogglePassword} style={styles.iconContainer}>
            <MaterialCommunityIcons 
              name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} 
              size={20} 
              color="#A0A0A0" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  asterisk: {
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#000',
  },
  iconContainer: {
    padding: 10,
  },
});

export default CustomInput;
