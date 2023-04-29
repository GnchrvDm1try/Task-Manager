import { StyleSheet } from 'react-native';
import colors from './colors.json';

export const formStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        bottom: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateContainer: {
        marginTop: 8,
        marginBottom: 20
    },
    inputField: {
        width: '75%',
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 10,
        fontSize: 24,
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginBottom: 20
    },
    hint: {
        color: colors.borderColor,
        fontSize: 24
    }
});