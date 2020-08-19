import React, { useState } from 'react'

import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import AntDesign from "react-native-vector-icons/AntDesign"
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../../store/Action"


const dummyData = [
    require("../../../assests/pexels-photo-461198.jpeg"),
    require("../../../assests/pexels-photo-1640777.jpeg"),
    require("../../../assests/pexels-photo-461198.jpeg"),
]
const ExtraItemsDialog = (props) => {

    const dispatch = useDispatch()

    const AdditionalItems = useSelector(({ res }) => res.AdditionalItems)

    return (
        <Modal
            style={{ overflow: "hidden", borderRadius: 20, marginTop: "20%", marginBottom: "20%" }}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={props.open}
            hasBackdrop={true}
            onBackButtonPress={() => {
                props.close()
            }}
            onBackdropPress={() => {
                props.close()
            }}
        >
            <SafeAreaView style={{ height: "100%", width: "100%", backgroundColor: "white", alignItems: "center" }}>
                <ClickAbleByAsim
                    onPress={() => props.close()}
                    style={{ elevation: 6, zIndex: 100, height: 40, width: 40, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", position: "absolute", top: 10, right: 10 }}
                >
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>X</Text>
                </ClickAbleByAsim>
                <Image
                    style={{ height: 250, width: "100%" }}
                    resizeMode="cover"
                    source={{ uri: `https://saffronclub.com.au/core/storage/app/${props.ExtraDiaogImage}` }}
                />

                <Text style={{ color: "#871014", marginTop: 10, fontSize: 22, fontWeight: "bold" }}>
                    {props.ExtraDiaogName}
                </Text>




                <View style={{ flex: 1, width: "100%", }}>
                    <ScrollView style={{ width: "100%", }} contentContainerStyle={{ alignItems: "center" }}>

                        {
                            props.DialogType == "Extra" ? (
                                <>
                                    {
                                        props.ExtraItems?.map((value) => {
                                            return (
                                                <ClickAbleByAsim
                                                    onPress={() => {
                                                        if (!value.cart) {
                                                            dispatch(Actions.AddExtraItemToCart(value.id))
                                                        } else {
                                                            dispatch(Actions.RemoveProduct(value.id_cart))
                                                        }
                                                    }}
                                                    style={{
                                                        height: 80,
                                                        width: "90%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderWidth: 1,
                                                        borderColor: "white",
                                                        marginTop: 30,
                                                        backgroundColor: "white", //rgba(0,0,0,.3)
                                                        elevation: 6,
                                                        borderRadius: 5,
                                                        flexDirection: "row",
                                                        overflow: "hidden"
                                                    }}
                                                >
                                                    <View style={{ flex: 1, height: "100%", justifyContent: "center", padding: 5, paddingLeft: 20 }}>
                                                        <Text style={{ color: "#871014", fontSize: 22, }}>
                                                            {value.name}
                                                        </Text>

                                                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                                                            <Text style={{ color: "#871014", fontSize: 20, fontWeight: "bold" }}>
                                                                $ 16
                                            </Text>

                                                            <ClickAbleByAsim
                                                                onPress={() => {
                                                                    if (!value.cart) {
                                                                        dispatch(Actions.AddExtraItemToCart(value.id))
                                                                    } else {
                                                                        dispatch(Actions.RemoveProduct(value.id_cart))
                                                                    }
                                                                }}
                                                                style={{ height: 30, width: 100, backgroundColor: "#4A8387", borderRadius: 100, justifyContent: "center", alignItems: "center", }}
                                                            >
                                                                <Text style={{ color: "white" }}>
                                                                    {value.cart ? "Remove" : "Add"}
                                                                </Text>
                                                            </ClickAbleByAsim>
                                                        </View>

                                                    </View>

                                                </ClickAbleByAsim>
                                            )
                                        })
                                    }
                                </>
                            ) : (
                                    <>

                                        {
                                            AdditionalItems?.map((value, index) => {
                                            
                                                return (
                                                    <View
                                                        // onPress={() => setDialogOpen(true)}
                                                        style={{
                                                            height: 150,
                                                            width: "90%",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            borderWidth: 1,
                                                            borderColor: "white",
                                                            marginTop: 30,
                                                            backgroundColor: "white", //rgba(0,0,0,.3)
                                                            elevation: 6,
                                                            borderRadius: 5,
                                                            flexDirection: "row",
                                                            overflow: "hidden"
                                                        }}
                                                    >
                                                        <View style={{ flex: .6, height: "100%" }}>
                                                            <Image
                                                                style={{ height: "100%", width: "100%" }}
                                                                source={{ uri: `https://saffronclub.com.au/core/storage/app/${value.image}` }}
                                                            />
                                                        </View>
                                                        <View style={{ flex: 1, height: "100%", justifyContent: "center", padding: 5 }}>
                                                            <Text style={{ color: "#871014", fontSize: 22, }}>
                                                                {value.name}
                                                            </Text>
                                                            <Text style={{ color: "#871014", fontSize: 11, width: "90%", marginTop: 5, marginBottom: 5 }}>
                                                                {value.desc}
                                                            </Text>
                                                            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                                                                <Text style={{ color: "#871014", fontSize: 22, }}>
                                                                    ${value.price}
                                                                </Text>

                                                                <ClickAbleByAsim
                                                                    onPress={() => {
                                                                        if (!value.cart) {

                                                                            dispatch(Actions.AddProductToCart(value.id))

                                                                        } else {
                                                                            console.log(value.id_cart)
                                                                            dispatch(Actions.RemoveProduct(value.id_cart))
                                                                        }
                                                                    }}
                                                                    style={{ height: 30, width: 100, backgroundColor: "#4A8387", borderRadius: 100, justifyContent: "center", alignItems: "center", }}
                                                                >
                                                                    <Text style={{ color: "white" }}>

                                                                        {
                                                                            value.cart ? "Remove" : "Add"
                                                                        }
                                                                    </Text>
                                                                </ClickAbleByAsim>
                                                            </View>

                                                        </View>

                                                    </View>
                                                )
                                            })
                                        }
                                    </>
                                )
                        }

                        <View style={{ height: 20 }}>

                        </View>
                    </ScrollView>
                </View>



                <ClickAbleByAsim
                    onPress={() => {
                        props.close()
                        props.navigate("Home")
                    }}
                    style={{ margin: 10, height: 50, width: 170, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 20 }}
                >
                    <Text style={{ color: "white" }}>Continue shopping</Text>
                </ClickAbleByAsim>
            </SafeAreaView>

        </Modal>
    )
}

export default ExtraItemsDialog
