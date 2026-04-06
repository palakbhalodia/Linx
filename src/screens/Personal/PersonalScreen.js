import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import PersonalView from './components/PersonalView';
import PersonalForm from './components/PersonalForm';

const PersonalScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const personalData = useSelector((state) => state.personal);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      {isEditing ? (
        <PersonalForm initialData={personalData} onSave={() => setIsEditing(false)} />
      ) : (
        <PersonalView 
          basicDetails={personalData.basicDetails}
          spouseDetails={personalData.spouseDetails}
          bankDetails={personalData.bankDetails}
          onEditPress={() => setIsEditing(true)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default PersonalScreen;
