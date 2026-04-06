import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EmploymentDetailsCard = ({ onViewPress, details }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>Employment Details</Text>
        <TouchableOpacity onPress={onViewPress}>
          <Text style={styles.viewLink}>View</Text>
        </TouchableOpacity>
      </View>
      
      {details.map((item, index) => (
        <View key={index} style={styles.detailRow}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  viewLink: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    flex: 1,
  },
});

export default EmploymentDetailsCard;
