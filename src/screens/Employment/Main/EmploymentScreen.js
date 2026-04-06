import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';

const EmploymentScreen = ({ navigation }) => {
  const handleSectionPress = title => {
    const routeMap = {
      'Job Details': 'JobDetails',
      'Base Compensation': 'BaseCompensation',
      'Benefits': 'Benefits',
      'General Terms': 'GeneralTerms'
    };
    if (routeMap[title]) navigation.navigate(routeMap[title]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {['Job Details', 'Base Compensation', 'Benefits', 'General Terms'].map(title => (
          <TouchableOpacity key={title} style={styles.card} onPress={() => handleSectionPress(title)}>
            <Text style={styles.cardText}>{title}</Text>
            <Text style={styles.arrow}>{'›'}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.offerCard}>
          <Text style={styles.offerTitle}>Offer Letter</Text>
          <Text style={styles.fileName}>ramya-subramanian-offer-letter.pdf</Text>
          <View style={styles.dottedLine} />
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => Alert.alert('Preview', 'Offer letter clicked')}>
              <Text style={styles.icon}>👁️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Download', 'Offer letter clicked')}>
              <Text style={styles.icon}>⬇️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EmploymentScreen;
