import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardHeader = ({ onMenuPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <MaterialCommunityIcons name="menu" size={28} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Dashboard</Text>
      <Image
        source={require('../../../assets/mlogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  logo: {
    width: 30,
    height: 30,
  },
});

export default DashboardHeader;
