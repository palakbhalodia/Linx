import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import CustomDrawerContent from '../components/Navigation/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ 
        headerShown: false, 
        drawerStyle: { width: '85%' },
        drawerType: 'front'
      }}
    >
      <Drawer.Screen name="DashboardMain" component={DashboardScreen} />
    </Drawer.Navigator>
  );
}
