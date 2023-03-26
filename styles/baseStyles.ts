import { StyleSheet } from 'react-native';
import colors from './colors.json';

export const baseStyles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        marginBottom: 0
    },
    alertContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '600'
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainButton: {
        height: 45,
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 1000,
        backgroundColor: "white"
    }
});