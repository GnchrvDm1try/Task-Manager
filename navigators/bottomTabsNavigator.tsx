import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TasksScreen from './tasksScreenNavigator';
import Calendar from '../components/calendar/calendar';
import TasksIcon from '../assets/icons/tasks_icon.svg';
import CalendarIcon from '../assets/icons/calendar_icon.svg';
import colors from '../styles/colors.json';

const BottomTabs = createBottomTabNavigator();

export default function BottomTabsNavigator() {
    return (
        <NavigationContainer>
            <BottomTabs.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: { height: 85, backgroundColor: colors.primaryColor }
                }}>
                <BottomTabs.Screen
                    name='TasksScreen'
                    component={TasksScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return <TasksIcon width={'50%'} height={'80%'} color={focused ? 'white' : 'black'} />;
                        }
                    }} />
                <BottomTabs.Screen
                    name='Calendar'
                    component={Calendar}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return <CalendarIcon width={'50%'} height={'80%'} color={focused ? 'white' : 'black'} />;
                        }
                    }} />
            </BottomTabs.Navigator>
        </NavigationContainer>
    )
}