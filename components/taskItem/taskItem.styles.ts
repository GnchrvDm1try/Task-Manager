import { StyleSheet } from "react-native";
import colors from '../../styles/colors.json';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: colors.borderColor,
    borderRadius: 10,
    margin: 15,
    padding: 8
  },
  taskTitle : {
    fontSize: 26,
    fontWeight: '500'
  },
  taskDate: {
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingHorizontal: 7,
    paddingVertical: 2
  }
});