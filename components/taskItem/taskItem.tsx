import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Task from '../../models/Task';
import Stage from '../../models/Stage';
import { DBManager } from '../../DBManager';
import { styles } from './taskItem.styles';
import { baseStyles } from '../../styles/baseStyles';

type Props = {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  const [stages, setStages] = useState(new Array<Stage>());
  const navigation1 = useNavigation();

  useEffect(() => {
    DBManager.getInstance().getStages(task.id).then((res) => {
      task.stages = res;
      setStages(res);
    });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation1.navigate('Task info', { task })}
      style={[styles.container, { marginRight: 15 }]}>
      <View style={baseStyles.horizontalContainer}>
        <Text style={styles.date}>{new Date(task.additionDate.toString()).toLocaleDateString()}</Text>
        <View style={baseStyles.horizontalContainer}>
          {
            !!task.beginDate &&
            <View style={baseStyles.horizontalContainer}>
              <Text style={styles.otherInfo}>From:</Text>
              <Text style={[styles.date, { marginRight: 5 }]}>{new Date(task.beginDate!.toString()).toLocaleDateString()}</Text>
            </View>
          }
          {
            !!task.deadlineDate &&
            <View style={baseStyles.horizontalContainer}>
              <Text style={styles.otherInfo}>Till:</Text>
              <Text style={styles.date}>{new Date(task.deadlineDate!.toString()).toLocaleDateString()}</Text>
            </View>
          }
        </View>
      </View>
      <Text style={styles.otherInfo}>Stages: {task.stages.length}</Text>
      <Text style={styles.title}>{task.title}</Text>
    </TouchableOpacity>
  );
}