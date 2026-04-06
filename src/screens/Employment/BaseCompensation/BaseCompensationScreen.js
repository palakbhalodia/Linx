import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

const BaseCompensationScreen = () => {
  const baseComp = useSelector((state) => state.employment.baseCompensation);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Pay Cycles</Text>
        <Text style={styles.value}>{baseComp.payCycle}</Text>

        <Text style={[styles.label, { marginTop: 18 }]}>Gross Salary - Monthly</Text>
        <Text style={styles.value}>{baseComp.grossSalary}</Text>

        <Text style={styles.sectionTitle}>Extra Allowances</Text>

        <View style={styles.divider} />

        {baseComp.allowances.map((allowance) => (
          <View key={allowance.id} style={styles.allowanceCard}>
            <Text style={styles.allowanceTitle}>{allowance.name}</Text>
            <View style={styles.allowanceRow}>
              <Text style={styles.allowanceSub}>Taxable: {allowance.isTaxable ? 'Yes' : 'No'}</Text>
              <Text style={styles.allowanceAmount}>Amount: {allowance.amount}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BaseCompensationScreen;
