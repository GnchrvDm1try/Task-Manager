import { useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { Calendar as CalendarComponent } from 'react-native-calendars';
import { DBManager } from '../../DBManager';
import Task from '../../models/Task';
import TaskItem from '../taskItem/taskItem';
import colors from '../../styles/colors.json';
import { MarkedDates } from 'react-native-calendars/src/types';

export default function Calendar() {
    const [selected, setSelected] = useState('');
    const [tasks, setTasks] = useState(new Array<Task>());
    const [displayedTasks, setDisplayedTasks] = useState(new Array<Task>());

    useEffect(() => {
        DBManager.getInstance().getAllTasksWithStages().then((res) => setTasks(res));
    }, []);

    const getDots = () => {
        let marked: MarkedDates = { [selected]: { selected: true, dots: [] } };

        const addToMarked = (date: string, color: string) => {
            if (!marked[date])
                marked[date] = { dots: [] };
            marked[date].dots!.push({ color: color });
        }

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            if (task.beginDate) {
                addToMarked(task.beginDate.toISOString().split('T')[0], colors.primaryColor);
            }
            if (task.deadlineDate) {
                addToMarked(task.deadlineDate.toISOString().split('T')[0], 'red');
            }
        }
        return marked;
    }

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
                onDayPress={day => {
                    setSelected(day.dateString);
                    const date = new Date(day.timestamp);
                    const nextDayDate = new Date(date);
                    nextDayDate.setDate(nextDayDate.getDate() + 1);
                    setDisplayedTasks(tasks.filter((task) => {
                        return (task.beginDate ? task.beginDate.getTime() <= nextDayDate.getTime() : true)
                            && (task.deadlineDate ? task.deadlineDate.getTime() >= date.getTime() : true);
                    }));
                }}
                markedDates={getDots()}
            />
            <FlatList data={displayedTasks} renderItem={({ item }) => (<TaskItem task={item} />)} style={{ marginLeft: 15 }} />
        </SafeAreaView>
    );
}