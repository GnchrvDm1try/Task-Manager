import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskItem from '../components/taskItem/taskItem';
import colors from '../styles/colors.json';

export type TaskListStackParamList = {
    'Task list': undefined;
    'Task info': { taskId: number };
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
                    component={TaskItem}
                    options={{ headerShown: false }} />
            </Stack.Group>
        </Stack.Navigator>
    );
}