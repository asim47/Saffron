import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, ImageBackground, ActivityIndicator, ScrollView } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import AntDesign from "react-native-vector-icons/AntDesign"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../../store/Action"

const OrderDetails = (props) => {
    const { navigate, openDrawer, goBack } = props.navigation;

    const { data } = props.route.params

    const dispatch = useDispatch()


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
                    Order Details
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

            <ScrollView style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }}>

                {
                    data?.reservations.length > 0 ? (
                        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, color: "#871014", fontWeight: "bold" }}>
                            Table Reservations
                        </Text>
                    ) : null
                }
                {
                    data?.reservations.map((value, index) => {
                        return (
                            <View style={{ height: 130, width: "90%", backgroundColor: "white", elevation: 6, marginBottom: 10, borderRadius: 10, justifyContent: "center", padding: 10 }}>
                                <ClickAbleByAsim
                                    onPress={() => { dispatch(Actions.RemoveTables(value.id)) }}
                                    style={{ elevation: 6, zIndex: 100, height: 30, width: 30, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", position: "absolute", top: 10, right: 10 }}
                                >
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>X</Text>
                                </ClickAbleByAsim>

                                <Text style={{ fontSize: 17, marginBottom: 5 }}>
                                    Table No: <Text style={{ color: "#871014", fontWeight: "bold" }}>{value.table.id}</Text>
                                </Text>
                                <Text style={{ fontSize: 17, marginBottom: 5 }}>
                                    Persons: <Text style={{ color: "#871014", fontWeight: "bold" }}>{value.table.person}</Text>
                                </Text>
                                <Text style={{ fontSize: 17, marginBottom: 5 }}>
                                    Time: <Text style={{ color: "#871014", fontWeight: "bold" }}>{value.time}</Text>
                                </Text>
                                <Text style={{ fontSize: 17, marginBottom: 5 }}>
                                    Date: <Text style={{ color: "#871014", fontWeight: "bold" }}>{value.date}</Text>
                                </Text>
                            </View>
                        )
                    })
                }

                {
                    data?.menu_detail.length > 0 ? (
                        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, color: "#871014", fontWeight: "bold" }}>
                            Menu
                        </Text>
                    ) : null
                }
                {
                    data?.menu_detail?.map((value) => {
                        return (
                            <View
                                style={{
                                    height: 130,
                                    width: "90%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "white",
                                    marginTop: 10,
                                    backgroundColor: "white", //rgba(0,0,0,.3)
                                    elevation: 6,
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    overflow: "hidden"
                                }}
                            >
                                <View style={{ flex: .6, height: "100%" }}>
                                    <Image
                                        resizeMode="cover"
                                        style={{ height: "100%", width: "100%" }}
                                        source={{ uri: `https://saffronclub.com.au/core/storage/app/${value?.product?.image}` }}
                                    />
                                </View>
                                <View style={{ flex: 1, height: "100%", justifyContent: "center", padding: 5 }}>
                                    <Text style={{ color: "#871014", fontSize: 19, }}>
                                        {value.product.name}
                                    </Text>
                                    <Text style={{ color: "#871014", fontSize: 17, }}>
                                        {value?.extra?.name}
                                    </Text>
                                    <Text style={{ color: "#871014", fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                                        ${value.extra ? value.extra.price : value?.product?.price}
                                    </Text>




                                </View>

                            </View>
                        )
                    })
                }

                <View
                    style={{
                        height: 50,
                        width: "90%",
                        justifyContent: "center",
                        alignItems: "center",
                        // borderWidth: 1,
                        // borderColor: "white",
                        marginTop: 30,
                        backgroundColor: "white", //rgba(0,0,0,.3)
                        elevation: 6,
                        borderRadius: 10,
                        flexDirection: "row",
                        overflow: "hidden"
                    }}
                >
                    <View style={{ flex: 1, height: "100%", backgroundColor: "#871014", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
                            Total
                        </Text>
                    </View>
                    <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 22, color: "#871014" }}>
                            ${Math.ceil(data?.total)}
                        </Text>
                    </View>

                </View>
                <View style={{ height: 50 }}>

                </View>
            </ScrollView>


        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({})
