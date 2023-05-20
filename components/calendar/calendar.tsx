import { useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { Calendar as CalendarComponent } from 'react-native-calendars';
import Task from '../../models/Task';
import TaskItem from '../taskItem/taskItem';
import colors from '../../styles/colors.json';

export default function Calendar() {
    const [displayedTasks, setDisplayedTasks] = useState(new Array<Task>());

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CalendarComponent
                showSixWeeks
                markingType='multi-dot'
                theme={{
                    calendarBackground: 'transparent',
                    textSectionTitleColor: colors.primaryColor,
                    selectedDayBackgroundColor: colors.primaryColor,
                    dotStyle: { height: 5, width: 5, },
                    selectedDotColor: colors.primaryColor,
                    textDisabledColor: colors.borderColor
                }}
            />
            <FlatList data={displayedTasks} renderItem={({ item }) => (<TaskItem task={item} />)} style={{ marginLeft: 15 }} />
        </SafeAreaView>
    );
}