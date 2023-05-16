import { Text, View, TouchableOpacity } from 'react-native';
import Stage from '../../models/Stage';
import CheckedMarkIcon from '../../assets/icons/checked_mark_icon.svg';
import UnCheckedMarkIcon from '../../assets/icons/unchecked_mark_icon.svg';
import { styles } from './stageItem.styles';
import { baseStyles } from '../../styles/baseStyles';
import colors from '../../styles/colors.json';

type Props = {
    stage: Stage;
}

export default function StageItem({ stage }: Props) {
    return (
        <View>
            <Text style={[baseStyles.headerL, stage.isDone ? { color: colors.borderColor } : {}]}>
                <TouchableOpacity
                    onPress={() => { }}>
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