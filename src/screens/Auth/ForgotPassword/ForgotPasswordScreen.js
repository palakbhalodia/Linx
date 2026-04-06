import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../Login/components/AuthHeader';
import CustomInput from '../../../components/common/CustomInput';
import CustomButton from '../../../components/common/CustomButton';
import { forgotPasswordApi } from '../../../api/authApi';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (email) {
      setLoading(true);
      try {
        const response = await forgotPasswordApi(email);
        alert(response.message);
        navigation.navigate('ResetPassword');
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter your email address');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AuthHeader />
        
        <Text style={styles.heading}>Forgot Password</Text>

      <CustomInput
        label="Email Address"
        placeholder="Enter Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

        <CustomButton title="Forgot Password" onPress={handleForgotPassword} />
      </ScrollView>
    </SafeAreaView>
  );
};


export default ForgotPasswordScreen;
