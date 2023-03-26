import { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TaskItem from '../taskItem/taskItem';
import Task from '../../models/Task';
import { DBManager } from '../../DBManager';
import { baseStyles } from '../../styles/baseStyles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { TaskListStackParamList } from '../../navigators/tasksScreenNavigator';

type Props = NativeStackScreenProps<TaskListStackParamList, 'Task list'>;

export default function TaskList(props: Props) {
    const [tasks, setTasks] = useState(new Array<Task>());

    useEffect(() => {
        DBManager.getInstance().getAllTasks().then((res) => setTasks(res));
    }, []);

    if (tasks.length == 0)
        return (
            <SafeAreaView style={baseStyles.alertContainer}>
                <Text style={baseStyles.header}>You have no tasks</Text>
            </SafeAreaView>
        );
    return (
        <SafeAreaView style={[baseStyles.container, { marginRight: 0 }]}>
            <FlatList data={tasks} renderItem={({ item }) => (<TaskItem task={item}></TaskItem>)} />
        </SafeAreaView>
    );
}