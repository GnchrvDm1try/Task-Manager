import { StyleSheet } from 'react-native';
import colors from '../../styles/colors.json';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: colors.borderColor,
    borderRadius: 10,
    marginVertical: 7.5,
    padding: 8
  },
  title: {
    fontSize: 26,
    fontWeight: '500'
  },
  date: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 7,
    paddingVertical: 2
  },
  otherInfo: {
    color: colors.borderColor,
    fontSize: 14,
    fontWeight: '500'
  }
});