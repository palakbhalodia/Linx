import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { getEmploymentDetails } from '../../api/employmentApi';

const EmploymentScreen = ({ navigation, route }) => {
  const employeeId = route?.params?.employeeId || 1;

  const [employmentData, setEmploymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmploymentDetails();
  }, []);

  const fetchEmploymentDetails = async () => {
    try {
      setLoading(true);

      const data = await getEmploymentDetails(employeeId);

      setEmploymentData(data);
    } catch (error) {
      console.log('Employment Screen Error:', error);

      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          error?.message ||
          'Failed to load employment details',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSectionPress = title => {
    if (!employmentData) return;

    if (title === 'Job Details') {
      navigation.navigate('JobDetails', {
        jobDetails: employmentData.jobDetails,
        offerLetterName: employmentData.offerLetterName,
        offerLetterUrl: employmentData.offerLetterUrl,
      });
    } else if (title === 'Base Compensation') {
      navigation.navigate('BaseCompensation', {
        baseCompensation: employmentData.baseCompensation,
      });
    } else if (title === 'Benefits') {
      navigation.navigate('Benefits', {
        benefits: employmentData.benefits,
      });
    } else if (title === 'General Terms') {
      navigation.navigate('GeneralTerms', {
        generalTerms: employmentData.generalTerms,
      });
    }
  };

  const handlePreview = async () => {
    const url = employmentData?.offerLetterUrl;

    if (!url) {
      Alert.alert('Error', 'Offer letter not available');
      return;
    }

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open this file');
    }
  };

  const handleDownload = async () => {
    const url = employmentData?.offerLetterUrl;

    if (!url) {
      Alert.alert('Error', 'Offer letter not available');
      return;
    }

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Download failed');
    }
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
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Employment Details</Text>

        <Image
          source={require('../../assets/mlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleSectionPress('Job Details')}
        >
          <Text style={styles.cardText}>Job Details</Text>
          <Text style={styles.arrow}>{'›'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleSectionPress('Base Compensation')}
        >
          <Text style={styles.cardText}>Base Compensation</Text>
          <Text style={styles.arrow}>{'›'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleSectionPress('Benefits')}
        >
          <Text style={styles.cardText}>Benefits</Text>
          <Text style={styles.arrow}>{'›'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleSectionPress('General Terms')}
        >
          <Text style={styles.cardText}>General Terms</Text>
          <Text style={styles.arrow}>{'›'}</Text>
        </TouchableOpacity>

        <View style={styles.offerCard}>
          <Text style={styles.offerTitle}>Offer Letter</Text>

          <Text style={styles.fileName}>
            {employmentData?.offerLetterName || 'No file available'}
          </Text>

          <View style={styles.dottedLine} />

          <View style={styles.iconRow}>
            <TouchableOpacity onPress={handlePreview}>
              <Text style={styles.icon}>👁️</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDownload}>
              <Text style={styles.icon}>⬇️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EmploymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
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
    padding: 16,
  },
  card: {
    backgroundColor: '#ECEEF3',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 24,
    color: '#000',
  },
  offerCard: {
    backgroundColor: '#ECEEF3',
    borderRadius: 10,
    padding: 14,
    marginTop: 6,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
    marginBottom: 10,
  },
  fileName: {
    fontSize: 13,
    color: '#777',
    marginBottom: 12,
  },
  dottedLine: {
    borderStyle: 'dashed',
    borderWidth: 0.7,
    borderColor: '#B0B0B0',
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 20,
    marginRight: 18,
  },
});
