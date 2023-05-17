import { StyleSheet } from 'react-native';
import colors from './colors.json';

export const modalWindowStyles = StyleSheet.create({
    backgroundCloseOpacity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '50%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.borderColor,
        backgroundColor: 'white'
    },
    button: {
        padding: 10,
        marginHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: colors.borderColor
    },
    buttonLast: {
        padding: 10,
        marginHorizontal: 5
    }
});