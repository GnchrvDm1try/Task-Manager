import { StyleSheet } from "react-native";
import colors from '../../styles/colors.json';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    bar: {
      height: 85,
      backgroundColor: colors.primaryColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });