import { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskListStackParamList } from '../../navigators/tasksScreenNavigator';
import DateTimePicker from '@react-native-community/datetimepicker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Stage from '../../models/Stage';
import { DBManager } from '../../DBManager';
import { baseStyles } from '../../styles/baseStyles';
import { formStyles } from '../../styles/formStyles';
import colors from '../../styles/colors.json';

type Props = NativeStackScreenProps<TaskListStackParamList, 'Create stage'>;

export default function StageForm(props: Props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadlineDate, setDeadlineDate] = useState(new Date());
    const [isDeadlineDateUsed, setIsDeadlineDateUsed] = useState(false);

    return (
        <ScrollView contentContainerStyle={formStyles.formContainer}>
            <TextInput
                value={title}
                placeholder='Title*'
                style={[formStyles.inputField, { borderColor: title.trim().length > 0 ? colors.borderColor : 'red' }]}
                onChangeText={(text) => { setTitle(text) }} />
            <TextInput
                value={description}
                placeholder='Description'
                multiline={true}
                style={formStyles.inputField}
                onChangeText={(text) => { setDescription(text) }} />

            <BouncyCheckbox
                fillColor={colors.primaryColor}
                text='Deadline date:'
                textStyle={[formStyles.hint, { textDecorationLine: 'none' }]}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={isDeadlineDateUsed}
                disableBuiltInState
                onPress={() => setIsDeadlineDateUsed(!isDeadlineDateUsed)}
            />
            <View style={[baseStyles.horizontalContainer, formStyles.dateContainer]}>
                <DateTimePicker
                    value={deadlineDate}
                    mode={'date'}
                    disabled={!isDeadlineDateUsed}
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
                        const stage: Stage = new Stage({
                            taskId: props.route.params.taskId,
                            title: title,
                            description: description.trim().length > 0 ? description.trim() : undefined,
                            deadlineDate: isDeadlineDateUsed ? deadlineDate : undefined
                        });

                        DBManager.getInstance().createStage(stage).then(() => {
                            props.navigation.navigate('Task list', { update: true });
                            props.navigation.navigate('Task info', { taskId: stage.taskId });
                        });
                    }}>
                    <Text style={baseStyles.buttonTextContent}>{'Create'}</Text>
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