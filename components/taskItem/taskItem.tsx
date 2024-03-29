import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { TaskListStackParamList } from '../../navigators/tasksScreenNavigator';
import Task from '../../models/Task';
import { styles } from './taskItem.styles';
import { baseStyles } from '../../styles/baseStyles';
import colors from '../../styles/colors.json';

type Props = {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<TaskListStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Task info', { taskId: task.id })}
      style={[styles.container, { marginRight: 15 }]}>
      <View style={baseStyles.horizontalContainer}>
        <Text style={styles.date}>{task.additionDate.toLocaleDateString()}</Text>
        <View style={baseStyles.horizontalContainer}>
          {
            !!task.beginDate &&
            <View style={baseStyles.horizontalContainer}>
              <Text style={styles.otherInfo}>From:</Text>
              <Text style={[styles.date, { marginRight: 5 }]}>{task.beginDate.toLocaleDateString()}</Text>
            </View>
          }
          {
            !!task.deadlineDate &&
            <View style={baseStyles.horizontalContainer}>
              <Text style={styles.otherInfo}>Till:</Text>
              <Text style={styles.date}>{task.deadlineDate.toLocaleDateString()}</Text>
            </View>
          }
        </View>
      </View>
      <Text style={styles.otherInfo}>Stages: {task.stages.length}</Text>
      <Text numberOfLines={5} ellipsizeMode={'tail'} style={[styles.title, task.isDone && { color: colors.borderColor }]}>{task.title}</Text>
    </TouchableOpacity>
  );
}