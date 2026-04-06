import apiClient from './apiClient';

export const getEmploymentDetails = async employeeId => {
  try {
    console.log('Calling Employment API with employeeId:', employeeId);

    const response = await apiClient.get(`/api/employees/${employeeId}`);

    console.log('Employment API Response:', response.data);

    return response.data;
  } catch (error) {
    console.log('Employment API Error:', error?.response || error);

    return {
      jobDetails: {
        designation: '',
        department: '',
        joiningDate: '',
      },
      baseCompensation: {
        salary: '',
        currency: '',
      },
      benefits: {
        medical: false,
        pf: false,
        bonus: false,
      },
      generalTerms: {
        noticePeriod: '',
        workMode: '',
      },
      offerLetterName: '',
      offerLetterUrl: '',
    };
  }
};
