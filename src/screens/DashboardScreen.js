import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';

const DashboardScreen = ({ navigation }) => {
  const handleViewEmployment = () => {
    navigation.navigate('Employment');
  };

  const handleViewTimesheet = () => {
    navigation.navigate('Timesheet');
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dashboard</Text>

          <Image
            source={require('../assets/mlogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.welcomeCard}>
          <View>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.name}>Ramya Subramanian</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Employee</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Employment Details</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={handleViewEmployment}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.label}>Job Title</Text>
            <Text style={styles.valueText}>Software Developer</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.valueText}>Software</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.label}>Country</Text>
            <Text style={styles.valueText}>India</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.valueText}>04-01-1990</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.smallCard}>
            <Text style={styles.smallTitle}>Expenses</Text>
            <Text style={styles.amount}>₹2500</Text>
          </View>

          <View style={styles.smallCard}>
            <Text style={styles.smallTitle}>Leaves</Text>
            <Text style={styles.amount}>10 Days</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Timesheets</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={handleViewTimesheet}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.timeCard}>
              <Text style={styles.timeLabel}>Total</Text>
              <Text style={styles.time}>05:00 Hrs</Text>
            </View>

            <View style={styles.timeCard}>
              <Text style={styles.timeLabel}>Submitted</Text>
              <Text style={styles.time}>03:00 Hrs</Text>
            </View>
          </View>

          <View style={styles.timeCardFull}>
            <Text style={styles.timeLabel}>Not Submitted</Text>
            <Text style={styles.time}>02:00 Hrs</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    elevation: 2,
  },

  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },

  logo: {
    width: 40,
    height: 40,
  },

  welcomeCard: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 14,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },

  welcome: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },

  name: {
    fontWeight: '700',
    fontSize: 18,
    color: '#111',
  },

  badge: {
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 14,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  cardTitle: {
    fontWeight: '700',
    fontSize: 17,
    color: '#111',
  },

  button: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  label: {
    color: '#888',
    fontSize: 14,
  },

  valueText: {
    color: '#222',
    fontSize: 14,
    fontWeight: '500',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 14,
  },

  smallCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: '48%',
    elevation: 2,
  },

  smallTitle: {
    color: '#888',
    fontSize: 14,
  },

  amount: {
    fontWeight: '700',
    marginTop: 6,
    fontSize: 16,
    color: '#111',
  },

  timeCard: {
    backgroundColor: '#F1F2F6',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    marginTop: 10,
  },

  timeCardFull: {
    backgroundColor: '#F1F2F6',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },

  timeLabel: {
    color: '#666',
    fontSize: 14,
  },

  time: {
    fontWeight: '700',
    marginTop: 6,
    fontSize: 16,
    color: '#111',
  },
});
