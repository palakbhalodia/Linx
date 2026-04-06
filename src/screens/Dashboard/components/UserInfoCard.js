import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserInfoCard = ({ name, role, initials }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </View>
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{role}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F0FF', // light purple background
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#6C5CE7',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 12,
    color: '#888',
  },
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  badgeContainer: {
    backgroundColor: '#8A2BE2', // distinct purple
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default UserInfoCard;
