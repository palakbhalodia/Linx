import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111',
    fontWeight: '700',
    marginTop: 26,
    marginBottom: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginBottom: 18,
  },
  allowanceCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 14,
  },
  allowanceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 10,
  },
  allowanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allowanceSub: {
    fontSize: 14,
    color: '#666',
  },
  allowanceAmount: {
    fontSize: 14,
    color: '#444',
  },
});

export default styles;
