import { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskListStackParamList } from '../../navigators/tasksScreenNavigator';
import DateTimePicker from '@react-native-community/datetimepicker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Task from '../../models/Task';
import { DBManager } from '../../DBManager';
import { baseStyles } from '../../styles/baseStyles';
import { formStyles } from '../../styles/formStyles';
import colors from '../../styles/colors.json';

type Props = NativeStackScreenProps<TaskListStackParamList, 'Create task'>;

export default function CreateTaskForm({ navigation, route }: Props) {
    const MINUTE_IN_MILLISECONDS = 60000;
    const INITIAL_DEADLINE_GAP_IN_MINUTES = 60;

    const [title, setTitle] = useState('');
    const [beginDate, setBeginDate] = useState(new Date());
    // Setting the initial value of the deadline date with the begin date's value plus a gap in minutes
    const [deadlineDate, setDeadlineDate] = useState(new Date(beginDate.getTime() + INITIAL_DEADLINE_GAP_IN_MINUTES * MINUTE_IN_MILLISECONDS));
    const [isBeginDateUsed, setIsBeginDateUsed] = useState(false);
    const [isDeadlineDateUsed, setIsDeadlineDateUsed] = useState(false);

    return (
        <ScrollView contentContainerStyle={formStyles.formContainer}>
            <TextInput
                placeholder='Title*'
                style={[formStyles.inputField, { borderColor: title.trim().length > 0 ? colors.borderColor : 'red' }]}
                onChangeText={(text) => { setTitle(text.trim()) }} />

            <BouncyCheckbox
                fillColor={colors.primaryColor}
                text='Date of beginning:'
                textStyle={[formStyles.hint, { textDecorationLine: 'none' }]}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={isBeginDateUsed}
                onPress={(isChecked: boolean) => {
                    setIsBeginDateUsed(isChecked);
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
                onPress={(isChecked: boolean) => {
                    setIsDeadlineDateUsed(isChecked)
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
                        let task: Task = new Task({
                            title: title,
                            beginDate: isBeginDateUsed ? beginDate : undefined,
                            deadlineDate: isDeadlineDateUsed ? deadlineDate : undefined
                        });

                        DBManager.getInstance().createTask(task).then((res) => {
                            // Updating navigation state using reset common action
                            navigation.dispatch(state => {
                                // Removing 'Create task' screen, so the back button will lead to the previous page from the task creation screen
                                const routes = state.routes.filter(r => r.name !== 'Create task');

                                return CommonActions.reset({
                                    ...state,
                                    routes,
                                    index: routes.length - 1
                                });
                            });
                            navigation.navigate('Task list', { update: true });
                            navigation.navigate('Task info', { taskId: res });
                        });
                    }}>
                    <Text style={baseStyles.buttonTextContent}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={baseStyles.mainButton}
                    onPress={() => navigation.goBack()}>
                    <Text style={baseStyles.buttonTextContent}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}