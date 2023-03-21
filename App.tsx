import { StyleSheet, View } from 'react-native';
import BottomTabsNavigator from './navigators/bottomTabsNavigator';
import colors from './styles/colors.json';

export default function App() {
  return (
    <View style={styles.container}>
      <BottomTabsNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.environmentColor
  },
});
