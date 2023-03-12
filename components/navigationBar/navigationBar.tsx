import { ReactElement } from "react";
import { Text, View, ScrollView } from "react-native";
import { styles } from './navigationBar.styles';
import TasksIcon from '../../assets/icons/tasks_icon.svg';
import CalendarIcon from '../../assets/icons/calendar_icon.svg';

type NavigationProps = {
    isHeaderDisplayed?: boolean;
    children: React.ReactNode;
}

export default function NavigationBar(props: NavigationProps) {
    const headerBar = (): ReactElement | null => {
        if (props.isHeaderDisplayed)
            return (
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}></Text>
                    </View>
                </View>)
        else
            return null
    }

    return (
        <View style={styles.container}>
            {headerBar()}
            <ScrollView style={styles.contentContainer}>
                {props.children}
            </ScrollView>
            <View style={styles.bar}>
                <TasksIcon width={'50%'} height={'80%'} />
                <CalendarIcon width={'50%'} height={'80%'} />
            </View>
        </View>
    );
}