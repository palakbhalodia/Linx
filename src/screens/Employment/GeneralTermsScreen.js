import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const GeneralTermsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>General Terms</Text>

        <Image
          source={require('../../assets/mlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Employment Type</Text>
        <Text style={styles.value}>Full Time</Text>

        <Text style={styles.label}>Workplace</Text>
        <Text style={styles.value}>Office</Text>

        <Text style={styles.label}>Hire Date</Text>
        <Text style={styles.value}>04-01-2024</Text>

        <Text style={styles.label}>Target Start Date</Text>
        <Text style={styles.value}>04-05-2024</Text>

        <Text style={styles.label}>End Date</Text>
        <Text style={styles.value}>04-10-2024</Text>

        <Text style={styles.label}>Probation Period</Text>
        <Text style={styles.value}>10 Days</Text>

        <Text style={styles.label}>Notice Period</Text>
        <Text style={styles.value}>1 Months</Text>

        {/* Employee Leaves */}
        <Text style={styles.sectionTitle}>Employee Leaves</Text>
        <View style={styles.divider} />

        <Text style={styles.subHeading}>Leave Entitlement</Text>
        <Text style={styles.value}>Standard Leaves</Text>

        <View style={styles.leaveCard}>
          <Text style={styles.leaveTitle}>Sick Leave</Text>
          <Text style={styles.leaveDays}>Days: 1</Text>
        </View>

        <View style={styles.leaveCard}>
          <Text style={styles.leaveTitle}>Earned Leave</Text>
          <Text style={styles.leaveDays}>Days: 2</Text>
        </View>

        <Text style={styles.subHeading}>Custom Leaves</Text>
        <View style={styles.divider} />

        <View style={styles.leaveCard}>
          <Text style={styles.leaveTitle}>Annual Leave</Text>
          <Text style={styles.leaveDays}>Days: 5</Text>
        </View>

        {/* Equipment Request */}
        <Text style={styles.sectionTitle}>Equipment Request</Text>
        <View style={styles.divider} />

        <Text style={styles.value}>We will provide the equipment</Text>

        <View style={styles.equipmentCard}>
          <Text style={styles.equipmentTitle}>Laptop</Text>
          <Text style={styles.specText}>Specifications:</Text>
          <Text style={styles.specValue}>Lenovo laptop</Text>
          <Text style={styles.specValue}>Purchase</Text>
          <Text style={styles.amountText}>Amount: ₹60000</Text>
        </View>

        <View style={styles.equipmentCard}>
          <Text style={styles.equipmentTitle}>Keyboard</Text>
          <Text style={styles.specText}>Specifications:</Text>
          <Text style={styles.specValue}>Lenovo K120 Wired USB</Text>
          <Text style={styles.specValue}>Client Issued</Text>
          <Text style={styles.amountText}>Amount: ₹800</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Cost (up to)</Text>
          <Text style={styles.totalValue}>₹60800</Text>
        </View>

        <Text style={styles.otherInfo}>Other Information</Text>
        <Text style={styles.footerText}>
          Are you looking for a generic job description template, a specific
          role, or a summary of job responsibilities for a particular position?
        </Text>
      </ScrollView>
    </View>
  );
};

export default GeneralTermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 2,
  },
  back: {
    fontSize: 28,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  logo: {
    width: 40,
    height: 40,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  label: {
    fontSize: 15,
    color: '#7A7A7A',
    marginTop: 8,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111',
    fontWeight: '700',
    marginTop: 22,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#D8D8D8',
    marginBottom: 12,
  },
  leaveCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leaveTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  leaveDays: {
    fontSize: 14,
    color: '#777',
  },
  equipmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  equipmentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  specText: {
    fontSize: 13,
    color: '#777',
  },
  specValue: {
    fontSize: 14,
    color: '#444',
  },
  amountText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    marginTop: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  otherInfo: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
});
