import { useEffect, useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskListStackParamList } from '../../navigators/tasksScreenNavigator';
import DateTimePicker from '@react-native-community/datetimepicker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Task from '../../models/Task';
import { DBManager } from '../../DBManager';
import { baseStyles } from '../../styles/baseStyles';
import { formStyles } from '../../styles/formStyles';
import colors from '../../styles/colors.json';

type Props = NativeStackScreenProps<TaskListStackParamList>;

export default function TaskForm(props: Props) {
    const MINUTE_IN_MILLISECONDS = 60000;
    const INITIAL_DEADLINE_GAP_IN_MINUTES = 60;
    const isEditing = props.route.name === 'Edit task';
    
    const [taskPlaceholder, setTaskPlaceholder] = useState<Task | undefined>(undefined);
    const [title, setTitle] = useState('');
    const [beginDate, setBeginDate] = useState(new Date());
    // Setting the initial value of the deadline date with the begin date's value plus a gap in minutes
    const [deadlineDate, setDeadlineDate] = useState(new Date(beginDate.getTime() + INITIAL_DEADLINE_GAP_IN_MINUTES * MINUTE_IN_MILLISECONDS));
    const [isBeginDateUsed, setIsBeginDateUsed] = useState(false);
    const [isDeadlineDateUsed, setIsDeadlineDateUsed] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const editProps = props as NativeStackScreenProps<TaskListStackParamList, 'Edit task'>;
            DBManager.getInstance().getTaskWithStages(editProps.route.params.taskId).then((res) => {
                if (res) {
                    setTaskPlaceholder(res);
                    setTitle(res.title);
                    if (res.beginDate) {
                        setBeginDate(res.beginDate);
                        setIsBeginDateUsed(true);
                    }
                    if (res.deadlineDate) {
                        setDeadlineDate(res.deadlineDate);
                        setIsDeadlineDateUsed(true);
                    }
                }
            });
        }
    }, [])

    return (
        <ScrollView contentContainerStyle={formStyles.formContainer}>
            <TextInput
                value={title}
                placeholder='Title*'
                style={[formStyles.inputField, { borderColor: title.trim().length > 0 ? colors.borderColor : 'red' }]}
                onChangeText={(text) => { setTitle(text) }} />

            <BouncyCheckbox
                fillColor={colors.primaryColor}
                text='Date of beginning:'
                textStyle={[formStyles.hint, { textDecorationLine: 'none' }]}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={isBeginDateUsed}
                disableBuiltInState
                onPress={() => {
                    setIsBeginDateUsed(!isBeginDateUsed);
                    if (beginDate > deadlineDate)
                        setBeginDate(new Date(deadlineDate.getTime() - MINUTE_IN_MILLISECONDS));
                }}
            />
            <View style={[baseStyles.horizontalContainer, formStyles.dateContainer]}>
                <DateTimePicker
                    value={beginDate}
                    mode={'date'}
                    disabled={!isBeginDateUsed}
                    maximumDate={isDeadlineDateUsed ? new Date(deadlineDate.getTime() - MINUTE_IN_MILLISECONDS) : undefined}
                    onChange={(data) => {
                        if (data.type !== 'dismissed' && beginDate) {
                            const date: Date = new Date(data.nativeEvent.timestamp!);
                            setBeginDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), beginDate.getHours(), beginDate.getMinutes()));
                        }
                    }}
                />
                <DateTimePicker
                    value={beginDate}
                    mode={'time'}
                    is24Hour={false}
                    disabled={!isBeginDateUsed}
                    maximumDate={isDeadlineDateUsed ? new Date(deadlineDate.getTime() - MINUTE_IN_MILLISECONDS) : undefined}
                    onChange={(data) => {
                        if (data.type !== 'dismissed' && beginDate) {
                            const date: Date = new Date(data.nativeEvent.timestamp!);
                            setBeginDate(new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate(), date.getHours(), date.getMinutes()));
                        }
                    }}
                />
            </View>

            <BouncyCheckbox
                fillColor={colors.primaryColor}
                text='Deadline date:'
                textStyle={[formStyles.hint, { textDecorationLine: 'none' }]}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={isDeadlineDateUsed}
                disableBuiltInState
                onPress={() => {
                    setIsDeadlineDateUsed(!isDeadlineDateUsed)
                    if (deadlineDate < beginDate)
                        setDeadlineDate(new Date(beginDate.getTime() + MINUTE_IN_MILLISECONDS))
                }}
            />
            <View style={[baseStyles.horizontalContainer, formStyles.dateContainer]}>
                <DateTimePicker
                    value={deadlineDate}
                    mode={'date'}
                    disabled={!isDeadlineDateUsed}
                    minimumDate={isBeginDateUsed ? new Date(beginDate.getTime() + MINUTE_IN_MILLISECONDS) : undefined}
                    onChange={(data) => {
                        if (data.type !== 'dismissed' && deadlineDate) {
                            const date: Date = new Date(data.nativeEvent.timestamp!);
                            setDeadlineDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), deadlineDate.getHours(), deadlineDate.getMinutes()));
                        }
                    }}
                />
                <DateTimePicker
                    value={deadlineDate}
                    mode={'time'}
                    is24Hour={true}
                    disabled={!isDeadlineDateUsed}
                    minimumDate={isBeginDateUsed ? new Date(beginDate.getTime() + MINUTE_IN_MILLISECONDS) : undefined}
                    onChange={(data) => {
                        if (data.type !== 'dismissed' && deadlineDate) {
                            const date: Date = new Date(data.nativeEvent.timestamp!);
                            setDeadlineDate(new Date(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate(), date.getHours(), date.getMinutes()));
                        }
                    }}
                />
            </View>

            <View style={[baseStyles.horizontalContainer, { width: '60%' }]}>
                <TouchableOpacity
                    style={baseStyles.mainButton}
                    onPress={() => {
                        if (title.length < 1) {
                            Alert.alert('The title has to be at least 1 character long');
                            return;
                        }
                        const task: Task = new Task({
                            ...taskPlaceholder ?? undefined,
                            title: title,
                            beginDate: isBeginDateUsed ? beginDate : undefined,
                            deadlineDate: isDeadlineDateUsed ? deadlineDate : undefined
                        });

                        if (isEditing)
                            DBManager.getInstance().updateTask(task).then(() => {
                                if (taskPlaceholder) {
                                    props.navigation.navigate('Task list', { update: true });
                                    props.navigation.navigate('Task info', { taskId: task!.id });
                                }
                            });
                        else
                            DBManager.getInstance().createTask(task).then((res) => {
                                props.navigation.navigate('Task list', { update: true });
                                props.navigation.navigate('Task info', { taskId: res });
                            });
                    }}>
                    <Text style={baseStyles.buttonTextContent}>{isEditing ? 'Edit' : 'Create'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={baseStyles.mainButton}
                    onPress={() => props.navigation.goBack()}>
                    <Text style={baseStyles.buttonTextContent}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}