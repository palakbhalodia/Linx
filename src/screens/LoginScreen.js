import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/slices/authSlice';
import { isValidEmail } from '../utils/validation';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error, isLoggedIn } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //  Your Temporary Working Test User
  const TEST_USER = {
    email: 'testlinx@gmail.com',
    password: '123456',
  };

  useEffect(() => {
    if (error) {
      if (
        email.trim().toLowerCase() === TEST_USER.email &&
        password.trim() === TEST_USER.password
      ) {
        Alert.alert('Success', 'Logged in with test user');
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Login Error', error);
      }

      dispatch(clearError());
    }
  }, [error, dispatch, email, password, navigation]);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.replace('Dashboard');
    }
  }, [isLoggedIn, navigation]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Please enter email and password');
      return;
    }

    if (!isValidEmail(email.trim())) {
      Alert.alert('Validation', 'Please enter a valid email address');
      return;
    }

    dispatch(
      loginUser({
        email: email.trim().toLowerCase(),
        password: password.trim(),
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.heading}>Sign In</Text>

      <Text style={styles.label}>Email *</Text>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Password *</Text>
      <TextInput
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: '#000',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgot: {
    textAlign: 'right',
    marginBottom: 15,
    color: '#007bff',
    fontWeight: '500',
  },
  testBox: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e9f3ff',
    borderWidth: 1,
    borderColor: '#b6d7ff',
  },
  testTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  testText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
});
