import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const BaseCompensationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Base Compensation</Text>

        <Image
          source={require('../../assets/mlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Pay Cycles</Text>
        <Text style={styles.value}>Monthly</Text>

        <Text style={[styles.label, { marginTop: 18 }]}>
          Gross Salary - Monthly
        </Text>
        <Text style={styles.value}>INR 50000</Text>

        <Text style={styles.sectionTitle}>Extra Allowances</Text>

        <View style={styles.divider} />

        <View style={styles.allowanceCard}>
          <Text style={styles.allowanceTitle}>Trip Allowance</Text>

          <View style={styles.allowanceRow}>
            <Text style={styles.allowanceSub}>Taxable: Yes</Text>
            <Text style={styles.allowanceAmount}>Amount: ₹10000</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BaseCompensationScreen;

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
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#7A7A7A',
    marginBottom: 6,
  },
  value: {
    fontSize: 18,
    color: '#222',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111',
    fontWeight: '700',
    marginTop: 26,
    marginBottom: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#D8D8D8',
    marginBottom: 18,
  },
  allowanceCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  allowanceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },
  allowanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allowanceSub: {
    fontSize: 16,
    color: '#6F6F6F',
  },
  allowanceAmount: {
    fontSize: 16,
    color: '#6F6F6F',
  },
});
