import {createStackNavigator} from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import ProductsListScreen from '../screens/ProductsListScreen'
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import LoginScreen from "../screens/LoginScreen";

const AppNavigator = createStackNavigator({
    HomeScreen: {screen: HomeScreen},
    ProductsListScreen: {screen: ProductsListScreen},
    ProductDetailsScreen: {screen: ProductDetailsScreen},
    LoginScreen: {screen: LoginScreen},
});
export default AppNavigator;