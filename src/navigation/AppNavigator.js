import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import DashboardScreen from '../screens/DashboardScreen';

import EmployeeLeavesScreen from '../screens/EmployeeLeavesScreen';
import AddEmployeeLeaveScreen from '../screens/AddEmployeeLeaveScreen';

import EmploymentScreen from '../screens/Employment/EmploymentScreen';
import JobDetailsScreen from '../screens/Employment/JobDetailsScreen';
import BaseCompensationScreen from '../screens/Employment/BaseCompensationScreen';
import BenefitsScreen from '../screens/Employment/BenefitsScreen';
import GeneralTermsScreen from '../screens/Employment/GeneralTermsScreen';

import TimesheetScreen from '../screens/Timesheet/timesheet';
import AddTimesheetScreen from '../screens/Timesheet/AddTimesheetScreen';
import EditTimesheetScreen from '../screens/Timesheet/EditTimesheetScreen';

// ❌ REMOVE THIS
// import { LeaveProvider } from '../context/LeaveContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* ❌ REMOVE LeaveProvider */}
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {/* AUTH */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

        {/* DASHBOARD */}
        <Stack.Screen name="Dashboard" component={DashboardScreen} />

        {/* ✅ LEAVE MODULE (FIXED NAME) */}
        <Stack.Screen
          name="EmployeeLeavesScreen"
          component={EmployeeLeavesScreen}
        />
        <Stack.Screen
          name="AddEmployeeLeave"
          component={AddEmployeeLeaveScreen}
        />

        {/* EMPLOYMENT */}
        <Stack.Screen name="Employment" component={EmploymentScreen} />
        <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
        <Stack.Screen
          name="BaseCompensation"
          component={BaseCompensationScreen}
        />
        <Stack.Screen name="Benefits" component={BenefitsScreen} />
        <Stack.Screen name="GeneralTerms" component={GeneralTermsScreen} />

        {/* TIMESHEET */}
        <Stack.Screen name="Timesheet" component={TimesheetScreen} />
        <Stack.Screen name="AddTimesheet" component={AddTimesheetScreen} />
        <Stack.Screen name="EditTimesheet" component={EditTimesheetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
