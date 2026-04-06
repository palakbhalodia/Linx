import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BasicTimeCard = ({ label, time, iconName, iconBg, iconColor, style }) => (
  <View style={[styles.timeCard, style]}>
    <View style={[styles.iconWrapper, { backgroundColor: iconBg }]}>
      <MaterialCommunityIcons name={iconName} size={20} color={iconColor} />
    </View>
    <View style={styles.timeTextWrapper}>
      <Text style={styles.timeLabel}>{label}</Text>
      <Text style={styles.timeValue}>{time}</Text>
    </View>
  </View>
);

const TimesheetSummaryCard = ({ onViewPress, total, submitted, notSubmitted }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>Timesheets</Text>
        <TouchableOpacity onPress={onViewPress}>
          <Text style={styles.viewLink}>View</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <BasicTimeCard 
          label="Total" 
          time={total} 
          iconName="clock-outline"
          iconBg="#E5F7ED" // light green
          iconColor="#28A745" // green
          style={styles.halfCard} 
        />
        <BasicTimeCard 
          label="Submitted" 
          time={submitted} 
          iconName="clock-check-outline"
          iconBg="#E6F2FF" // light blue
          iconColor="#007bff" // blue
          style={styles.halfCard} 
        />
      </View>

      <BasicTimeCard 
        label="Not Submitted" 
        time={notSubmitted} 
        iconName="clock-alert-outline"
        iconBg="#FFF3E0" // light orange
        iconColor="#FD7E14" // orange
        style={styles.fullCard} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    marginBottom: 30, // Extra padding at bottom of screen
    marginHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  viewLink: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCard: {
    width: '48%',
  },
  fullCard: {
    width: '100%',
    marginTop: 10,
  },
  timeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18, // Circular
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  timeTextWrapper: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
  },
  timeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 2,
  },
});

export default TimesheetSummaryCard;
