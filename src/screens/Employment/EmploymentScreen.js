import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

const EmploymentScreen = ({ navigation }) => {
  const handleSectionPress = title => {
    if (title === 'Job Details') {
      navigation.navigate('JobDetails');
    } else if (title === 'Base Compensation') {
      navigation.navigate('BaseCompensation');
    } else if (title === 'Benefits') {
      navigation.navigate('Benefits');
    } else if (title === 'General Terms') {
      navigation.navigate('GeneralTerms');
    }
  };

  const handlePreview = () => {
    Alert.alert('Preview', 'Offer letter preview clicked');
  };

  const handleDownload = () => {
    Alert.alert('Download', 'Offer letter download clicked');
  };

  return (
    <View style={styles.container}>
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
            ramya-subramanian-offer-letter.pdf
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
