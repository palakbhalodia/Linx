import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AuthHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    paddingTop: 10,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'flex-start',
  },
});

export default AuthHeader;
