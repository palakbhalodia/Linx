import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StatCard = ({ title, value, iconName, iconBgColor, iconColor }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}>
        <MaterialCommunityIcons name={iconName} size={20} color={iconColor} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textWrapper: {
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 12,
    color: '#666',
  },
  valueText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 2,
  },
});

export default StatCard;
