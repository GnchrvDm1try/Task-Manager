import { StyleSheet } from 'react-native';
import colors from './colors.json';

export const baseStyles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        marginBottom: 0
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    alertContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    headerL: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '500'
    },
    headerM: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '600'
    },
    headerS: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        paddingVertical: 5
    },
    hintS: {
        fontSize: 20,
        color: colors.borderColor
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
    },
    buttonTextContent: {
        fontSize: 24,
    },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }
});