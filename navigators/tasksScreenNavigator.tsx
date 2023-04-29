import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskDetails from '../components/taskDetails/taskDetails';
import TaskList from '../components/taskList/taskList';
import CreateTaskForm from '../components/createTaskForm/createTaskForm';
import colors from '../styles/colors.json';

export type TaskListStackParamList = {
    'Task list': undefined;
    'Task info': { taskId: number };
    'Create task': undefined;
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
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='Task info'
                    component={TaskDetails} />
                <Stack.Screen
                    name='Create task'
                    component={CreateTaskForm} />
            </Stack.Group>
        </Stack.Navigator>
    );
}