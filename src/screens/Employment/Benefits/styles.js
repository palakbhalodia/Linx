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
  benefitCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    flex: 1,
  },
  benefitAmount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
});

export default styles;
