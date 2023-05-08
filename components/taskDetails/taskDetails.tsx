import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { TaskListStackParamList } from '../../navigators/tasksScreenNavigator';
import { FlatList } from 'react-native-gesture-handler';
import Task from '../../models/Task';
import { DBManager } from '../../DBManager';
import EditIcon from '../../assets/icons/edit_icon.svg';
import DeleteIcon from '../../assets/icons/bucket_with_a_cross_icon.svg';
import CheckedMarkIcon from '../../assets/icons/checked_mark_icon.svg';
import UnCheckedMarkIcon from '../../assets/icons/unchecked_mark_icon.svg';
import { styles } from './taskDetails.styles';
import { baseStyles } from '../../styles/baseStyles';
import colors from '../../styles/colors.json';

type Props = NativeStackScreenProps<TaskListStackParamList, 'Task info'>;

export default function TaskDetails(props: Props) {
    const [task, setTask] = useState<Task | null | undefined>(undefined);

    useEffect(() => {
        DBManager.getInstance().getTaskWithStages(props.route.params.taskId).then((res) => {
            setTask(res);
            props.navigation.setOptions({ title: res?.title });
        });
    }, []);

    if (task === undefined)
        return (
            <SafeAreaView style={baseStyles.alertContainer}>
                <Text style={baseStyles.headerL}>Loading...</Text>
            </SafeAreaView>
        );
    if (task === null)
        return (
            <SafeAreaView style={baseStyles.alertContainer}>
                <Text style={baseStyles.headerL}>Failed to find the task</Text>
            </SafeAreaView>
        );
    return (
        <View style={baseStyles.container}>
            <View style={baseStyles.horizontalContainer}>
                <TouchableOpacity
                    onPress={() => {
                        const newTask = { ...task, isDone: !task.isDone };
                        DBManager.getInstance().updateTask(newTask).then(() => setTask(newTask));
                    }}
                    style={baseStyles.mainButton}>
                    <Text style={baseStyles.buttonTextContent}>{task.isDone ? 'Mark as unfinished' : 'Mark as finished'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }}
                    style={baseStyles.mainButton}>
                    <EditIcon style={styles.buttonIconContent} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }}
                    style={baseStyles.mainButton}>
                    <DeleteIcon style={styles.buttonIconContent} />
                </TouchableOpacity>
            </View>
            <View style={styles.dateContainer}>
                <Text style={baseStyles.hintM}>Created at: </Text>
                <Text style={baseStyles.headerM}>{task.additionDate.toLocaleString()}</Text>
            </View>
            {
                task.beginDate &&
                <View style={styles.dateContainer}>
                    <Text style={baseStyles.hintM}>Date of beginning: </Text>
                    <Text style={baseStyles.headerM}>{`${task.beginDate.toLocaleDateString()}, ${task.beginDate.getHours()}:${task.beginDate.getMinutes()}`}</Text>
                </View>
            }
            {
                task.deadlineDate &&
                <View style={styles.dateContainer}>
                    <Text style={baseStyles.hintM}>Deadline date: </Text>
                    <Text style={baseStyles.headerM}>{`${task.deadlineDate.toLocaleDateString()}, ${task.deadlineDate.getHours()}:${task.deadlineDate.getMinutes()}`}</Text>
                </View>
            }
            <FlatList data={task.stages} renderItem={({ item }) => {
                return (
                    <View>
                        <View style={styles.headerContainer}>
                            <Text style={[styles.stageHeader, item.isDone ? { color: colors.borderColor } : {}]}>
                                <TouchableOpacity
                                    onPress={() => { }}>
                                    {
                                        item.isDone &&
                                        <UnCheckedMarkIcon height={30} width={30} color={colors.borderColor} style={{ marginRight: 10 }} />
                                    }
                                    {
                                        !item.isDone &&
                                        <CheckedMarkIcon height={30} width={30} style={{ marginRight: 10 }} />
                                    }
                                </TouchableOpacity>
                                {item.title}
                            </Text>
                        </View>
                        <Text style={[{ marginVertical: 4 }, item.isDone ? { color: colors.borderColor } : {}]}>
                            <Text style={baseStyles.hintM}>Deadline: </Text>
                            <Text style={baseStyles.headerM}>{`${item.deadlineDate?.toLocaleDateString()}, ${item.deadlineDate?.getHours()}:${item.deadlineDate?.getMinutes()}`}</Text>
                        </Text>
                        <Text style={[styles.stageDescription, item.isDone ? { color: colors.borderColor } : {}]}>{item.description}</Text>
                    </View>
                );
            }} />
        </View>
    );
}