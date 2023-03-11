import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import NavigationBar from './components/navigationBar/navigationBar';
import colors from './styles/colors.json';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationBar />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.environmentColor
  },
});
