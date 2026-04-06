import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updatePersonalDetails } from '../../../store/personal/personalSlice';
import CustomInput from '../../../components/common/CustomInput';
import CustomSelect from '../../../components/common/CustomSelect';
import CustomRadioGroup from '../../../components/common/CustomRadioGroup';

const PersonalForm = ({ initialData, onSave }) => {
  const dispatch = useDispatch();

  // Basic Details State
  const [firstName, setFirstName] = useState(initialData.basicDetails.firstName);
  const [middleName, setMiddleName] = useState(initialData.basicDetails.middleName);
  const [lastName, setLastName] = useState(initialData.basicDetails.lastName);
  const [gender, setGender] = useState(initialData.basicDetails.gender);
  const [dob, setDob] = useState(initialData.basicDetails.dateOfBirth);
  const [ethnicity, setEthnicity] = useState(initialData.basicDetails.ethnicity);
  const [workPhoneCode, setWorkPhoneCode] = useState(initialData.basicDetails.workPhoneCountry);
  const [workPhone, setWorkPhone] = useState(initialData.basicDetails.workPhoneNumber);
  const [personalPhoneCode, setPersonalPhoneCode] = useState(initialData.basicDetails.personalPhoneCountry);
  const [personalPhone, setPersonalPhone] = useState(initialData.basicDetails.personalPhoneNumber);
  const [email, setEmail] = useState(initialData.basicDetails.email);
  const [address, setAddress] = useState(initialData.basicDetails.address);
  const [country, setCountry] = useState(initialData.basicDetails.country);
  const [stateName, setStateName] = useState(initialData.basicDetails.state);
  const [city, setCity] = useState(initialData.basicDetails.city);
  const [zip, setZip] = useState(initialData.basicDetails.zipCode);
  const [citizenship, setCitizenship] = useState(initialData.basicDetails.citizenshipStatus);
  const [visaType, setVisaType] = useState(initialData.basicDetails.visaType);
  const [visaExpiry, setVisaExpiry] = useState(initialData.basicDetails.visaExpiry);
  const [religion, setReligion] = useState(initialData.basicDetails.religion);
  const [nationalId, setNationalId] = useState(initialData.basicDetails.nationalId);
  const [marital, setMarital] = useState(initialData.basicDetails.maritalStatus);

  // Spouse Details State
  const [spouseName, setSpouseName] = useState(initialData.spouseDetails.fullName);
  const [spouseDob, setSpouseDob] = useState(initialData.spouseDetails.dateOfBirth);
  const [spouseGender, setSpouseGender] = useState(initialData.spouseDetails.gender);
  const [spousePhoneCode, setSpousePhoneCode] = useState(initialData.spouseDetails.mobileCountry);
  const [spousePhone, setSpousePhone] = useState(initialData.spouseDetails.mobileNumber);

  // Bank Details State
  const [bankName, setBankName] = useState(initialData.bankDetails.bankName);
  const [accountName, setAccountName] = useState(initialData.bankDetails.accountHolderName);
  const [accountType, setAccountType] = useState(initialData.bankDetails.bankAccountType);
  const [accountNumber, setAccountNumber] = useState(initialData.bankDetails.bankAccountNumber);
  const [swift, setSwift] = useState(initialData.bankDetails.swift);
  const [ifsc, setIfsc] = useState(initialData.bankDetails.ifsc);

  const handleSave = () => {
    dispatch(updatePersonalDetails({
      basicDetails: {
        firstName, middleName, lastName, gender, dateOfBirth: dob, ethnicity,
        workPhoneCountry: workPhoneCode, workPhoneNumber: workPhone,
        personalPhoneCountry: personalPhoneCode, personalPhoneNumber: personalPhone,
        email, address, country, state: stateName, city, zipCode: zip,
        citizenshipStatus: citizenship, visaType, visaExpiry, religion,
        nationalId, maritalStatus: marital
      },
      spouseDetails: {
        fullName: spouseName, dateOfBirth: spouseDob, gender: spouseGender,
        mobileCountry: spousePhoneCode, mobileNumber: spousePhone
      },
      bankDetails: {
        bankName, accountHolderName: accountName, bankAccountType: accountType,
        bankAccountNumber: accountNumber, swift, ifsc
      }
    }));
    onSave();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>Basic Details</Text>
        
        <CustomInput label="First Name" value={firstName} onChangeText={setFirstName} />
        <CustomInput label="Middle Name" placeholder="Enter Middle Name" value={middleName} onChangeText={setMiddleName} />
        <CustomInput label="Last Name" value={lastName} onChangeText={setLastName} />
        
        <CustomRadioGroup 
          label="Gender" 
          options={[{label: 'Male', value: 'Male'}, {label: 'Female', value: 'Female'}, {label: 'Other', value: 'Other'}]} 
          selectedValue={gender} 
          onSelect={setGender} 
          required 
        />

        <CustomSelect label="Date of Birth" value={dob} required />
        <CustomInput label="Ethnicity (Optional)" value={ethnicity} onChangeText={setEthnicity} />
        
        {/* Simple Phone row mock since we lack a real dropdown picker box */}
        <CustomInput label="Work Phone Number" value={`${workPhoneCode} ${workPhone}`} onChangeText={(v) => setWorkPhone(v.replace(workPhoneCode, '').trim())} />
        <CustomInput label="Personal Phone Number" value={`${personalPhoneCode} ${personalPhone}`} onChangeText={(v) => setPersonalPhone(v.replace(personalPhoneCode, '').trim())} />
        
        <CustomInput label="Work/Personal Email Address" value={email} onChangeText={setEmail} />
        <CustomInput label="Address" value={address} onChangeText={setAddress} />
        
        <CustomSelect label="Country" value={country} required />
        <CustomSelect label="State" value={stateName} required />
        <CustomSelect label="City" value={city} required />
        
        <CustomInput label="Zip Code" value={zip} onChangeText={setZip} />
        <CustomSelect label="Citizenship Status" value={citizenship} required />
        <CustomInput label="Visa Type" value={visaType} onChangeText={setVisaType} />
        <CustomSelect label="Visa Expiry Date" value={visaExpiry} required />
        
        <CustomInput label="Religion" value={religion} onChangeText={setReligion} />
        <CustomInput label="National Identification Number (for proof)" value={nationalId} onChangeText={setNationalId} />
        <CustomSelect label="Marital Status" value={marital} required />

        {/* Spouse Details */}
        <Text style={styles.sectionTitle}>Spouse Details</Text>
        <CustomInput label="Full Name" value={spouseName} onChangeText={setSpouseName} />
        <CustomSelect label="Date of Birth" value={spouseDob} required />
        <CustomRadioGroup 
          label="Gender" 
          options={[{label: 'Male', value: 'Male'}, {label: 'Female', value: 'Female'}, {label: 'Other', value: 'Other'}]} 
          selectedValue={spouseGender} 
          onSelect={setSpouseGender} 
          required 
        />
        <CustomInput label="Mobile Number" value={`${spousePhoneCode} ${spousePhone}`} onChangeText={(v) => setSpousePhone(v.replace(spousePhoneCode, '').trim())} />

        {/* Bank Details */}
        <Text style={styles.sectionTitle}>Bank Details</Text>
        <CustomInput label="Bank Name" value={bankName} onChangeText={setBankName} />
        <CustomInput label="Account Holder Name" value={accountName} onChangeText={setAccountName} />
        <CustomInput label="Bank Account Type" value={accountType} onChangeText={setAccountType} />
        <CustomInput label="Bank Account Number" value={accountNumber} onChangeText={setAccountNumber} />
        <CustomInput label="Swift" value={swift} onChangeText={setSwift} />
        <CustomInput label="IFSC" value={ifsc} onChangeText={setIfsc} />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  saveBtn: {
    backgroundColor: '#007BFF',
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersonalForm;
