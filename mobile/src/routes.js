import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack =  createStackNavigator()

import Incidents from './Pages/Incidents/Index'
import Details from './Pages/Details/Index'

const Routes = () => {
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Incidents" component={Incidents}/>
                <AppStack.Screen name="Details" component={Details}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes