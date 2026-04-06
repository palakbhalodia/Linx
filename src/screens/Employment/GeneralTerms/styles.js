import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: '#111',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 26,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginBottom: 12,
  },
  leaveCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  leaveTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  leaveDays: {
    fontSize: 14,
    color: '#555',
  },
  equipmentCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  equipmentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  specText: {
    fontSize: 13,
    color: '#777',
    marginBottom: 2,
  },
  specValue: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  amountText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'right',
    marginTop: 8,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  otherInfo: {
    fontSize: 13,
    color: '#888',
    marginTop: 10,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
});

export default styles;
