import { StyleSheet } from 'react-native';
import colors from '../../styles/colors.json';

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
    buttonTextContent: {
        fontSize: 24,
    },
    buttonIconContent: {
        maxHeight: 34,
        minHeight: 34,
        maxWidth: 34
    }
});