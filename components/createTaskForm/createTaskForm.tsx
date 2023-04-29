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
    const INITIAL_DEADLINE_GAP_IN_MINUTES = 60;

    const [title, setTitle] = useState('');
    const [beginDate, setBeginDate] = useState<Date | undefined>(undefined)
    const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(undefined)

    return (
        <ScrollView contentContainerStyle={formStyles.formContainer}>
            <TextInput
                placeholder='Title*'
                style={[formStyles.inputField, { borderColor: title.trim().length > 0 ? colors.borderColor : 'red' }]}
                onChangeText={(text) => { setTitle(text.trim()) }}
                onBlur={() => { Alert.alert('blured') }} />

            <BouncyCheckbox
                fillColor={colors.primaryColor}
                text='Date of beginning:'
                textStyle={[formStyles.hint, { textDecorationLine: 'none' }]}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={!!beginDate}
                onPress={(isChecked: boolean) => {
                    if (isChecked) setBeginDate(new Date());
                    else setBeginDate(undefined);
                }}
            />
            <View style={[baseStyles.horizontalContainer, formStyles.dateContainer]}>
                <DateTimePicker
                    value={beginDate ?? new Date()}
                    mode={'date'}
                    disabled={!beginDate}
                    onChange={(data) => {
                        if (data.type !== 'dismissed') {
                            let date: Date = new Date(data.nativeEvent.timestamp!);
                            beginDate!.setUTCDate(date.getDate());
                            beginDate!.setUTCMonth(date.getMonth());
                            beginDate!.setUTCFullYear(date.getFullYear());
                        }
                    }}
                />
                <DateTimePicker
                    value={beginDate ?? new Date()}
                    mode={'time'}
                    is24Hour={false}
                    disabled={!beginDate}
                    onChange={(data) => {
                        if (data.type !== 'dismissed') {
                            let date: Date = new Date(data.nativeEvent.timestamp!);
                            beginDate!.setUTCHours(date.getHours());
                            beginDate!.setUTCMinutes(date.getMinutes());
                        }
                    }}
                />
            </View>

            <BouncyCheckbox
                fillColor={colors.primaryColor}
                text='Deadline date:'
                textStyle={[formStyles.hint, { textDecorationLine: 'none' }]}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={!!deadlineDate}
                onPress={(isChecked: boolean) => {
                    if (isChecked) setDeadlineDate(new Date(Date.now() + INITIAL_DEADLINE_GAP_IN_MINUTES * 60000));
                    else setDeadlineDate(undefined);
                }}
            />
            <View style={[baseStyles.horizontalContainer, formStyles.dateContainer]}>
                <DateTimePicker
                    // Setting the initial value of the date picker with the deadline date's value if it's provided,
                    // otherwise, with the current date plus a gap in minutes, so date will increase if hours was more than 24
                    value={deadlineDate ?? new Date(Date.now() + INITIAL_DEADLINE_GAP_IN_MINUTES * 60000)}
                    mode={'date'}
                    disabled={!deadlineDate}
                    onChange={(data) => {
                        if (data.type !== 'dismissed') {
                            let date: Date = new Date(data.nativeEvent.timestamp!);
                            deadlineDate!.setDate(date.getDate());
                            deadlineDate!.setMonth(date.getMonth());
                            deadlineDate!.setFullYear(date.getFullYear());
                        }
                    }}
                />
                <DateTimePicker
                    // Setting the initial value of the time picker with the deadline date's value if it's provided,
                    // otherwise, with the current date plus a gap in minutes
                    value={deadlineDate ?? new Date(Date.now() + INITIAL_DEADLINE_GAP_IN_MINUTES * 60000)}
                    mode={'time'}
                    is24Hour={true}
                    disabled={!deadlineDate}
                    onChange={(data) => {
                        if (data.type !== 'dismissed') {
                            let date: Date = new Date(data.nativeEvent.timestamp!);
                            deadlineDate!.setUTCHours(date.getHours());
                            deadlineDate!.setUTCMinutes(date.getMinutes());
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
                            beginDate: beginDate,
                            deadlineDate: deadlineDate
                        });

                        DBManager.getInstance().createTask(task).then((res) => {
                            // Updating navigation state using reset common action, so the navigation route of the
                            // task list will be reassigned
                            navigation.dispatch(state => {
                                const routes = state.routes;
                                const index = routes.findIndex(el => el.name === 'Task list');

                                if (index !== -1)
                                    routes[index] = { key: routes[index].key, name: routes[index].name };

                                return CommonActions.reset({
                                    ...state,
                                    routes,
                                    index: routes.length - 1
                                });
                            });
                            navigation.navigate('Task info', { taskId: res.insertId! })
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