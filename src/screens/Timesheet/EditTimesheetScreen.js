import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';

const projectOptions = [
  'Website Design',
  'Troth',
  'Mobile App UI',
  'Admin Dashboard',
  'Web Design',
];

const months = ['May', 'Oct', 'Nov', 'Dec'];

const EditTimesheetScreen = ({ navigation, route }) => {
  const entry = route.params?.entry;

  const [date, setDate] = useState(entry?.date || '');
  const [project, setProject] = useState(entry?.project || '');
  const [taskName, setTaskName] = useState(entry?.taskName || '');
  const [startTime, setStartTime] = useState(entry?.startTime || '');
  const [endTime, setEndTime] = useState(entry?.endTime || '');

  const [projectDropdownVisible, setProjectDropdownVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [timeType, setTimeType] = useState('start');

  const [selectedMonth, setSelectedMonth] = useState('Nov');
  const [selectedYear, setSelectedYear] = useState('2024');

  const openTimePicker = type => {
    setTimeType(type);
    setTimePickerVisible(true);
  };

  const handleSelectTime = time => {
    if (timeType === 'start') {
      setStartTime(time);
    } else {
      setEndTime(time);
    }
    setTimePickerVisible(false);
  };

  const handleSelectDate = day => {
    const monthMap = {
      May: '05',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
    const formattedDate = `${String(day).padStart(2, '0')}-${
      monthMap[selectedMonth]
    }-${selectedYear}`;
    setDate(formattedDate);
    setDatePickerVisible(false);
  };

  const handleUpdate = () => {
    if (!date || !project || !taskName || !startTime || !endTime) {
      Alert.alert('Validation', 'Please fill all required fields');
      return;
    }

    navigation.navigate('Timesheet', {
      updatedEntry: {
        id: entry.id,
        date,
        project,
        taskName,
        startTime,
        endTime,
      },
    });
  };

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(
        <TouchableOpacity
          key={i}
          style={styles.dayBox}
          onPress={() => handleSelectDate(i)}
        >
          <Text style={styles.dayText}>{i}</Text>
        </TouchableOpacity>,
      );
    }
    return days;
  };

  const timeOptions = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Timesheet</Text>

        <Image
          source={require('../../assets/mlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>
          Date <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text style={[styles.inputText, !date && styles.placeholderText]}>
            {date || 'MM-DD-YYYY'}
          </Text>
          <Text style={styles.icon}>🗓</Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          Project <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setProjectDropdownVisible(!projectDropdownVisible)}
        >
          <Text style={[styles.inputText, !project && styles.placeholderText]}>
            {project || 'Select Project'}
          </Text>
          <Text style={styles.icon}>⌄</Text>
        </TouchableOpacity>

        {projectDropdownVisible && (
          <View style={styles.dropdownBox}>
            {projectOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setProject(item);
                  setProjectDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>
          Task Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Task Name"
          placeholderTextColor="#A0A0A0"
          value={taskName}
          onChangeText={setTaskName}
          maxLength={500}
        />
        <Text style={styles.helperText}>Max 500 characters allowed</Text>

        <Text style={styles.label}>
          Start Time <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => openTimePicker('start')}
        >
          <Text
            style={[styles.inputText, !startTime && styles.placeholderText]}
          >
            {startTime || '--:--'}
          </Text>
          <Text style={styles.icon}>🕒</Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          End Time <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => openTimePicker('end')}
        >
          <Text style={[styles.inputText, !endTime && styles.placeholderText]}>
            {endTime || '--:--'}
          </Text>
          <Text style={styles.icon}>🕒</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
          <Text style={styles.saveButtonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* DATE PICKER */}
      <Modal visible={datePickerVisible} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDatePickerVisible(false)}
        >
          <Pressable style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select Date</Text>

            <View style={styles.calendarTopRow}>
              <TouchableOpacity
                onPress={() => {
                  const currentIndex = months.indexOf(selectedMonth);
                  if (currentIndex > 0) {
                    setSelectedMonth(months[currentIndex - 1]);
                  }
                }}
              >
                <Text style={styles.navArrow}>{'‹'}</Text>
              </TouchableOpacity>

              <Text style={styles.calendarMonth}>
                {selectedMonth} {selectedYear}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  const currentIndex = months.indexOf(selectedMonth);
                  if (currentIndex < months.length - 1) {
                    setSelectedMonth(months[currentIndex + 1]);
                  }
                }}
              >
                <Text style={styles.navArrow}>{'›'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.daysGrid}>{renderDays()}</View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* TIME PICKER */}
      <Modal visible={timePickerVisible} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setTimePickerVisible(false)}
        >
          <Pressable style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select Time</Text>

            {timeOptions.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={styles.timeOption}
                onPress={() => handleSelectTime(time)}
              >
                <Text style={styles.timeOptionText}>{time}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default EditTimesheetScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7' },
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
    width: 40,
    height: 40,
  },
  content: { padding: 16, paddingBottom: 30 },

  label: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
    marginTop: 12,
  },
  required: { color: 'red' },

  inputBox: {
    height: 54,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: { fontSize: 16, color: '#222' },
  placeholderText: { color: '#A0A0A0' },
  icon: { fontSize: 18, color: '#999' },

  dropdownBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownText: { fontSize: 15, color: '#333' },

  textInput: {
    height: 54,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#222',
  },
  helperText: {
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: 6,
  },

  saveButton: {
    marginTop: 24,
    backgroundColor: '#1E88E5',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 16,
  },

  calendarTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  navArrow: {
    fontSize: 28,
    color: '#1E88E5',
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  calendarMonth: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayText: { fontSize: 14, color: '#333', fontWeight: '500' },

  timeOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  timeOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
