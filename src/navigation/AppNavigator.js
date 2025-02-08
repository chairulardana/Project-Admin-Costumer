import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AdminDashboard from '../screens/AdminDashboard';
import CustomerDashboard from '../screens/CustomerDashboard';
import AddOrderScreen from '../screens/AddOrderScreen';
import AddPage from '../screens/AddBarang'
import EditPage from '../screens/EditBarang';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
             <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
             <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
                <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
                <Stack.Screen name="AddOrder" component={AddOrderScreen} />
                <Stack.Screen name="AddBarang" component={AddPage} />
                <Stack.Screen name="EditBarang" component={EditPage} />
                
            

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;