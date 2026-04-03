import apiClient from './apiClient';

export const getTimesheetList = async employeeId => {
  try {
    console.log('Calling Timesheet API with employeeId:', employeeId);

    const response = await apiClient.get(`/api/timesheets/${employeeId}`);

    return response.data;
  } catch (error) {
    console.log('Timesheet API Error:', error?.response || error);

    // Temporary fallback data
    return [
      {
        date: '05-10-2024',
        entries: [
          {
            id: '1',
            title: 'Home Page Design',
            project: 'Website Design',
            status: 'Review',
            billable: 'Non Billable',
            hours: '04:00',
            startTime: '09:00 AM',
            endTime: '01:00 PM',
          },
          {
            id: '2',
            title: 'About Us Page Design',
            project: 'Website Design',
            status: 'Pending',
            billable: 'Non Billable',
            hours: '02:00',
            startTime: '02:00 PM',
            endTime: '04:00 PM',
          },
        ],
      },
      {
        date: '25-11-2024',
        entries: [
          {
            id: '4',
            title: 'Home Page HTML',
            project: 'Troth',
            status: 'Approved',
            billable: 'Billable',
            hours: '08:00',
            startTime: '09:00 AM',
            endTime: '05:00 PM',
          },
        ],
      },
    ];
  }
};
