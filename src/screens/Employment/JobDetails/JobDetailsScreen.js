import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

const JobDetailsScreen = () => {
  const jobDetails = useSelector((state) => state.employment.jobDetails);

  const handleDownload = (fileName) => {
    Alert.alert('Download', `${fileName} download clicked`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Job Title</Text>
        <Text style={styles.value}>{jobDetails.title}</Text>

        <Text style={[styles.label, { marginTop: 18 }]}>Job Description</Text>
        <Text style={styles.description}>{jobDetails.description}</Text>

        <Text style={[styles.label, { marginTop: 20 }]}>Uploaded</Text>

        {jobDetails.documents.map((doc) => (
          <View key={doc.id} style={styles.fileCard}>
            <View style={styles.fileLeft}>
              <Text style={styles.fileIcon}>📄</Text>
              <Text style={styles.fileName}>{doc.name}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDownload(doc.name)}>
              <Text style={styles.downloadIcon}>⬇️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default JobDetailsScreen;
