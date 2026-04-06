import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../Login/components/AuthHeader';
import CustomInput from '../../../components/common/CustomInput';
import CustomButton from '../../../components/common/CustomButton';
import { resetPasswordApi } from '../../../api/authApi';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (email && code && newPassword) {
      setLoading(true);
      try {
        await resetPasswordApi(email, code, newPassword);
        alert('Password reset successfully!');
        navigation.navigate('Login');
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AuthHeader />
        
        <Text style={styles.heading}>Reset Password</Text>

      <CustomInput
        label="Email Address"
        placeholder="Enter Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <CustomInput
        label="Code"
        placeholder="Enter Code Received in Email"
        value={code}
        onChangeText={setCode}
      />

      <CustomInput
        label="New Password"
        placeholder="Set New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
      />
      <Text style={styles.instructions}>
        Password must contain 1 number, 1 special character, 1 lower case letter and 1 upper case letter and must be 10 character long.
      </Text>

        <CustomButton style={styles.buttonSpacing} title="Reset Password" onPress={handleResetPassword} />
      </ScrollView>
    </SafeAreaView>
  );
};


export default ResetPasswordScreen;
