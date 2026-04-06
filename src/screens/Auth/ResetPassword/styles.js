import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  instructions: {
    fontSize: 12,
    color: '#888',
    marginBottom: 16,
    marginTop: -10, // Adjust spacing from input
    lineHeight: 18,
  },
  buttonSpacing: {
    marginTop: 10,
  },
});

export default styles;
