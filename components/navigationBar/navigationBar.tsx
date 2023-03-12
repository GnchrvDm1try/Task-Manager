import { ReactElement } from "react";
import { Text, View } from "react-native";
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
            <View style={styles.bar}>
                <TasksIcon height={'70%'} />
                <CalendarIcon height={'70%'} />
            </View>
        </View>
    );
}