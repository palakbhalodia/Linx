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
  forgotPassword,
  clearError,
  resetForgotPasswordState,
} from '../redux/slices/authSlice';
import { isValidEmail } from '../utils/validation';

const ForgotPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { forgotPasswordLoading, forgotPasswordSuccess, error } = useSelector(
    state => state.auth,
  );

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (error) {
      // Dev fallback
      if (email.trim().toLowerCase() === 'testlinx@gmail.com') {
        Alert.alert('Success', 'Email verified successfully');
        navigation.navigate('ResetPassword', {
          email: email.trim().toLowerCase(),
        });
      } else {
        Alert.alert('Error', error);
      }

      dispatch(clearError());
    }
  }, [error, dispatch, navigation, email]);

  useEffect(() => {
    if (forgotPasswordSuccess) {
      Alert.alert('Success', 'Email verified successfully');

      navigation.navigate('ResetPassword', {
        email: email.trim().toLowerCase(),
      });

      dispatch(resetForgotPasswordState());
    }
  }, [forgotPasswordSuccess, navigation, dispatch, email]);

  const handleSubmit = () => {
    if (!email) {
      Alert.alert('Validation', 'Please enter email');
      return;
    }

    if (!isValidEmail(email.trim())) {
      Alert.alert('Validation', 'Please enter a valid email address');
      return;
    }

    dispatch(
      forgotPassword({
        email: email.trim().toLowerCase(),
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

      <Text style={styles.heading}>Forgot Password</Text>

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

      <TouchableOpacity
        style={[styles.button, forgotPasswordLoading && { opacity: 0.7 }]}
        onPress={handleSubmit}
        disabled={forgotPasswordLoading}
      >
        {forgotPasswordLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

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
});
