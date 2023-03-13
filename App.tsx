import { StyleSheet, View } from 'react-native';
import NavigationBar from './components/navigationBar/navigationBar';
import TaskItem from "./components/taskItem/taskItem";
import colors from './styles/colors.json';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationBar>
        <TaskItem/>
      </NavigationBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.environmentColor
  },
});
