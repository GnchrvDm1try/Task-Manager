import { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TaskItem from '../taskItem/taskItem';
import Task from '../../models/Task';
import { DBManager } from '../../DBManager';
import AddIcon from '../../assets/icons/add_icon.svg';
import { baseStyles } from '../../styles/baseStyles';
import colors from '../../styles/colors.json';
import TriangleIcon from '../../assets/icons/triangle_icon.svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { TaskListStackParamList } from '../../navigators/tasksScreenNavigator';

type Props = NativeStackScreenProps<TaskListStackParamList, 'Task list'>;

export default function TaskList({ navigation, route }: Props) {
    const [tasks, setTasks] = useState(new Array<Task>());
    const [orderProperty, setLastOrder] = useState<keyof Task | undefined>(undefined);
    const [isOrderReversed, setIsOrderReversed] = useState(false);

    useEffect(() => {
        if (route.params.refresh) {
            DBManager.getInstance().getAllTasksWithStages().then((res) => setTasks(res));
            navigation.setParams({ refresh: false });
        }
    }, [route.params.refresh]);

    useEffect(() => {
        if (orderProperty)
            orderTasksByProperty()
    }, [orderProperty, isOrderReversed])

    function orderTasksByProperty() {
        if (tasks.length === 0 || !orderProperty)
            return;

        const reverseCoefficient = isOrderReversed ? -1 : 1;
        const propertyValue = findDefinedPropValue();
        let ordered = tasks;

        if (propertyValue instanceof Date)
            ordered = tasks.sort((a, b) => {
                if (!a[orderProperty])
                    return 1;
                if (!b[orderProperty])
                    return -1;
                return reverseCoefficient * ((a[orderProperty] as Date).getTime() - (b[orderProperty] as Date).getTime());
            }).map(t => ({ ...t }));
        else if (typeof propertyValue === 'boolean')
            ordered = tasks.sort((a, b) => reverseCoefficient * ((a[orderProperty] as Boolean ? 1 : 0) - (b[orderProperty] as Boolean ? 1 : 0))).map(t => ({ ...t }));
        else if (typeof propertyValue === 'number')
            ordered = tasks.sort((a, b) => reverseCoefficient * ((a[orderProperty] as number) - (b[orderProperty] as number))).map(t => ({ ...t }));

        setTasks(ordered);
    }

    function findDefinedPropValue(): Task[keyof Task] {
        for (let i = 0; i < tasks.length; i++)
            if (tasks[i][orderProperty!])
                return tasks[i][orderProperty!];
        return tasks[0][orderProperty!];
    }

    return (
        <SafeAreaView style={[tasks.length === 0 ? baseStyles.alertContainer : baseStyles.container, { marginRight: 0 }]}>
            {tasks.length === 0
                ? <Text style={baseStyles.headerM}>You have no tasks</Text>
                : <View style={{ flex: 1 }}>
                    <View style={[baseStyles.horizontalContainer, { marginRight: 15 }]}>
                        <TouchableOpacity
                            onPress={() => { setIsOrderReversed(orderProperty === 'additionDate' && !isOrderReversed); setLastOrder('additionDate'); }}
                            style={baseStyles.mainButton}>
                            <Text>Addition</Text>
                            {orderProperty === 'additionDate' && <TriangleIcon height={10} width={10} style={!isOrderReversed && { transform: [{ rotate: '180deg' }] }} />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setIsOrderReversed(orderProperty === 'isDone' && !isOrderReversed); setLastOrder('isDone'); }}
                            style={baseStyles.mainButton}>
                            <Text>Readiness</Text>
                            {orderProperty === 'isDone' && <TriangleIcon height={10} width={10} style={!isOrderReversed && { transform: [{ rotate: '180deg' }] }} />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setIsOrderReversed(orderProperty === 'beginDate' && !isOrderReversed); setLastOrder('beginDate'); }}
                            style={baseStyles.mainButton}>
                            <Text>Beginning</Text>
                            {orderProperty === 'beginDate' && <TriangleIcon height={10} width={10} style={!isOrderReversed && { transform: [{ rotate: '180deg' }] }} />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setIsOrderReversed(orderProperty === 'deadlineDate' && !isOrderReversed); setLastOrder('deadlineDate'); }}
                            style={baseStyles.mainButton}>
                            <Text>Deadline</Text>
                            {orderProperty === 'deadlineDate' && <TriangleIcon height={10} width={10} style={!isOrderReversed && { transform: [{ rotate: '180deg' }] }} />}
                        </TouchableOpacity>
                    </View>
                    <FlatList data={tasks} renderItem={({ item }) => (<TaskItem task={item} />)} />
                </View>}
            <TouchableOpacity style={baseStyles.addButton}
                onPress={() => navigation.navigate('Create task')}>
                <AddIcon height={60} width={60} color={colors.primaryColor} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}