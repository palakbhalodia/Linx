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
import {
  resetPassword,
  clearError,
  resetResetPasswordState,
} from '../redux/slices/authSlice';

const ResetPasswordScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { resetPasswordLoading, resetPasswordSuccess, error } = useSelector(
    state => state.auth,
  );

  // ✅ Email ForgotPassword screen થી આવશે
  const email = route?.params?.email || '';

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (error) {
      // ✅ Dev fallback for testing
      if (
        email.trim().toLowerCase() === 'testlinx@gmail.com' &&
        code.trim() === '1234'
      ) {
        Alert.alert('Success', 'Password reset successfully');
        navigation.replace('Login');
      } else {
        Alert.alert('Error', error);
      }

      dispatch(clearError());
    }
  }, [error, dispatch, navigation, email, code]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      Alert.alert('Success', 'Password reset successfully');
      navigation.replace('Login');
      dispatch(resetResetPasswordState());
    }
  }, [resetPasswordSuccess, navigation, dispatch]);

  const handleReset = () => {
    if (!email || !code || !password || !confirmPassword) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validation', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation', 'Passwords do not match');
      return;
    }

    dispatch(
      resetPassword({
        email: email.trim().toLowerCase(),
        code: code.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
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

      <Text style={styles.heading}>Reset Password</Text>

      <Text style={styles.infoText}>Email: {email}</Text>

      <Text style={styles.label}>Code *</Text>
      <TextInput
        placeholder="Enter Code / OTP"
        value={code}
        onChangeText={setCode}
        style={styles.input}
        keyboardType="number-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>New Password *</Text>
      <TextInput
        placeholder="Enter New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Confirm Password *</Text>
      <TextInput
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={[styles.button, resetPasswordLoading && { opacity: 0.7 }]}
        onPress={handleReset}
        disabled={resetPasswordLoading}
      >
        {resetPasswordLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>

      <View style={styles.testBox}>
        <Text style={styles.testTitle}>Test Reset (Temporary)</Text>
        <Text style={styles.testText}>Email: testlinx@gmail.com</Text>
        <Text style={styles.testText}>Code: 5758</Text>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

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

  infoText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
    fontSize: 14,
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
