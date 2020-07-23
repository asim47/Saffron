import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, ImageBackground, ActivityIndicator, ScrollView } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import AntDesign from "react-native-vector-icons/AntDesign"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../../store/Action"

const MyOrders = (props) => {
    const { navigate, openDrawer, goBack } = props.navigation;

    const dispatch = useDispatch()


    const MyOrder = useSelector(({ res }) => res.MyOrders)

    console.log(MyOrder)
    useEffect(() => {
        dispatch(Actions.OrderHistory())
    }, [])

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            {/* Navbar */}

            <View style={{ paddingRight: "5%", paddingLeft: "5%", height: 60, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", zIndex: 100, elevation: 1, marginTop: -2 }}>
                <ClickAbleByAsim style={{ padding: 5, paddingLeft: 0 }} onPress={() => goBack()}>
                    <AntDesign
                        name="arrowleft"
                        size={30}
                    />
                </ClickAbleByAsim>


                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    My Orders
                </Text>

                <ClickAbleByAsim
                    style={{ padding: 5, paddingRight: 0 }}
                    onPress={() => navigate("Cart")}
                >
                    <AntDesign
                        name="shoppingcart"
                        size={30}
                    />
                </ClickAbleByAsim>



            </View>
            {/* Navbar */}

            {
                MyOrder.length == 0 ? (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator style={{ marginTop: -100 }} size={35} color="#871014" />
                    </View>
                ) : (
                        <ScrollView contentContainerStyle={{ alignItems: "center", paddingTop: 20, paddingBottom: 20 }}>
                            {
                                MyOrder.map((value, index) => {
                                    return (
                                        <ClickAbleByAsim
                                            onPress={() => {
                                                navigate("OrderDetails", { data: value })
                                            }}
                                            style={{ height: 100, width: "90%", borderRadius: 20, backgroundColor: "white", elevation: 6, marginBottom: 10, flexDirection: "row" }}>
                                            <View style={{ height: "100%", width: 30, justifyContent: "center", alignItems: "center" }}>
                                                <Text>
                                                    {index + 1})
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1.1, justifyContent: "center" }}>
                                                <Text>
                                                    Order ID: {value.id}
                                                </Text>
                                                <Text>
                                                    Order Date:
                                                </Text>
                                                <Text>
                                                    Order Status: pending
                                                </Text>

                                            </View>
                                            <View style={{ flex: 1, justifyContent: "center", paddingLeft: 20 }}>
                                                <Text>
                                                    Products: {value.menu_detail.length}
                                                </Text>
                                                <Text>
                                                    Total: {Math.ceil(value.total)}
                                                </Text>
                                                <Text>
                                                    Paid Via: {value.payment_method}
                                                </Text>
                                            </View>
                                        </ClickAbleByAsim>
                                    )
                                })
                            }
                        </ScrollView>
                    )
            }



        </View>
    )
}

export default MyOrders

const styles = StyleSheet.create({})
