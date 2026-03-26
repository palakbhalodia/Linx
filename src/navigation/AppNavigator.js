import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EmploymentScreen from '../screens/Employment/EmploymentScreen';
import JobDetailsScreen from '../screens/Employment/JobDetailsScreen';
import BaseCompensationScreen from '../screens/Employment/BaseCompensationScreen';
import BenefitsScreen from '../screens/Employment/BenefitsScreen';
import GeneralTermsScreen from '../screens/Employment/GeneralTermsScreen';
import TimesheetScreen from '../screens/Timesheet/timesheet';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Employment" component={EmploymentScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      <Stack.Screen
        name="BaseCompensation"
        component={BaseCompensationScreen}
      />
      <Stack.Screen name="Benefits" component={BenefitsScreen} />
      <Stack.Screen name="GeneralTerms" component={GeneralTermsScreen} />
      <Stack.Screen name="Timesheet" component={TimesheetScreen} />
    </Stack.Navigator>
  );
}
