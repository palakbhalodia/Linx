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
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  fileCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#555',
  },
  fileName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  downloadIcon: {
    fontSize: 20,
    color: '#007BFF', // Blue download icon tint
  },
});

export default styles;
