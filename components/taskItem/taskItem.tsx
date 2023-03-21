import { Text, View, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './taskItem.styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { TaskListStackParamList } from '../../navigators/tasksScreenNavigator';

type Props = NativeStackScreenProps<TaskListStackParamList, 'Task list'>;

export default function TaskItem({ navigation }: Props) {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Task info', { taskId: 1 })}
        style={styles.container}>
        <View style={{ alignSelf: 'flex-start' }}>
          <Text style={styles.taskDate}>00.00.0000</Text>
        </View>
        <Text style={styles.taskTitle}>Task Title</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}