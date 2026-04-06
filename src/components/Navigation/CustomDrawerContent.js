import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authSlice';

const NavSectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const NavItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.navItemContainer} onPress={onPress}>
    <MaterialCommunityIcons name={icon} size={22} color="#666" style={styles.navIcon} />
    <Text style={styles.navLabel}>{label}</Text>
  </TouchableOpacity>
);

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    props.navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.drawer}>
      <View style={styles.drawerHeader}>
        <View style={styles.userInfoRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.nameText}>Ramya Subramanian</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Image source={require('../../assets/mlogo.png')} style={styles.logo} resizeMode="contain" />
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.closeBtn}>
            <MaterialCommunityIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <NavItem icon="home-outline" label="Dashboard" onPress={() => props.navigation.navigate('DashboardMain')} />

        <NavSectionTitle title="Employment" />
        <NavItem icon="account-outline" label="Personal" onPress={() => props.navigation.navigate('Personal')} />
        <NavItem icon="card-account-details-outline" label="Employment Details" onPress={() => props.navigation.navigate('Employment')} />

        <NavSectionTitle title="Payroll" />
        <NavItem icon="wallet-outline" label="Expenses" onPress={() => {}} />
        <NavItem icon="calendar-clock-outline" label="Timesheets" onPress={() => props.navigation.navigate('Timesheet')} />
        <NavItem icon="logout" label="Employee Leaves" onPress={() => {}} />
        <NavItem icon="currency-usd" label="Payslips" onPress={() => {}} />

        <NavSectionTitle title="Contact" />
        <NavItem icon="message-text-outline" label="Contact Details" onPress={() => {}} />
      </ScrollView>

      <View style={styles.footerRow}>
        <View style={styles.footerIconsLeft}>
          <TouchableOpacity style={styles.footerIconBtn}>
            <MaterialCommunityIcons name="account-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerIconBtn}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerIconBtn}>
            <MaterialCommunityIcons name="headphones" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.footerIconBtn} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout-variant" size={24} color="#8A2BE2" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#6C5CE7',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 10,
    color: '#888',
  },
  nameText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  closeBtn: {
    padding: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 20,
    marginBottom: 10,
  },
  navItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  navIcon: {
    marginRight: 15,
  },
  navLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  footerIconsLeft: {
    flexDirection: 'row',
  },
  footerIconBtn: {
    padding: 8,
    marginRight: 15,
  },
});

export default CustomDrawerContent;
