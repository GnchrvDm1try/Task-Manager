import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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

    return (
        <View style={baseStyles.container}>
            <View style={baseStyles.horizontalContainer}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={baseStyles.mainButton}>
                    <Text style={styles.buttonTextContent}>{task.isDone ? 'Mark as unfinished' : 'Mark as finished'}</Text>
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
            <FlatList data={task.stages} renderItem={({ item }) => {
                return (
                    <View>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity
                                onPress={() => { }}>
                                {
                                    !!item.isDone &&
                                    <UnCheckedMarkIcon height={30} width={30} color={colors.borderColor} style={{ marginRight: 10 }} />
                                }
                                {
                                    !item.isDone &&
                                    <CheckedMarkIcon height={30} width={30} style={{ marginRight: 10 }} />
                                }
                            </TouchableOpacity>
                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.stageHeader, item.isDone ? {color: colors.borderColor} : {}]}>{item.title}</Text>
                        </View>
                        <Text style={[styles.stageDescription, item.isDone ? {color: colors.borderColor} : {}]}>{item.description}</Text>
                    </View>
                );
            }
            } />
        </View>
    );
}