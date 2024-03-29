import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { TaskListStackParamList } from '../../navigators/tasksScreenNavigator';
import { FlatList } from 'react-native-gesture-handler';
import Task from '../../models/Task';
import StageItem from '../stageItem/stageItem';
import { DBManager } from '../../DBManager';
import EditIcon from '../../assets/icons/edit_icon.svg';
import DeleteIcon from '../../assets/icons/bucket_with_a_cross_icon.svg';
import AddIcon from '../../assets/icons/add_icon.svg';
import { styles } from './taskDetails.styles';
import { baseStyles } from '../../styles/baseStyles';
import colors from '../../styles/colors.json';

type Props = NativeStackScreenProps<TaskListStackParamList, 'Task info'>;

export default function TaskDetails({ navigation, route }: Props) {
    const [task, setTask] = useState<Task | null | undefined>(undefined);

    useEffect(() => {
        DBManager.getInstance().getTaskWithStages(route.params.taskId).then((res) => {
            setTask(res);
            navigation.setOptions({ title: res?.title });
        });
    }, []);

    if (task === undefined)
        return (
            <SafeAreaView style={baseStyles.alertContainer}>
                <Text style={baseStyles.headerM}>Loading...</Text>
            </SafeAreaView>
        );
    if (task === null)
        return (
            <SafeAreaView style={baseStyles.alertContainer}>
                <Text style={baseStyles.headerM}>Failed to find the task</Text>
            </SafeAreaView>
        );
    return (
        <View style={baseStyles.container}>
            <View style={baseStyles.horizontalContainer}>
                <TouchableOpacity
                    onPress={() => {
                        const newTask: Task = { ...task, isDone: !task.isDone };
                        DBManager.getInstance().updateTask(newTask).then(() => {
                            setTask(newTask);
                            navigation.navigate('Task list', { refresh: true });
                            navigation.navigate('Task info', { taskId: task.id });
                        });
                    }}
                    style={baseStyles.mainButton}>
                    <Text style={baseStyles.buttonTextContent}>{task.isDone ? 'Mark as unfinished' : 'Mark as finished'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Edit task', { taskId: task.id })}
                    style={baseStyles.mainButton}>
                    <EditIcon style={styles.buttonIconContent} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert('Deleting of the task', 'Are you sure you want to permanently delete this task?', [
                            { text: 'Delete', onPress: () => DBManager.getInstance().deleteTask(task.id).then(() => navigation.navigate('Task list', { refresh: true })) },
                            { text: 'Cancel', style: 'cancel' }
                        ]);
                    }}
                    style={baseStyles.mainButton}>
                    <DeleteIcon style={styles.buttonIconContent} />
                </TouchableOpacity>
            </View>
            <View style={styles.dateContainer}>
                <Text style={baseStyles.hintS}>Created at: </Text>
                <Text style={baseStyles.headerS}>{task.additionDate.toLocaleString()}</Text>
            </View>
            {
                task.beginDate &&
                <View style={styles.dateContainer}>
                    <Text style={baseStyles.hintS}>Date of beginning: </Text>
                    <Text style={baseStyles.headerS}>{task.beginDate.toLocaleString('de', { dateStyle: 'medium', timeStyle: 'short' })}</Text>
                </View>
            }
            {
                task.deadlineDate &&
                <View style={styles.dateContainer}>
                    <Text style={baseStyles.hintS}>Deadline date: </Text>
                    <Text style={baseStyles.headerS}>{task.deadlineDate.toLocaleString('de', { dateStyle: 'medium', timeStyle: 'short' })}</Text>
                </View>
            }
            <FlatList data={task.stages} renderItem={({ item }) => (<StageItem stage={item} />)} />

            <TouchableOpacity style={baseStyles.addButton}
                onPress={() => navigation.navigate('Create stage', { taskId: task.id })}>
                <AddIcon height={60} width={60} color={colors.primaryColor} />
            </TouchableOpacity>
        </View>
    );
}