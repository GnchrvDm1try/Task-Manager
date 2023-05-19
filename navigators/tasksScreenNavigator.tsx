import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskDetails from '../components/taskDetails/taskDetails';
import TaskList from '../components/taskList/taskList';
import TaskForm from '../components/taskForm/taskForm';
import StageForm from '../components/stageForm/stageForm';
import colors from '../styles/colors.json';

export type TaskListStackParamList = {
    'Task list': { refresh: boolean };
    'Task info': { taskId: number };
    'Create task': undefined;
    'Edit task': { taskId: number };
    'Create stage': { taskId: number };
    'Edit stage': { stageId: number };
};

const Stack = createNativeStackNavigator<TaskListStackParamList>();

export default function TasksScreen() {
    return (
        <Stack.Navigator>
            <Stack.Group
                screenOptions={{
                    headerTitleStyle: { fontSize: 30 },
                    headerStyle: { backgroundColor: colors.primaryColor }
                }}>
                <Stack.Screen
                    name='Task list'
                    component={TaskList}
                    initialParams={{ refresh: true }}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='Task info'
                    component={TaskDetails} />
                <Stack.Screen
                    name='Create task'
                    component={TaskForm} />
                <Stack.Screen
                    name='Edit task'
                    component={TaskForm} />
                <Stack.Screen
                    name='Create stage'
                    component={StageForm} />
                <Stack.Screen
                    name='Edit stage'
                    component={StageForm} />
            </Stack.Group>
        </Stack.Navigator>
    );
}