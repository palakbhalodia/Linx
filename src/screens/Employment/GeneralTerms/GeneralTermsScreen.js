import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

const GeneralTermsScreen = () => {
  const terms = useSelector((state) => state.employment.generalTerms);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Employment Type</Text>
        <Text style={styles.value}>{terms.employmentType}</Text>

        <Text style={styles.label}>Workplace</Text>
        <Text style={styles.value}>{terms.workplace}</Text>

        <Text style={styles.label}>Hire Date</Text>
        <Text style={styles.value}>{terms.hireDate}</Text>

        <Text style={styles.label}>Target Start Date</Text>
        <Text style={styles.value}>{terms.targetStartDate}</Text>

        <Text style={styles.label}>End Date</Text>
        <Text style={styles.value}>{terms.endDate}</Text>

        <Text style={styles.label}>Probation Period</Text>
        <Text style={styles.value}>{terms.probationPeriod}</Text>

        <Text style={styles.label}>Notice Period</Text>
        <Text style={styles.value}>{terms.noticePeriod}</Text>

        {/* Employee Leaves */}
        <Text style={styles.sectionTitle}>Employee Leaves</Text>
        <View style={styles.divider} />

        <Text style={styles.subHeading}>Leave Entitlement</Text>
        <Text style={styles.value}>Standard Leaves</Text>

        <View style={styles.leaveCard}>
          <Text style={styles.leaveTitle}>Sick Leave</Text>
          <Text style={styles.leaveDays}>Days: {terms.leaves.sick}</Text>
        </View>

        <View style={styles.leaveCard}>
          <Text style={styles.leaveTitle}>Earned Leave</Text>
          <Text style={styles.leaveDays}>Days: {terms.leaves.earned}</Text>
        </View>

        <Text style={styles.subHeading}>Custom Leaves</Text>
        <View style={styles.divider} />

        <View style={styles.leaveCard}>
          <Text style={styles.leaveTitle}>Annual Leave</Text>
          <Text style={styles.leaveDays}>Days: {terms.leaves.annual}</Text>
        </View>

        {/* Equipment Request */}
        <Text style={styles.sectionTitle}>Equipment Request</Text>
        <View style={styles.divider} />

        <Text style={styles.value}>We will provide the equipment</Text>

        {terms.equipment.map((item) => (
          <View key={item.id} style={styles.equipmentCard}>
            <Text style={styles.equipmentTitle}>{item.name}</Text>
            <Text style={styles.specText}>Specifications:</Text>
            <Text style={styles.specValue}>{item.spec}</Text>
            <Text style={styles.specValue}>{item.type}</Text>
            <Text style={styles.amountText}>Amount: {item.amount}</Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Cost (up to)</Text>
          <Text style={styles.totalValue}>₹60800</Text>
        </View>

        <Text style={styles.otherInfo}>Other Information</Text>
        <Text style={styles.footerText}>{terms.otherInfo}</Text>
      </ScrollView>
    </View>
  );
};

export default GeneralTermsScreen;
