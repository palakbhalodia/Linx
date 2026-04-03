import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getLeaveList } from '../api/leaveApi';

const EmployeeLeavesScreen = ({ navigation, route }) => {
  const employeeId = route?.params?.employeeId || 1;

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaveData();
  }, []);

  useEffect(() => {
    if (route?.params?.newLeave) {
      const newLeave = {
        id: Date.now().toString(),
        type: route.params.newLeave.type || 'Leave',
        leaveType: route.params.newLeave.type || 'Leave',
        fromDate: route.params.newLeave.fromDate || '-',
        toDate: route.params.newLeave.toDate || '-',
        startDate: route.params.newLeave.fromDate || '-',
        endDate: route.params.newLeave.toDate || '-',
        days: route.params.newLeave.days || 1,
        reason: route.params.newLeave.reason || '-',
        status: 'Pending',
      };

      setLeaves(prev => [newLeave, ...prev]);
      navigation.setParams({ newLeave: null });
    }
  }, [route?.params?.newLeave, navigation]);

  const fetchLeaveData = async () => {
    try {
      setLoading(true);

      const data = await getLeaveList(employeeId);

      if (Array.isArray(data)) {
        setLeaves(data);
      } else if (Array.isArray(data?.data)) {
        setLeaves(data.data);
      } else if (Array.isArray(data?.leaves)) {
        setLeaves(data.leaves);
      } else {
        setLeaves([]);
      }
    } catch (error) {
      console.log('Leave Screen Error:', error);

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Leave data load error.';

      Alert.alert('Error', backendMessage);
      setLeaves([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLeave = () => {
    navigation.navigate('AddEmployeeLeave', { employeeId });
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
        <Text style={styles.headerTitle}>Employee Leaves</Text>

        <Image
          source={require('../assets/mlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {leaves.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No leave records found</Text>
          </View>
        ) : (
          leaves.map((item, index) => (
            <View key={item?.id || index} style={styles.leaveCard}>
              <View style={styles.rowBetween}>
                <Text style={styles.leaveType}>
                  {item?.type || item?.leaveType || 'Leave'}
                </Text>
                <Text
                  style={[
                    styles.status,
                    item?.status === 'Approved'
                      ? styles.approved
                      : item?.status === 'Pending'
                      ? styles.pending
                      : styles.rejected,
                  ]}
                >
                  {item?.status || 'Pending'}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>From:</Text>
                <Text style={styles.value}>
                  {item?.fromDate || item?.startDate || '-'}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>To:</Text>
                <Text style={styles.value}>
                  {item?.toDate || item?.endDate || '-'}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Days:</Text>
                <Text style={styles.value}>{item?.days || 0}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Reason:</Text>
                <Text style={styles.value}>{item?.reason || '-'}</Text>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleAddLeave}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EmployeeLeavesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  logo: {
    width: 40,
    height: 40,
  },
  addButton: {
    backgroundColor: '#1E88E5',
    alignSelf: 'flex-end',
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  emptyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
  leaveCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leaveType: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },
  status: {
    fontSize: 13,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  approved: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  pending: {
    backgroundColor: '#FFF3CD',
    color: '#856404',
  },
  rejected: {
    backgroundColor: '#F8D7DA',
    color: '#721C24',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#777',
  },
  value: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
  },
});
