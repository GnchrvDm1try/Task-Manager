import { StyleSheet, Platform } from "react-native";
import colors from '../../styles/colors.json';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    bar: {
      height: 85,
      paddingBottom: 32,
      backgroundColor: colors.primaryColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderTopWidth: 1.2,
      borderColor: colors.borderColor
    },
    header: {
      height: 58 + (Platform.OS === 'ios' ? 32 : 0),
      paddingTop: Platform.OS === 'ios' ? 32 : 0,
      backgroundColor: colors.primaryColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    headerText: {
      fontSize: 35,
      fontWeight: '500',
    },
    contentContainer: {
      flex: 1,
      margin: 5
    }
  });