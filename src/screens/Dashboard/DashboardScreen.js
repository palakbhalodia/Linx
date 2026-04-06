import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHeader from './components/DashboardHeader';
import UserInfoCard from './components/UserInfoCard';
import EmploymentDetailsCard from './components/EmploymentDetailsCard';
import StatCard from './components/StatCard';
import TimesheetSummaryCard from './components/TimesheetSummaryCard';

const DashboardScreen = ({ navigation }) => {
  const employmentDetails = [
    { label: 'Job Title', value: 'Software Developer' },
    { label: 'Department', value: 'Software' },
    { label: 'Country', value: 'India' },
    { label: 'Date of Birth', value: '04-01-1990' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <DashboardHeader onMenuPress={() => navigation.openDrawer()} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <UserInfoCard 
          name="Ramya Subramanian"
          initials="R" 
          role="Employee" 
        />

        <EmploymentDetailsCard 
          details={employmentDetails} 
          onViewPress={() => navigation.navigate('Employment')} 
        />

        <View style={styles.statsRow}>
          <StatCard 
            title="Expenses" 
            value="₹2500" 
            iconName="wallet-outline" 
            iconBgColor="#F3F0FF" 
            iconColor="#8A2BE2" 
          />
          <View style={styles.spacer} />
          <StatCard 
            title="Leaves" 
            value="10 Days" 
            iconName="calendar-arrow-right" 
            iconBgColor="#F3F0FF" 
            iconColor="#8A2BE2" 
          />
        </View>

        <TimesheetSummaryCard 
          total="05:00 Hrs"
          submitted="03:00 Hrs"
          notSubmitted="02:00 Hrs"
          onViewPress={() => navigation.navigate('Timesheet')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
