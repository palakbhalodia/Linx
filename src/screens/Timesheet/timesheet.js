import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';

const TimesheetScreen = ({ navigation }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Current Month');
  const [selectedDateRange, setSelectedDateRange] = useState(
    '01/May/2024 - 31/May/2024',
  );

  const openFilter = () => {
    setFilterVisible(true);
  };

  const closeFilter = () => {
    setFilterVisible(false);
  };

  const handleApplyFilter = () => {
    setFilterVisible(false);
  };

  const handleResetFilter = () => {
    setSelectedMonth('Current Month');
    setSelectedDateRange('01/May/2024 - 31/May/2024');
    setFilterVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Timesheets</Text>

        <View style={styles.logoBox}>
          <Text style={styles.logoText}>✦</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTopRow}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Submitted</Text>
              <Text style={styles.summaryValue}>06:00 Hrs</Text>
            </View>

            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Not Submitted</Text>
              <Text style={styles.summaryValue}>04:00 Hrs</Text>
            </View>
          </View>

          <View style={styles.summaryBottomRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.totalValue}>24:00 Hrs</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.topButtonsRow}>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit for Review</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton} onPress={openFilter}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Date Section 1 */}
        <View style={styles.dateCard}>
          <Text style={styles.dateText}>05-10-2024</Text>

          <View style={styles.entryBlock}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>Home Page Design</Text>
              <Text style={styles.actionIcons}>✎ 🗑</Text>
            </View>
            <Text style={styles.entrySub}>Project: Website Design</Text>
            <Text style={styles.entrySub}>
              Status: <Text style={styles.pending}>Review</Text>
            </Text>
            <Text style={styles.entrySub}>
              Billable / Non-Billable: Non Billable
            </Text>
            <Text style={styles.entrySub}>Works Hours: 04:00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.entryBlock}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>About Us Page Design</Text>
              <Text style={styles.actionIcons}>✎ 🗑</Text>
            </View>
            <Text style={styles.entrySub}>Project: Website Design</Text>
            <Text style={styles.entrySub}>
              Status: <Text style={styles.pending}>Pending</Text>
            </Text>
            <Text style={styles.entrySub}>
              Billable / Non-Billable: Non Billable
            </Text>
            <Text style={styles.entrySub}>Works Hours: 02:00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.entryBlock}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>Services Page Design</Text>
              <Text style={styles.actionIcons}>✎ 🗑</Text>
            </View>
            <Text style={styles.entrySub}>Project: Website Design</Text>
            <Text style={styles.entrySub}>
              Status: <Text style={styles.pending}>Pending</Text>
            </Text>
            <Text style={styles.entrySub}>
              Billable / Non-Billable: Non Billable
            </Text>
            <Text style={styles.entrySub}>Works Hours: 02:00</Text>
          </View>
        </View>

        {/* Date Section 2 */}
        <View style={styles.dateCard}>
          <Text style={styles.dateText}>25-11-2024</Text>

          <View style={styles.entryBlock}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>Home Page HTML</Text>
              <Text style={styles.actionIcons}>✎ 🗑</Text>
            </View>
            <Text style={styles.entrySub}>Project: Troth</Text>
            <Text style={styles.entrySub}>
              Status: <Text style={styles.approved}>Approved</Text>
            </Text>
            <Text style={styles.entrySub}>
              Billable / Non-Billable:{' '}
              <Text style={styles.billable}>Billable</Text>
            </Text>
            <Text style={styles.entrySub}>Works Hours: 08:00</Text>
          </View>
        </View>

        {/* Date Section 3 */}
        <View style={styles.dateCard}>
          <Text style={styles.dateText}>26-11-2024</Text>

          <View style={styles.entryBlock}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>About us Page HTML</Text>
              <Text style={styles.actionIcons}>✎ 🗑</Text>
            </View>
            <Text style={styles.entrySub}>Project: Troth</Text>
            <Text style={styles.entrySub}>
              Status: <Text style={styles.rejected}>Reject</Text>
            </Text>
            <Text style={styles.entrySub}>
              Billable / Non-Billable: Non Billable
            </Text>
            <Text style={styles.entrySub}>Works Hours: 06:00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.entryBlock}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>About us Page HTML</Text>
              <Text style={styles.actionIcons}>✎ 🗑</Text>
            </View>
            <Text style={styles.entrySub}>Project: Troth</Text>
            <Text style={styles.entrySub}>
              Status: <Text style={styles.pending}>Review</Text>
            </Text>
            <Text style={styles.entrySub}>
              Billable / Non-Billable: Non Billable
            </Text>
            <Text style={styles.entrySub}>Works Hours: 02:00</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {/* FILTER MODAL */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={closeFilter}
      >
        <Pressable style={styles.modalOverlay} onPress={closeFilter}>
          <Pressable style={styles.bottomSheet}>
            <Text style={styles.filterTitle}>Filter</Text>

            {/* Month Dropdown */}
            <TouchableOpacity style={styles.filterInput}>
              <Text style={styles.filterInputText}>{selectedMonth}</Text>
              <Text style={styles.dropdownIcon}>⌄</Text>
            </TouchableOpacity>

            {/* Date Range */}
            <TouchableOpacity style={styles.dateRangeBox}>
              <Text style={styles.arrowIcon}>{'‹'}</Text>

              <View style={styles.dateRangeContent}>
                <Text style={styles.calendarIcon}>🗓</Text>
                <Text style={styles.dateRangeText}>{selectedDateRange}</Text>
              </View>

              <Text style={styles.arrowIcon}>{'›'}</Text>
            </TouchableOpacity>

            {/* Bottom Buttons */}
            <View style={styles.filterButtonsRow}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApplyFilter}
              >
                <Text style={styles.applyButtonText}>Apply Filter</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetFilter}
              >
                <Text style={styles.applyButtonText}>Reset Filter</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default TimesheetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    padding: 12,
    paddingBottom: 90,
  },

  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },

  summaryTopRow: {
    flexDirection: 'row',
  },

  summaryBox: {
    flex: 1,
    padding: 12,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
  },

  summaryBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },

  summaryLabel: {
    color: '#777',
    fontSize: 14,
  },

  summaryValue: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 3,
  },

  totalValue: {
    color: '#333',
    fontSize: 15,
    fontWeight: '600',
  },

  topButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  submitButton: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },

  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  filterButton: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  filterButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  dateCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  dateText: {
    color: '#999',
    fontSize: 12,
    marginBottom: 12,
  },

  entryBlock: {
    marginBottom: 10,
  },

  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  entryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    flex: 1,
  },

  actionIcons: {
    fontSize: 14,
    color: '#888',
  },

  entrySub: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  },

  pending: {
    color: '#F39C12',
    fontWeight: '600',
  },

  approved: {
    color: '#2E7D32',
    fontWeight: '600',
  },

  rejected: {
    color: '#D32F2F',
    fontWeight: '600',
  },

  billable: {
    color: '#2E7D32',
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 10,
  },

  fab: {
    position: 'absolute',
    bottom: 22,
    right: 22,
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  fabText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },

  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 18,
    paddingBottom: 28,
  },

  filterTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 18,
  },

  filterInput: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  filterInputText: {
    fontSize: 16,
    color: '#999',
  },

  dropdownIcon: {
    fontSize: 20,
    color: '#999',
  },

  dateRangeBox: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  dateRangeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  calendarIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  dateRangeText: {
    fontSize: 15,
    color: '#999',
  },

  arrowIcon: {
    fontSize: 24,
    color: '#999',
  },

  filterButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  applyButton: {
    flex: 1,
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },

  resetButton: {
    flex: 1,
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 8,
  },

  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
