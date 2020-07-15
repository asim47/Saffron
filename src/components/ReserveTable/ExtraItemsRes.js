import React, { useState } from 'react'

import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import AntDesign from "react-native-vector-icons/AntDesign"
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import { SafeAreaView } from 'react-native-safe-area-context';
const dummyData = [
    require("../../../assests/pexels-photo-461198.jpeg"),
    require("../../../assests/pexels-photo-1640777.jpeg"),
    require("../../../assests/pexels-photo-461198.jpeg"),
]
const ExtraItemsRes = (props) => {
    return (
        <Modal
            style={{ overflow:"hidden",borderRadius:20}}
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
                    style={{ height: 250 }}
                    resizeMode="contain"
                    source={require("../../../assests/pexels-photo-461198.jpeg")}
                />

                <Text style={{ color: "#871014", marginTop: 10, fontSize: 22, fontWeight: "bold" }}>
                    Eggplant Masala
                </Text>


                <Text style={{ color: "grey", marginTop: 10, fontSize: 17, }}>
                    Select Extra Items
                </Text>

                <View style={{ flex: 1, width: "100%" }}>
                    <ScrollView style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }}>
                        {
                            dummyData?.map((value) => {
                                return (
                                    <ClickAbleByAsim
                                        onPress={() => setDialogOpen(true)}
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
                                        <View style={{ flex: .6, height: "100%" }}>
                                            <Image
                                                style={{ height: "100%", width: "100%" }}
                                                source={value}
                                            />
                                        </View>
                                        <View style={{ flex: 1, height: "100%", justifyContent: "center", padding: 5 }}>
                                            <Text style={{ color: "#871014", fontSize: 22, }}>
                                                Saffron
                                        </Text>
                                          
                                            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                                                <Text style={{ color: "#871014", fontSize: 20,fontWeight:"bold" }}>
                                                    $ 16
                                            </Text>

                                                <ClickAbleByAsim
                                                    onPress={() => setDialogOpen(true)}
                                                    style={{ height: 30, width: 100, backgroundColor: "#4A8387", borderRadius: 100, justifyContent: "center", alignItems: "center", }}
                                                >
                                                    <Text style={{ color: "white" }}>Add</Text>
                                                </ClickAbleByAsim>
                                            </View>

                                        </View>

                                    </ClickAbleByAsim>
                                )
                            })
                        }
                    </ScrollView>
                </View>



                <ClickAbleByAsim
                    onPress={() => { }}
                    style={{ margin: 10, height: 50, width: 170, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 20 }}
                >
                    <Text style={{ color: "white" }}>Add To Cart</Text>
                </ClickAbleByAsim>
            </SafeAreaView>

        </Modal>
    )
}

export default ExtraItemsRes
