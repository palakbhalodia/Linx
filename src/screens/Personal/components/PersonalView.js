import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailCard from './DetailCard';

const PersonalView = ({ basicDetails, spouseDetails, bankDetails, onEditPress }) => {
  // Mapping objects to label/value arrays for DetailCard
  const mapBasicData = () => [
    { label: 'Gender', value: basicDetails.gender },
    { label: 'Department', value: basicDetails.department },
    { label: 'Ethnicity', value: basicDetails.ethnicity },
    { label: 'Date of Birth', value: basicDetails.dateOfBirth },
    { label: 'Work Phone Number', value: `${basicDetails.workPhoneCountry} ${basicDetails.workPhoneNumber}` },
    { label: 'Personal\nPhone Number', value: `${basicDetails.personalPhoneCountry} ${basicDetails.personalPhoneNumber}` },
    { label: 'Address', value: basicDetails.address },
    { label: 'Country', value: basicDetails.country },
    { label: 'State', value: basicDetails.state },
    { label: 'City', value: basicDetails.city },
    { label: 'Zip Code', value: basicDetails.zipCode },
    { label: 'Citizenship Status', value: basicDetails.citizenshipStatus },
    { label: 'Visa Type', value: basicDetails.visaType },
    { label: 'Visa Expiry Date', value: basicDetails.visaExpiry },
    { label: 'Religion', value: basicDetails.religion },
    { label: 'National Identification\nNumber', value: basicDetails.nationalId },
    { label: 'Created by', value: basicDetails.createdBy },
    { label: 'Modified by', value: basicDetails.modifiedBy },
    { label: 'Marital Status', value: basicDetails.maritalStatus },
  ];

  const mapSpouseData = () => [
    { label: 'Full Name', value: spouseDetails.fullName },
    { label: 'Date of Birth', value: spouseDetails.dateOfBirth },
    { label: 'Gender', value: spouseDetails.gender },
    { label: 'Phone Number', value: `${spouseDetails.mobileCountry} ${spouseDetails.mobileNumber}` },
  ];

  const mapBankData = () => [
    { label: 'Bank Name', value: bankDetails.bankName },
    { label: 'Account Holder Name', value: bankDetails.accountHolderName },
    { label: 'Bank Account Type', value: bankDetails.bankAccountType },
    { label: 'Bank Account Number', value: bankDetails.bankAccountNumber },
    { label: 'Swift', value: bankDetails.swift },
    { label: 'IFSC', value: bankDetails.ifsc },
  ];

  const initials = `${basicDetails.firstName?.charAt(0) || ''}${basicDetails.lastName?.charAt(0) || ''}`.toUpperCase() || 'R';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header Block */}
        <View style={styles.profileBlock}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.nameText}>{`${basicDetails.firstName} ${basicDetails.lastName}`}</Text>
          <Text style={styles.emailText}>{basicDetails.email}</Text>
        </View>

        {/* Detail Cards */}
        <DetailCard title="Basic Details" data={mapBasicData()} />
        <DetailCard title="Spouse Details" data={mapSpouseData()} />
        <DetailCard title="Bank Details" data={mapBankData()} />
      </ScrollView>

      {/* Floating Edit Button */}
      <TouchableOpacity style={styles.fab} onPress={onEditPress}>
        <MaterialCommunityIcons name="pencil" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80, // Padding for FAB
  },
  profileBlock: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    backgroundColor: '#F7F7FD', // Very light purple matching the screenshot background plate
    marginHorizontal: -20,
    marginTop: -20,
    paddingTop: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarText: {
    color: '#8A2BE2',
    fontSize: 24,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 12,
    color: '#888',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007BFF', // Blue edit button from screenshot
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default PersonalView;
