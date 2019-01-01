import {createStackNavigator} from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import ShowProductsScreen from '../screens/ShowProductsScreen'

const AppNavigator = createStackNavigator({
    HomeScreen: {screen: HomeScreen},
    ShowProductsScreen: {screen: ShowProductsScreen},
});
export default AppNavigator;