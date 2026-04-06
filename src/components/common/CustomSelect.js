import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomSelect = ({ label, value, placeholder, onPress, required = false }) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.asterisk}>*</Text>}
        </Text>
      )}
      <TouchableOpacity style={styles.inputBox} onPress={onPress}>
        <Text style={[styles.inputText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={20} color="#888" />
      </TouchableOpacity>

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
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputText: {
    fontSize: 14,
    color: '#000',
  },
  placeholder: {
    color: '#A0A0A0',
  },
});

export default CustomSelect;
