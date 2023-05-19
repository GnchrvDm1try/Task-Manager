import { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Stage from '../../models/Stage';
import { DBManager } from '../../DBManager';
import CheckedMarkIcon from '../../assets/icons/checked_mark_icon.svg';
import UnCheckedMarkIcon from '../../assets/icons/unchecked_mark_icon.svg';
import Ellipsis from '../../assets/icons/ellipsis_icon.svg';
import { styles } from './stageItem.styles';
import { baseStyles } from '../../styles/baseStyles';
import { modalWindowStyles } from '../../styles/modalWindowStyles';
import colors from '../../styles/colors.json';
import type { TaskListStackParamList } from '../../navigators/tasksScreenNavigator';

type Props = {
    stage: Stage;
}

export default function StageItem(props: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<TaskListStackParamList>>();

    const [stage, setStage] = useState(props.stage);
    const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

    const ContextMenu = () => {
        return (
            <Modal
                transparent
                visible={isContextMenuVisible}
                animationType='none'
                onRequestClose={() => { }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setIsContextMenuVisible(false)}
                    style={modalWindowStyles.backgroundCloseOpacity}>
                    <View style={modalWindowStyles.modalContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                setIsContextMenuVisible(false);
                                navigation.navigate('Edit stage', { stageId: stage.id });
                            }}
                            style={modalWindowStyles.button}>
                            <Text style={baseStyles.headerM}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert('Deleting of the stage', 'Are you sure you want to permanently delete this stage?', [
                                    {
                                        text: 'Delete', onPress: () => DBManager.getInstance().deleteStage(stage.id).then(() => {
                                            setIsContextMenuVisible(false);
                                            navigation.navigate('Task list', { update: true });
                                            navigation.navigate('Task info', { taskId: stage.taskId });
                                        })
                                    },
                                    { text: 'Cancel', style: 'cancel' }
                                ]);
                            }}
                            style={modalWindowStyles.buttonLast}>
                            <Text style={baseStyles.headerM}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }

    return (
        <View>
            {ContextMenu()}
            <View style={styles.headerContainer}>
                <Text style={[baseStyles.headerL, { width: '93%' }, stage.isDone ? { color: colors.borderColor } : {}]}>
                    <TouchableOpacity
                        onPress={() => {
                            const newStage: Stage = { ...stage, isDone: !stage.isDone };
                            DBManager.getInstance().updateStage(newStage).then(() => setStage(newStage));
                        }}>
                        {
                            stage.isDone &&
                            <UnCheckedMarkIcon height={30} width={30} color={colors.borderColor} style={{ marginRight: 10 }} />
                        }
                        {
                            !stage.isDone &&
                            <CheckedMarkIcon height={30} width={30} style={{ marginRight: 10 }} />
                        }
                    </TouchableOpacity>
                    {stage.title}
                </Text>
                <TouchableOpacity
                    onPress={() => setIsContextMenuVisible(true)}>
                    <Ellipsis height={30} width={8} style={{ padding: 15 }} />
                </TouchableOpacity>
            </View>
            {
                stage.deadlineDate &&
                <Text style={[{ marginVertical: 4 }, stage.isDone ? { color: colors.borderColor } : {}]}>
                    <Text style={baseStyles.hintS}>Deadline: </Text>
                    <Text style={baseStyles.headerS}>{stage.deadlineDate?.toLocaleString('de', { dateStyle: 'medium', timeStyle: 'short' })}</Text>
                </Text>
            }
            <Text style={[styles.stageDescription, stage.isDone ? { color: colors.borderColor } : {}]}>{stage.description}</Text>
        </View>
    );
}