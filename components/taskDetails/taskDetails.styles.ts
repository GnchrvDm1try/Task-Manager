import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    stageHeader: {
        fontWeight: '500',
        fontSize: 36,
        width: '90%'
    },
    stageDescription: {
        fontSize: 22
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    buttonIconContent: {
        maxHeight: 34,
        minHeight: 34,
        maxWidth: 34
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 3
    }
});