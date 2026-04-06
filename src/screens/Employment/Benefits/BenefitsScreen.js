import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

const BenefitsScreen = () => {
  const benefits = useSelector((state) => state.employment.benefits);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Health Insurance</Text>
        <Text style={styles.value}>{benefits.healthInsurance}</Text>

        <Text style={styles.sectionTitle}>Extra Benefits</Text>
        <View style={styles.divider} />

        {benefits.extraBenefits.map((benefit) => (
          <View key={benefit.id} style={styles.benefitCard}>
            <Text style={styles.benefitTitle}>{benefit.name}</Text>
            <Text style={styles.benefitAmount}>Amount: {benefit.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BenefitsScreen;
