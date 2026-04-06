import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basicDetails: {
    firstName: 'Ramya',
    middleName: '',
    lastName: 'Subramanian',
    gender: 'Female',
    department: 'Software',
    ethnicity: 'Indian People',
    dateOfBirth: '02-01-1990',
    workPhoneCountry: '+91',
    workPhoneNumber: '97250 50297',
    personalPhoneCountry: '+91',
    personalPhoneNumber: '98250 99090',
    email: 'ramyasubramanian@gmail.com',
    address: '27, Kamlesh Heights, Model Town',
    country: 'India',
    state: 'New Delhi',
    city: 'New Delhi',
    zipCode: '496515',
    citizenshipStatus: 'Non Citizen',
    visaType: 'H1B',
    visaExpiry: '31-08-2023',
    religion: 'Hindu',
    nationalId: '5880607060531490',
    createdBy: 'KGTiger Super Admin',
    modifiedBy: 'Ashuuu Patel',
    maritalStatus: 'Married',
  },
  spouseDetails: {
    fullName: 'Vaishali Ramya',
    dateOfBirth: '10-05-1990',
    gender: 'Female',
    mobileCountry: '+91',
    mobileNumber: '98255 95090',
  },
  bankDetails: {
    bankName: 'HDFC',
    accountHolderName: 'Ramya Subramanian',
    bankAccountType: 'Saving',
    bankAccountNumber: '50100458020128',
    swift: 'HDFCINBBXXX',
    ifsc: 'HDFC0000006',
  }
};

const personalSlice = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    updatePersonalDetails: (state, action) => {
      const { basicDetails, spouseDetails, bankDetails } = action.payload;
      if (basicDetails) {
        state.basicDetails = { ...state.basicDetails, ...basicDetails };
      }
      if (spouseDetails) {
        state.spouseDetails = { ...state.spouseDetails, ...spouseDetails };
      }
      if (bankDetails) {
        state.bankDetails = { ...state.bankDetails, ...bankDetails };
      }
    }
  }
});

export const { updatePersonalDetails } = personalSlice.actions;
export default personalSlice.reducer;
