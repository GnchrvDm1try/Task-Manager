import { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TaskItem from '../taskItem/taskItem';
import Task from '../../models/Task';
import { DBManager } from '../../DBManager';
import AddIcon from '../../assets/icons/add_icon.svg';
import { baseStyles } from '../../styles/baseStyles';
import colors from '../../styles/colors.json';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { TaskListStackParamList } from '../../navigators/tasksScreenNavigator';

type Props = NativeStackScreenProps<TaskListStackParamList, 'Task list'>;

export default function TaskList({ navigation, route }: Props) {
    const [tasks, setTasks] = useState(new Array<Task>());

    useEffect(() => {
        if (route.params.update) {
            DBManager.getInstance().getAllTasksWithStages().then((res) => setTasks(res));
            navigation.setParams({ update: false });
        }
    }, [route.params.update]);

    return (
        <SafeAreaView style={[tasks.length === 0 ? baseStyles.alertContainer : baseStyles.container, { marginRight: 0 }]}>
            {tasks.length === 0
                ? <Text style={baseStyles.headerL}>You have no tasks</Text>
                : <FlatList data={tasks} renderItem={({ item }) => (<TaskItem task={item}></TaskItem>)} />}
            <TouchableOpacity style={baseStyles.addButton}
                onPress={() => navigation.navigate('Create task')}>
                <AddIcon height={60} width={60} color={colors.primaryColor} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}