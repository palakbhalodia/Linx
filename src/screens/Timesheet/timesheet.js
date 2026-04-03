import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getTimesheetList } from '../../api/timesheetApi';

const monthOptions = [
  'Current Month',
  'October 2024',
  'November 2024',
  'December 2024',
];

const monthDateMap = {
  'Current Month': { start: '01/May/2024', end: '31/May/2024' },
  'October 2024': { start: '01/Oct/2024', end: '31/Oct/2024' },
  'November 2024': { start: '01/Nov/2024', end: '30/Nov/2024' },
  'December 2024': { start: '01/Dec/2024', end: '31/Dec/2024' },
};

const calendarMonths = [
  { label: 'May 2024', days: 31, month: '05', year: '2024', short: 'May' },
  { label: 'Oct 2024', days: 31, month: '10', year: '2024', short: 'Oct' },
  { label: 'Nov 2024', days: 30, month: '11', year: '2024', short: 'Nov' },
  { label: 'Dec 2024', days: 31, month: '12', year: '2024', short: 'Dec' },
];

const formatDate = ddmmyyyy => {
  const [dd, mm, yyyy] = ddmmyyyy.split('-');
  return new Date(`${yyyy}-${mm}-${dd}`);
};

const formatRangeDate = (day, monthShort, year) => {
  return `${String(day).padStart(2, '0')}/${monthShort}/${year}`;
};

const extractMonthYearFromRange = rangeText => {
  const parts = rangeText.split(' - ');
  if (!parts[0]) return 'May 2024';
  const left = parts[0].split('/');
  return `${left[1]} ${left[2]}`;
};

const getStatusStyle = (status, styles) => {
  if (status === 'Approved') return styles.approved;
  if (status === 'Reject') return styles.rejected;
  return styles.pending;
};

const getBillableStyle = (billable, styles) => {
  return billable === 'Billable' ? styles.billable : null;
};

const convertInputDateToCardDate = dateText => {
  if (!dateText || !dateText.includes('-')) return dateText;

  const parts = dateText.split('-');

  if (parts[0].length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return dateText;
  }

  const [monthText, day, year] = parts;

  const monthMap = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  return `${day}-${monthMap[monthText]}-${year}`;
};

const calculateHours = (startTime, endTime) => {
  if (!startTime || !endTime) return '00:00';

  const convertTo24 = timeStr => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return { hours, minutes };
  };

  const start = convertTo24(startTime);
  const end = convertTo24(endTime);

  const startMinutes = start.hours * 60 + start.minutes;
  const endMinutes = end.hours * 60 + end.minutes;

  const diff = endMinutes - startMinutes;
  if (diff <= 0) return '00:00';

  const hrs = Math.floor(diff / 60);
  const mins = diff % 60;

  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

