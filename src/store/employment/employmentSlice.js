import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobDetails: {
    title: 'Account Coordinator',
    description: 'We are looking for an Account Coordinator to provide day-to-day administrative support to our Account Executives and Account Representatives to ensure smooth sales procedures.',
    documents: [
      { id: 1, name: 'Job-details2023.pdf', url: '#' },
      { id: 2, name: 'JobDescription2023.pdf', url: '#' }
    ]
  },
  baseCompensation: {
    payCycle: 'Monthly',
    grossSalary: 'INR 50000',
    allowances: [
      { id: 1, name: 'Trip Allowance', isTaxable: true, amount: '₹10000' }
    ]
  },
  benefits: {
    healthInsurance: 'No health insurance',
    extraBenefits: [
      { id: 1, name: 'Disability Insurance', amount: '₹10000' },
      { id: 2, name: 'Travelling Allowance', amount: '₹8000' }
    ]
  },
  generalTerms: {
    employmentType: 'Full Time',
    workplace: 'Office',
    hireDate: '04-01-2024',
    targetStartDate: '04-05-2024',
    endDate: '04-10-2024',
    probationPeriod: '10 Days',
    noticePeriod: '1 Months',
    leaves: { sick: 1, earned: 2, annual: 5 },
    equipment: [
      { id: 1, name: 'Laptop', spec: 'Lenovo laptop', type: 'Purchase', amount: '₹60000' },
      { id: 2, name: 'Keyboard', spec: 'Lenovo K120 Wired USB', type: 'Client Issued', amount: '₹800' }
    ],
    otherInfo: 'Are you looking for a generic job description template, a specific role, or a summary of job responsibilities for a particular position?'
  }
};

const employmentSlice = createSlice({
  name: 'employment',
  initialState,
  reducers: {}
});

export default employmentSlice.reducer;
