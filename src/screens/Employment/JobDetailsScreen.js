import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

const JobDetailsScreen = ({ navigation, route }) => {
  const jobDetails = route?.params?.jobDetails || {};
  const offerLetterName = route?.params?.offerLetterName || 'No file';
  const offerLetterUrl = route?.params?.offerLetterUrl || '';

  const handleDownload = fileName => {
    if (!offerLetterUrl) {
      Alert.alert('Error', 'File URL not found');
      return;
    }

    Alert.alert('Download', `${fileName} download clicked`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Job Details</Text>

        <Image
          source={require('../../assets/mlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Job Title</Text>
        <Text style={styles.value}>{jobDetails?.designation || '-'}</Text>

        <Text style={[styles.label, { marginTop: 18 }]}>Department</Text>
        <Text style={styles.description}>{jobDetails?.department || '-'}</Text>

        <Text style={[styles.label, { marginTop: 18 }]}>Joining Date</Text>
        <Text style={styles.value}>{jobDetails?.joiningDate || '-'}</Text>

        <Text style={[styles.label, { marginTop: 20 }]}>Uploaded</Text>

        <View style={styles.fileCard}>
          <View style={styles.fileLeft}>
            <Text style={styles.fileIcon}>📄</Text>
            <Text style={styles.fileName}>{offerLetterName}</Text>
          </View>

          <TouchableOpacity onPress={() => handleDownload(offerLetterName)}>
            <Text style={styles.downloadIcon}>⬇️</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default JobDetailsScreen;

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
    padding: 18,
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
  description: {
    fontSize: 16,
    color: '#222',
    lineHeight: 26,
  },
  fileCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  fileName: {
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  downloadIcon: {
    fontSize: 20,
  },
});
