import { Text, View } from "react-native";
import { styles } from "./taskItem.styles";

export default function TaskItem() {
  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'flex-start'}}>
        <Text style={styles.taskDate}>00.00.0000</Text>
      </View>
      <Text style={styles.taskTitle}>Task Title</Text>
    </View>
  );
}