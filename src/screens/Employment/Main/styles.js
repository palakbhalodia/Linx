import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 24,
    color: '#000',
  },
  offerCard: {
    backgroundColor: '#F3F0FF', // Light purple from mockups
    borderRadius: 10,
    padding: 16,
    marginTop: 6,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  fileName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  dottedLine: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 20,
    marginRight: 20,
    color: '#007BFF', // Active blue icon tint
  },
});

export default styles;
