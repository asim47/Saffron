import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from './main';
import Animated from "react-native-reanimated"
import { useDispatch, useSelector } from "react-redux"
const DrawerNav = createDrawerNavigator();
import DrawerComponent from "./DrawerComponent/DrawerComponent"
const Drawer = () => {
    const dispatch = useDispatch()

    const [Progress, setProgress] = useState(new Animated.Value(0))


    const scale = Animated.interpolate(Progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    })

    const borderRadius = Animated.interpolate(Progress, {
        inputRange: [0, 1],
        outputRange: [0, 16],
    });

    const animatedStyle = { borderRadius, transform: [{ scale }] };

    const isAuth = useSelector(({ auth }) => auth.isAuth)

    return (
        <NavigationContainer>
            <DrawerNav.Navigator
                drawerType="slide"
                drawerStyle={{ width: isAuth ? "50%" : "0%" }}
                initialRouteName="App"
                overlayColor="transparent"
                contentContainerStyle={{ flex: 1 }}
                drawerContentOptions={{
                    activeBackgroundColor: 'transparent',
                    activeTintColor: 'white',
                    inactiveTintColor: 'white',
                }}
                sceneContainerStyle={{ backgroundColor: 'transparent' }}
                drawerContent={(props) => {
                    setProgress(props.progress)
                    return <DrawerComponent {...props} />
                }}
            >
                <DrawerNav.Screen name="App"   >
                    {props => <Main {...props} style={animatedStyle} />}
                </DrawerNav.Screen>

            </DrawerNav.Navigator>
        </NavigationContainer>
    )
}

export default Drawer
