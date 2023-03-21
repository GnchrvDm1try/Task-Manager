import { Text, View, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './taskItem.styles';

export default function TaskItem() {
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.container}>
        <View style={{ alignSelf: 'flex-start' }}>
          <Text style={styles.taskDate}>00.00.0000</Text>
        </View>
        <Text style={styles.taskTitle}>Task Title</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}