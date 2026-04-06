import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../../store/auth/authSlice';
import { loginApi } from '../../../api/authApi';
import AuthHeader from './components/AuthHeader';
import CustomInput from '../../../components/common/CustomInput';
import CustomButton from '../../../components/common/CustomButton';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (email && password) {
      dispatch(loginStart());
      try {
        const data = await loginApi(email, password);
        dispatch(loginSuccess(data));
        navigation.replace('Dashboard');
      } catch (error) {
        dispatch(loginFailure(error.message));
        alert(error.message);
      }
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AuthHeader />
      
      <Text style={styles.heading}>Sign In</Text>

      <CustomInput
        label="Email Address"
        placeholder="Enter Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <CustomInput
        label="Password"
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        isPassword={true}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />

      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
      </TouchableOpacity>

        <CustomButton title="Sign In" onPress={handleLogin} />
      </ScrollView>
    </SafeAreaView>
  );
};


export default LoginScreen;
