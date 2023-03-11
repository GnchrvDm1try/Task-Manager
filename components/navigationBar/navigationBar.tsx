import { View } from "react-native";
import { styles } from './navigationBar.styles';
import TasksIcon from '../../assets/icons/tasks_icon.svg';
import CalendarIcon from '../../assets/icons/calendar_icon.svg';

export default function NavigationBar() {
    return (
        <View style={styles.container}>
            <View style={styles.bar}>
                <TasksIcon height={'70%'} />
                <CalendarIcon height={'70%'} />
            </View>
        </View>
    );
}