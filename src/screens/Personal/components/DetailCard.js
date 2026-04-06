import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailCard = ({ title, data }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.divider} />
      <View style={styles.content}>
        {data.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
  },
  content: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 12,
    color: '#888',
  },
  value: {
    flex: 1.2,
    fontSize: 12,
    color: '#222',
  },
});

export default DetailCard;
