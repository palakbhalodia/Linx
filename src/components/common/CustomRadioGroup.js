import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomRadioGroup = ({ label, options, selectedValue, onSelect, required = false }) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.asterisk}>*</Text>}
        </Text>
      )}
      <View style={styles.row}>
        {options.map((option, index) => {
          const isActive = selectedValue === option.value;
          return (
            <TouchableOpacity 
              key={index} 
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => onSelect(option.value)}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    marginBottom: 5,
  },
  pillActive: {
    backgroundColor: '#8A2BE2',
    borderColor: '#8A2BE2',
  },
  pillText: {
    fontSize: 12,
    color: '#888',
  },
  pillTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CustomRadioGroup;
