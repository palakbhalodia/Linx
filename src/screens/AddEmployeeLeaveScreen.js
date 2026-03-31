import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Switch,
  Alert,
  Modal,
} from 'react-native';
import { useLeave } from '../context/LeaveContext';

const AddEmployeeLeaveScreen = ({ navigation }) => {
  const leaveContext = useLeave?.() || {};
  const addLeave = leaveContext?.addLeave || (() => {});

  const [leaveType, setLeaveType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [halfDay, setHalfDay] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [details, setDetails] = useState('');

  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [activeDateField, setActiveDateField] = useState('start'); // 'start' | 'end'

  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(
    String(today.getDate()).padStart(2, '0'),
  );
  const [selectedMonth, setSelectedMonth] = useState(
    String(today.getMonth() + 1).padStart(2, '0'),
  );
  const [selectedYear, setSelectedYear] = useState(String(today.getFullYear()));

  const leaveOptions = [
    'Casual Leave',
    'Sick Leave',
    'Earned Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Work From Home',
    'Unpaid Leave',
  ];

  const months = [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ];

  const years = useMemo(() => {
    const current = new Date().getFullYear();
    const arr = [];
    for (let y = current - 2; y <= current + 5; y++) {
      arr.push(String(y));
    }
    return arr;
  }, []);

  const getDaysInMonth = (month, year) => {
    return new Date(Number(year), Number(month), 0).getDate();
  };

  const days = useMemo(() => {
    const total = getDaysInMonth(selectedMonth, selectedYear);
    return Array.from({ length: total }, (_, i) =>
      String(i + 1).padStart(2, '0'),
    );
  }, [selectedMonth, selectedYear]);

  const formatDate = (year, month, day) => `${year}-${month}-${day}`;

  const parseDateToPicker = dateString => {
    if (!dateString || !dateString.includes('-')) {
      const now = new Date();
      return {
        day: String(now.getDate()).padStart(2, '0'),
        month: String(now.getMonth() + 1).padStart(2, '0'),
        year: String(now.getFullYear()),
      };
    }
    const [year, month, day] = dateString.split('-');
    return { day, month, year };
  };

  const openDateModal = field => {
    setActiveDateField(field);

    const existingDate = field === 'start' ? startDate : endDate;
    const parsed = parseDateToPicker(existingDate);

    setSelectedDay(parsed.day);
    setSelectedMonth(parsed.month);
    setSelectedYear(parsed.year);
    setDateModalVisible(true);
  };

  const handleConfirmDate = () => {
    const finalDate = formatDate(selectedYear, selectedMonth, selectedDay);

    if (activeDateField === 'start') {
      setStartDate(finalDate);
    } else {
      setEndDate(finalDate);
    }

    setDateModalVisible(false);
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 1;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;

    const diffTime = end - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays > 0 ? diffDays : 1;
  };

  const handleSelectLeaveType = type => {
    setLeaveType(type);
    setShowDropdown(false);
  };

  const handleAddLeave = () => {
    if (!leaveType || !startDate || !endDate || !details) {
      Alert.alert('Validation', 'Please fill all required fields');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      Alert.alert('Validation', 'End Date cannot be before Start Date');
      return;
    }

    const days = halfDay ? 0.5 : calculateDays();

    addLeave({
      type: leaveType,
      title: leaveType,
      fromDate: startDate,
      toDate: endDate,
      startDate,
      endDate,
      status: 'Pending',
      reviewedBy: 'None',
      detail: details,
      reason: details,
      days,
    });

    Alert.alert('Success', 'Leave added successfully', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const PickerColumn = ({ title, data, selectedValue, onSelect }) => (
    <View style={styles.pickerColumn}>
      <Text style={styles.pickerTitle}>{title}</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.pickerScroll}
      >
        {data.map(item => {
          const isSelected = item === selectedValue;
          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.pickerItem,
                isSelected && styles.pickerItemSelected,
              ]}
              onPress={() => onSelect(item)}
            >
              <Text
                style={[
                  styles.pickerItemText,
                  isSelected && styles.pickerItemTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add Employee Leaves</Text>

        <Image
          source={require('../assets/mlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          {/* Leave Type */}
          <Text style={styles.label}>
            Leave Type <Text style={styles.required}>*</Text>
          </Text>

          <TouchableOpacity
            style={styles.dropdownInput}
            activeOpacity={0.8}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text
              style={[
                styles.dropdownText,
                !leaveType && styles.placeholderText,
              ]}
            >
              {leaveType || 'Select Leave Type'}
            </Text>
            <Text style={styles.dropdownArrow}>{showDropdown ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownMenu}>
              {leaveOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleSelectLeaveType(item)}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Half Day */}
          <View style={styles.switchRow}>
            <Text style={styles.label}>Half Day</Text>
            <Switch value={halfDay} onValueChange={setHalfDay} />
          </View>

          {/* Start Date */}
          <Text style={styles.label}>
            Start Date <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.dateInput}
            activeOpacity={0.8}
            onPress={() => openDateModal('start')}
          >
            <Text
              style={[styles.dateText, !startDate && styles.placeholderText]}
            >
              {startDate || 'Select Start Date'}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          {/* End Date */}
          <Text style={styles.label}>
            End Date <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.dateInput}
            activeOpacity={0.8}
            onPress={() => openDateModal('end')}
          >
            <Text style={[styles.dateText, !endDate && styles.placeholderText]}>
              {endDate || 'Select End Date'}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Document</Text>
          <View style={styles.uploadBox}>
            <Text style={styles.uploadIcon}>⇪</Text>
            <Text style={styles.selectText}>Select File</Text>
            <Text style={styles.fileText}>
              .pdf, .jpg, .png, .doc and .docx files are supported.
            </Text>
          </View>

          <Text style={styles.label}>
            Additional Details <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter Additional Details"
            multiline
            numberOfLines={5}
            value={details}
            onChangeText={setDetails}
            maxLength={500}
          />
          <Text style={styles.note}>Max 500 characters allowed</Text>

          <TouchableOpacity style={styles.button} onPress={handleAddLeave}>
            <Text style={styles.buttonText}>Add Leave</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={dateModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {activeDateField === 'start'
                ? 'Select Start Date'
                : 'Select End Date'}
            </Text>

            <View style={styles.pickerRow}>
              <PickerColumn
                title="Day"
                data={days}
                selectedValue={selectedDay}
                onSelect={setSelectedDay}
              />
              <PickerColumn
                title="Month"
                data={months.map(m => m.value)}
                selectedValue={selectedMonth}
                onSelect={setSelectedMonth}
              />
              <PickerColumn
                title="Year"
                data={years}
                selectedValue={selectedYear}
                onSelect={setSelectedYear}
              />
            </View>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDateModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmDate}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddEmployeeLeaveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    elevation: 2,
  },
  logo: {
    width: 40,
    height: 40,
  },
  back: {
    fontSize: 26,
    color: '#111',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  formContainer: {
    padding: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
    marginTop: 10,
  },
  required: {
    color: 'red',
  },
  dropdownInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 15,
    color: '#111',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownArrow: {
    fontSize: 14,
    color: '#555',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 6,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#111',
  },
  switchRow: {
    marginTop: 14,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 15,
    color: '#111',
  },
  calendarIcon: {
    fontSize: 18,
  },
  uploadBox: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    fontSize: 28,
    color: '#666',
  },
  selectText: {
    color: '#1E88E5',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  fileText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingTop: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    color: '#111',
  },
  note: {
    fontSize: 11,
    color: '#999',
    marginTop: 6,
  },
  button: {
    backgroundColor: '#1E88E5',
    marginTop: 18,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 16,
    minHeight: 380,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 14,
    textAlign: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerColumn: {
    width: '31%',
  },
  pickerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  pickerScroll: {
    maxHeight: 220,
  },
  pickerItem: {
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#F4F6F8',
    alignItems: 'center',
  },
  pickerItemSelected: {
    backgroundColor: '#1E88E5',
  },
  pickerItemText: {
    fontSize: 15,
    color: '#111',
    fontWeight: '500',
  },
  pickerItemTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  modalButton: {
    width: '48%',
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ECEFF1',
  },
  confirmButton: {
    backgroundColor: '#1E88E5',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '700',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
