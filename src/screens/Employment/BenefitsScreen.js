import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const BenefitsScreen = ({ navigation, route }) => {
  const benefits = route?.params?.benefits || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Benefits</Text>

        <Image
          source={require('../../assets/mlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Health Insurance</Text>
        <Text style={styles.value}>
          {benefits?.medical ? 'Available' : 'No health insurance'}
        </Text>

        <Text style={styles.sectionTitle}>Extra Benefits</Text>

        <View style={styles.divider} />

        <View style={styles.benefitCard}>
          <Text style={styles.benefitTitle}>Provident Fund (PF)</Text>
          <Text style={styles.benefitAmount}>
            {benefits?.pf ? 'Yes' : 'No'}
          </Text>
        </View>

        <View style={styles.benefitCard}>
          <Text style={styles.benefitTitle}>Bonus</Text>
          <Text style={styles.benefitAmount}>
            {benefits?.bonus ? 'Yes' : 'No'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BenefitsScreen;

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
  benefitCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    flex: 1,
  },
  benefitAmount: {
    fontSize: 16,
    color: '#6F6F6F',
    marginLeft: 10,
  },
});
