import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import ResItem from './components/ResItem/ResItem';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import MyProfile from './components/MyProfile/MyProfile';
import Cart from './components/Cart/Cart';
import Payment from './components/Payment/Payment';
import ReserveTable from './components/ReserveTable/ReserveTable';
import { useDispatch, useSelector } from "react-redux"
import AsyncStorage from '@react-native-community/async-storage';
import * as Actions from "../store/Action"
import SplashScreen from 'react-native-splash-screen';
import Animated from "react-native-reanimated"
import MyOrders from './components/MyOrders/MyOrders';
import ResetPassword from './components/ResetPassword/ResetPassword';
import OrderDetails from './components/OrderDetails/OrderDetails';

const Stack = createStackNavigator();



const Main = (props) => {

    const dispatch = useDispatch()
    const isAuth = useSelector(({ auth }) => auth.isAuth)
    useEffect(() => {
        CheckUser()
    }, [])


    async function CheckUser() {

        const res = await AsyncStorage.getItem("@token");
        if (res) {
            dispatch({
                type: Actions.LOGIN_ATTEMPT,
                payload: res
            })
        }
        SplashScreen.hide()
    }

    return (
        <Animated.View style={[{ flex: 1 }, props.style]}>
            <Stack.Navigator
                headerMode="none"
                initialRouteName="Login"
                screenOptions={{
                    gestureDirection: "horizontal",
                    ...TransitionPresets.SlideFromRightIOS
                }}
            >
                {
                    isAuth ? (
                        <>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="ResItem" component={ResItem} />
                            <Stack.Screen name="MyProfile" component={MyProfile} />
                            <Stack.Screen name="Cart" component={Cart} />
                            <Stack.Screen name="Payment" component={Payment} />
                            <Stack.Screen name="ReserveTable" component={ReserveTable} />
                            <Stack.Screen name="MyOrder" component={MyOrders} />
                            <Stack.Screen name="OrderDetails" component={OrderDetails} />
                        </>
                    ) : (
                            <>
                                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen name="Signup" component={Signup} />
                                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                            </>
                        )
                }


            </Stack.Navigator>

        </Animated.View>

    )
}

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
    }
})



export default Main
