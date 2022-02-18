import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Home from '../screens/Home'

import CreateGarden from '../screens/CreateGarden'
import Register from '../screens/Register'
import Login from '../screens/Login'
import MyTabs from './MyTabs'
import Password from '../screens/Password'

const Stack = createNativeStackNavigator()


const MyStacks = () => {

    return(
        <NavigationContainer >
            <Stack.Navigator >

                <Stack.Screen name="home" component={Home}/>
                <Stack.Screen name="register" component={Register}/>
                <Stack.Screen name="login" component={Login}/>
                <Stack.Screen name="password" component={Password}/>
                <Stack.Screen name="createGarden" component={CreateGarden}/>
                <Stack.Screen name="principal" component={MyTabs} options={{headerShown: false}}/>

            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default MyStacks