const TimesheetScreen = ({ navigation, route }) => {
  const employeeId = route?.params?.employeeId || 1;

  const [loading, setLoading] = useState(true);
  const [timesheetData, setTimesheetData] = useState([]);

  const [filterVisible, setFilterVisible] = useState(false);
  const [monthDropdownVisible, setMonthDropdownVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState('Current Month');
  const [selectedDateRange, setSelectedDateRange] = useState(
    '01/May/2024 - 31/May/2024',
  );

  const [tempMonth, setTempMonth] = useState(selectedMonth);
  const [tempDateRange, setTempDateRange] = useState(selectedDateRange);

  const [calendarMonthIndex, setCalendarMonthIndex] = useState(0);
  const [startDay, setStartDay] = useState(1);
  const [endDay, setEndDay] = useState(31);
  const [selectingStart, setSelectingStart] = useState(true);

  useEffect(() => {
    fetchTimesheetData();
  }, []);

  const fetchTimesheetData = async () => {
    try {
      setLoading(true);
      const data = await getTimesheetList(employeeId);
      setTimesheetData(data || []);
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Timesheet load error.';

      Alert.alert('Error', backendMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params?.newEntry) {
      const newItem = route.params.newEntry;

      const convertedDate = convertInputDateToCardDate(newItem.date);
      const calculatedHours = calculateHours(
        newItem.startTime,
        newItem.endTime,
      );

      const newEntryFormatted = {
        id: Date.now().toString(),
        title: newItem.taskName,
        project: newItem.project,
        status: 'Pending',
        billable: 'Non Billable',
        hours: calculatedHours,
        startTime: newItem.startTime,
        endTime: newItem.endTime,
      };

      setTimesheetData(prevData => {
        const existingDateIndex = prevData.findIndex(
          item => item.date === convertedDate,
        );

        if (existingDateIndex !== -1) {
          const updated = [...prevData];
          updated[existingDateIndex] = {
            ...updated[existingDateIndex],
            entries: [newEntryFormatted, ...updated[existingDateIndex].entries],
          };
          return updated;
        } else {
          return [
            {
              date: convertedDate,
              entries: [newEntryFormatted],
            },
            ...prevData,
          ];
        }
      });

      navigation.setParams({ newEntry: null });
    }
  }, [route.params?.newEntry, navigation]);

  useEffect(() => {
    if (route.params?.updatedEntry) {
      const updatedItem = route.params.updatedEntry;
      const convertedDate = convertInputDateToCardDate(updatedItem.date);
      const updatedHours = calculateHours(
        updatedItem.startTime,
        updatedItem.endTime,
      );

      setTimesheetData(prevData => {
        let foundOldEntry = null;

        const removedOld = prevData
          .map(section => {
            const matched = section.entries.find(e => e.id === updatedItem.id);
            if (matched) foundOldEntry = matched;

            return {
              ...section,
              entries: section.entries.filter(e => e.id !== updatedItem.id),
            };
          })
          .filter(section => section.entries.length > 0);

        const updatedEntry = {
          id: updatedItem.id,
          title: updatedItem.taskName,
          project: updatedItem.project,
          status: foundOldEntry?.status || 'Pending',
          billable: foundOldEntry?.billable || 'Non Billable',
          hours: updatedHours,
          startTime: updatedItem.startTime,
          endTime: updatedItem.endTime,
        };

        const existingDateIndex = removedOld.findIndex(
          item => item.date === convertedDate,
        );

        if (existingDateIndex !== -1) {
          const updated = [...removedOld];
          updated[existingDateIndex] = {
            ...updated[existingDateIndex],
            entries: [updatedEntry, ...updated[existingDateIndex].entries],
          };
          return updated;
        } else {
          return [
            {
              date: convertedDate,
              entries: [updatedEntry],
            },
            ...removedOld,
          ];
        }
      });

      navigation.setParams({ updatedEntry: null });
    }
  }, [route.params?.updatedEntry, navigation]);

  const handleDeleteEntry = entryId => {
    setTimesheetData(prevData =>
      prevData
        .map(section => ({
          ...section,
          entries: section.entries.filter(entry => entry.id !== entryId),
        }))
        .filter(section => section.entries.length > 0),
    );
  };

  const handleEditEntry = (entry, date) => {
    navigation.navigate('EditTimesheet', {
      entry: {
        id: entry.id,
        date,
        project: entry.project,
        taskName: entry.title,
        startTime: entry.startTime,
        endTime: entry.endTime,
      },
    });
  };

  const openFilter = () => {
    setTempMonth(selectedMonth);
    setTempDateRange(selectedDateRange);

    const currentLabel = extractMonthYearFromRange(selectedDateRange);
    const foundIndex = calendarMonths.findIndex(m => m.label === currentLabel);
    setCalendarMonthIndex(foundIndex >= 0 ? foundIndex : 0);

    setFilterVisible(true);
  };

  const closeFilter = () => {
    setMonthDropdownVisible(false);
    setCalendarVisible(false);
    setFilterVisible(false);
  };

  const handleSelectMonth = month => {
    setTempMonth(month);
    setMonthDropdownVisible(false);

    if (monthDateMap[month]) {
      setTempDateRange(
        `${monthDateMap[month].start} - ${monthDateMap[month].end}`,
      );

      const label =
        monthDateMap[month].start.split('/')[1] +
        ' ' +
        monthDateMap[month].start.split('/')[2];
      const foundIndex = calendarMonths.findIndex(m => m.label === label);
      if (foundIndex >= 0) {
        setCalendarMonthIndex(foundIndex);
        setStartDay(1);
        setEndDay(calendarMonths[foundIndex].days);
      }
    }
  };

  const openCalendar = () => {
    const currentLabel = extractMonthYearFromRange(tempDateRange);
    const foundIndex = calendarMonths.findIndex(m => m.label === currentLabel);
    const indexToUse = foundIndex >= 0 ? foundIndex : 0;

    setCalendarMonthIndex(indexToUse);

    const rangeParts = tempDateRange.split(' - ');
    if (rangeParts.length === 2) {
      const startParts = rangeParts[0].split('/');
      const endParts = rangeParts[1].split('/');

      setStartDay(Number(startParts[0]));
      setEndDay(Number(endParts[0]));
    }

    setSelectingStart(true);
    setCalendarVisible(true);
  };

  const handleSelectDay = day => {
    if (selectingStart) {
      setStartDay(day);
      if (day > endDay) setEndDay(day);
      setSelectingStart(false);
    } else {
      if (day < startDay) {
        setStartDay(day);
        setEndDay(day);
      } else {
        setEndDay(day);
      }
    }
  };

  const applyCalendar = () => {
    const currentMonth = calendarMonths[calendarMonthIndex];
    const start = formatRangeDate(
      startDay,
      currentMonth.short,
      currentMonth.year,
    );
    const end = formatRangeDate(endDay, currentMonth.short, currentMonth.year);
    setTempDateRange(`${start} - ${end}`);

    const mappedMonth = monthOptions.find(option => {
      if (option === 'Current Month') return false;
      return option.includes(
        currentMonth.short === 'Oct'
          ? 'October'
          : currentMonth.short === 'Nov'
          ? 'November'
          : currentMonth.short === 'Dec'
          ? 'December'
          : 'May',
      );
    });

    if (mappedMonth) setTempMonth(mappedMonth);

    setCalendarVisible(false);
  };

  const handleApplyFilter = () => {
    setSelectedMonth(tempMonth);
    setSelectedDateRange(tempDateRange);
    setFilterVisible(false);
    setMonthDropdownVisible(false);
    setCalendarVisible(false);
  };

  const handleResetFilter = () => {
    setSelectedMonth('Current Month');
    setSelectedDateRange('01/May/2024 - 31/May/2024');
    setTempMonth('Current Month');
    setTempDateRange('01/May/2024 - 31/May/2024');
    setMonthDropdownVisible(false);
    setCalendarVisible(false);
    setFilterVisible(false);
  };

  const filteredTimesheetData = useMemo(() => {
    const [startText, endText] = selectedDateRange.split(' - ');
    if (!startText || !endText) return timesheetData;

    const startParts = startText.split('/');
    const endParts = endText.split('/');

    const monthMap = {
      May: '05',
      Oct: '10',
      Nov: '11',
      Dec: '12',
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
    };

    const startDate = new Date(
      `${startParts[2]}-${monthMap[startParts[1]]}-${startParts[0]}`,
    );
    const endDate = new Date(
      `${endParts[2]}-${monthMap[endParts[1]]}-${endParts[0]}`,
    );

    return timesheetData.filter(item => {
      const itemDate = formatDate(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }, [selectedDateRange, timesheetData]);

  const renderCalendarDays = () => {
    const currentMonth = calendarMonths[calendarMonthIndex];
    const days = [];

    for (let i = 1; i <= currentMonth.days; i++) {
      const isInRange = i >= startDay && i <= endDay;
      const isStart = i === startDay;
      const isEnd = i === endDay;

      days.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.dayBox,
            isInRange && styles.dayBoxInRange,
            (isStart || isEnd) && styles.dayBoxSelected,
          ]}
          onPress={() => handleSelectDay(i)}
        >
          <Text style={[styles.dayText, isInRange && styles.dayTextSelected]}>
            {i}
          </Text>
        </TouchableOpacity>,
      );
    }

    return days;
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Timesheets</Text>

        <Image
          source={require('../../assets/mlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryTopRow}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Submitted</Text>
              <Text style={styles.summaryValue}>06:00 Hrs</Text>
            </View>

            <View style={styles.summaryBoxNoBorder}>
              <Text style={styles.summaryLabel}>Not Submitted</Text>
              <Text style={styles.summaryValue}>04:00 Hrs</Text>
            </View>
          </View>

          <View style={styles.summaryBottomRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.totalValue}>24:00 Hrs</Text>
          </View>
        </View>

        <View style={styles.topButtonsRow}>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit for Review</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton} onPress={openFilter}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.activeFilterText}>
          Showing: {selectedMonth} ({selectedDateRange})
        </Text>

        {filteredTimesheetData.length > 0 ? (
          filteredTimesheetData.map((section, index) => (
            <View key={index} style={styles.dateCard}>
              <Text style={styles.dateText}>{section.date}</Text>

              {section.entries.map((entry, entryIndex) => (
                <View key={entry.id}>
                  <View style={styles.entryBlock}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryTitle}>{entry.title}</Text>

                      <View style={styles.actionRow}>
                        <TouchableOpacity
                          onPress={() => handleEditEntry(entry, section.date)}
                        >
                          <Text style={styles.editIcon}>✎</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => handleDeleteEntry(entry.id)}
                        >
                          <Text style={styles.deleteIcon}>🗑</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Text style={styles.entrySub}>
                      Project: {entry.project}
                    </Text>

                    <Text style={styles.entrySub}>
                      Status:{' '}
                      <Text style={getStatusStyle(entry.status, styles)}>
                        {entry.status}
                      </Text>
                    </Text>

                    <Text style={styles.entrySub}>
                      Billable / Non-Billable:{' '}
                      <Text style={getBillableStyle(entry.billable, styles)}>
                        {entry.billable}
                      </Text>
                    </Text>

                    <Text style={styles.entrySub}>
                      Works Hours: {entry.hours}
                    </Text>
                  </View>

                  {entryIndex !== section.entries.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.noDataCard}>
            <Text style={styles.noDataText}>No timesheet data found</Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTimesheet')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={closeFilter}
      >
        <Pressable style={styles.modalOverlay} onPress={closeFilter}>
          <Pressable style={styles.bottomSheet}>
            <Text style={styles.filterTitle}>Filter</Text>

            <TouchableOpacity
              style={styles.filterInput}
              onPress={() => setMonthDropdownVisible(!monthDropdownVisible)}
            >
              <Text style={styles.filterInputText}>{tempMonth}</Text>
              <Text style={styles.dropdownIcon}>⌄</Text>
            </TouchableOpacity>

            {monthDropdownVisible && (
              <View style={styles.dropdownList}>
                {monthOptions.map((month, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectMonth(month)}
                  >
                    <Text style={styles.dropdownItemText}>{month}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.dateRangeBox}
              onPress={openCalendar}
            >
              <Text style={styles.arrowIcon}>{'‹'}</Text>

              <View style={styles.dateRangeContent}>
                <Text style={styles.calendarIcon}>🗓</Text>
                <Text style={styles.dateRangeText}>{tempDateRange}</Text>
              </View>

              <Text style={styles.arrowIcon}>{'›'}</Text>
            </TouchableOpacity>

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

      <Modal
        visible={calendarVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCalendarVisible(false)}
      >
        <View style={styles.calendarOverlay}>
          <View style={styles.calendarModal}>
            <Text style={styles.calendarTitle}>Select Date Range</Text>

            <View style={styles.calendarHeader}>
              <TouchableOpacity
                onPress={() =>
                  setCalendarMonthIndex(prev => (prev > 0 ? prev - 1 : prev))
                }
              >
                <Text style={styles.calendarNav}>{'‹'}</Text>
              </TouchableOpacity>

              <Text style={styles.calendarMonthLabel}>
                {calendarMonths[calendarMonthIndex].label}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setCalendarMonthIndex(prev =>
                    prev < calendarMonths.length - 1 ? prev + 1 : prev,
                  )
                }
              >
                <Text style={styles.calendarNav}>{'›'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.calendarHint}>
              {selectingStart ? 'Select Start Date' : 'Select End Date'}
            </Text>

            <View style={styles.daysGrid}>{renderCalendarDays()}</View>

            <Text style={styles.selectedRangePreview}>
              {formatRangeDate(
                startDay,
                calendarMonths[calendarMonthIndex].short,
                calendarMonths[calendarMonthIndex].year,
              )}{' '}
              -{' '}
              {formatRangeDate(
                endDay,
                calendarMonths[calendarMonthIndex].short,
                calendarMonths[calendarMonthIndex].year,
              )}
            </Text>

            <View style={styles.calendarButtonRow}>
              <TouchableOpacity
                style={styles.calendarCancelBtn}
                onPress={() => setCalendarVisible(false)}
              >
                <Text style={styles.calendarCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.calendarApplyBtn}
                onPress={applyCalendar}
              >
                <Text style={styles.calendarApplyText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TimesheetScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  back: { fontSize: 28, color: '#000' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#000' },
  logo: {
    height: 40,
    width: 40,
  },
  content: { padding: 12, paddingBottom: 90 },

  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  summaryTopRow: { flexDirection: 'row' },
  summaryBox: {
    flex: 1,
    padding: 12,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
  },
  summaryBoxNoBorder: {
    flex: 1,
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
  },
  summaryBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  summaryLabel: { color: '#777', fontSize: 14 },
  summaryValue: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 3,
  },
  totalValue: { color: '#333', fontSize: 15, fontWeight: '600' },

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
  submitButtonText: { color: '#fff', fontWeight: '600' },
  filterButton: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  filterButtonText: { color: '#fff', fontWeight: '600' },

  activeFilterText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
    marginLeft: 2,
  },

  dateCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  dateText: { color: '#999', fontSize: 12, marginBottom: 12 },
  entryBlock: { marginBottom: 10 },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignItems: 'center',
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    flex: 1,
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 16,
    color: '#9E9E9E',
    marginRight: 10,
  },
  deleteIcon: {
    fontSize: 16,
    color: '#4FC3F7',
  },

  entrySub: { fontSize: 13, color: '#666', marginBottom: 3 },
  pending: { color: '#F39C12', fontWeight: '600' },
  approved: { color: '#2E7D32', fontWeight: '600' },
  rejected: { color: '#D32F2F', fontWeight: '600' },
  billable: { color: '#2E7D32', fontWeight: '600' },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 10,
  },

  noDataCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  noDataText: { color: '#777', fontSize: 15 },

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
  fabText: { color: '#fff', fontSize: 26, fontWeight: 'bold' },

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
    marginBottom: 10,
  },
  filterInputText: { fontSize: 16, color: '#555' },
  dropdownIcon: { fontSize: 20, color: '#999' },

  dropdownList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  dropdownItemText: { fontSize: 15, color: '#333' },

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
  calendarIcon: { fontSize: 16, marginRight: 8 },
  dateRangeText: { fontSize: 15, color: '#555' },
  arrowIcon: { fontSize: 24, color: '#999' },

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
  applyButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  calendarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  calendarModal: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#111',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  calendarNav: {
    fontSize: 28,
    color: '#1E88E5',
    fontWeight: '600',
    paddingHorizontal: 8,
  },
  calendarMonthLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  calendarHint: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
    marginBottom: 14,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayBox: {
    width: '13%',
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayBoxInRange: { backgroundColor: '#DDEEFF' },
  dayBoxSelected: { backgroundColor: '#1E88E5' },
  dayText: { color: '#333', fontSize: 14, fontWeight: '500' },
  dayTextSelected: { color: '#fff', fontWeight: '700' },
  selectedRangePreview: {
    textAlign: 'center',
    fontSize: 15,
    color: '#333',
    marginTop: 8,
    marginBottom: 16,
    fontWeight: '500',
  },
  calendarButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarCancelBtn: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  calendarApplyBtn: {
    flex: 1,
    backgroundColor: '#1E88E5',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 8,
  },
  calendarCancelText: { color: '#333', fontSize: 15, fontWeight: '600' },
  calendarApplyText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
