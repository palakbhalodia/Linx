import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';

import LoginScreen from '../screens/Auth/Login/LoginScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPassword/ResetPasswordScreen';
import EmploymentScreen from '../screens/Employment/Main/EmploymentScreen';
import JobDetailsScreen from '../screens/Employment/JobDetails/JobDetailsScreen';
import BaseCompensationScreen from '../screens/Employment/BaseCompensation/BaseCompensationScreen';
import BenefitsScreen from '../screens/Employment/Benefits/BenefitsScreen';
import GeneralTermsScreen from '../screens/Employment/GeneralTerms/GeneralTermsScreen';
import TimesheetScreen from '../screens/Timesheet/timesheet';
import DrawerNavigator from './DrawerNavigator';
import PersonalScreen from '../screens/Personal/PersonalScreen';

const Stack = createNativeStackNavigator();

const logoRight = () => (
  <Image
    source={require('../assets/mlogo.png')}
    style={{ width: 24, height: 24, marginRight: 15 }}
    resizeMode="contain"
  />
);

const screenOpts = (title) => ({
  headerShown: true,
  title,
  headerShadowVisible: false,
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerStyle: { backgroundColor: '#FFFFFF' },
  headerRight: logoRight,
});

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: true, title: '', headerShadowVisible: false, headerBackTitleVisible: false, headerStyle: { backgroundColor: '#FFFFFF' } }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerShown: true, title: '', headerShadowVisible: false, headerBackTitleVisible: false, headerStyle: { backgroundColor: '#FFFFFF' } }}
      />
      <Stack.Screen name="Dashboard" component={DrawerNavigator} />
      <Stack.Screen name="Employment" component={EmploymentScreen} options={screenOpts('Employment Details')} />
      <Stack.Screen name="Personal" component={PersonalScreen} options={screenOpts('Personal')} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} options={screenOpts('Job Details')} />
      <Stack.Screen name="BaseCompensation" component={BaseCompensationScreen} options={screenOpts('Base Compensation')} />
      <Stack.Screen name="Benefits" component={BenefitsScreen} options={screenOpts('Benefits')} />
      <Stack.Screen name="GeneralTerms" component={GeneralTermsScreen} options={screenOpts('General Terms')} />
      <Stack.Screen name="Timesheet" component={TimesheetScreen} />
    </Stack.Navigator>
  );
}
