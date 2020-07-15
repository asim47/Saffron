import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, ImageBackground, TextInput, } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import AntDesign from "react-native-vector-icons/AntDesign"
import { ScrollView } from 'react-native-gesture-handler';
import ExtraItemsDialog from './ExtraItemsDialog';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../../store/Action"
const dummyData = [
    require("../../../assests/pexels-photo-461198.jpeg"),
    require("../../../assests/pexels-photo-1640777.jpeg"),
    require("../../../assests/pexels-photo-461198.jpeg"),
    require("../../../assests/pexels-photo-1640777.jpeg"),
    require("../../../assests/pexels-photo-461198.jpeg"),
    require("../../../assests/pexels-photo-1640777.jpeg"),
    require("../../../assests/pexels-photo-461198.jpeg"),
    require("../../../assests/pexels-photo-1640777.jpeg"),
]

const ResItem = (props) => {

    const dispatch = useDispatch()

    const { navigate, openDrawer, goBack } = props.navigation;
    const { id, name } = props.route.params


    const [DialogOpen, setDialogOpen] = useState(false)
    const [Items, setItems] = useState([])
    const [AllItems, setAllItems] = useState([])
    const [SelectedItemToShowForExtraItem, setSelectedItemToShowForExtraItem] = useState(0)
    const [ExtraItems, setExtraItems] = useState([])
    const [ExtraDiaogImage, setExtraDiaogImage] = useState("")
    const [ExtraDiaogName, setExtraDiaogName] = useState("")
    const [UseLess, setUseLess] = useState(1)
    const Data = useSelector(({ res }) => res.CategoriesData)


    useEffect(() => {
        if (SelectedItemToShowForExtraItem) {
            setExtraItems(AllItems.filter(x => x.id == SelectedItemToShowForExtraItem)[0].extra)
        }
    }, [SelectedItemToShowForExtraItem, Data, UseLess])

    useEffect(() => { 
        if (id) {
            setItems(Data.filter(x => x.id == id)[0].products)
            setAllItems(Data.filter(x => x.id == id)[0].products)
        }
        setUseLess(UseLess + 1)
    }, [id, Data])

    const filterByText = (arr, text) => {
        return arr.filter((item) => (
            !(
                item.name.toLowerCase().indexOf(text.toLowerCase()) === -1
            )
        )
        )
    }

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
                    {name}
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

            <ImageBackground
                source={require("../../../assests/bg.jpg")}
                style={{ flex: 1, alignItems: "center" }}
            >

                <View
                    style={{
                        height: 50,
                        width: "90%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "white",
                        marginTop: 30,
                        backgroundColor: "rgba(0,0,0,.3)",
                        elevation: 6,
                        borderRadius: 5
                    }}
                >
                    <TextInput
                        placeholder="Search.."
                        placeholderTextColor="white"
                        style={{ width: "90%", color: "white" }}
                        onChangeText={(e) => {
                            setItems(filterByText(AllItems, e))
                        }}

                    />
                </View>


                <ScrollView
                    style={{ width: "100%", }}
                    contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                >
                    {
                        Items?.map((value) => {
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
                                        backgroundColor: "rgba(0,0,0,.3)", //rgba(0,0,0,.3)
                                        elevation: 6,
                                        borderRadius: 5,
                                        flexDirection: "row",
                                        overflow: "hidden"
                                    }}
                                >
                                    <View style={{ flex: .6, height: "100%" }}>
                                        <Image
                                            style={{ height: "100%", width: "100%" }}
                                            source={{ uri: `https://rest.technozone.com.pk/core/storage/app/${value.image}` }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, height: "100%", justifyContent: "center", padding: 5 }}>
                                        <Text style={{ color: "white", fontSize: 22, }}>
                                            {value.name}
                                        </Text>
                                        <Text style={{ color: "white", fontSize: 11, width: "90%", marginTop: 5, marginBottom: 5 }}>
                                            {value.desc}
                                        </Text>
                                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                                            <Text style={{ color: "white", fontSize: 22, }}>
                                                ${value.price}
                                            </Text>

                                            <ClickAbleByAsim
                                                onPress={() => {
                                                    if (!value.cart) {
                                                        dispatch(Actions.AddProductToCart(value.id))
                                                        if (value.extra.length > 0) {
                                                            setSelectedItemToShowForExtraItem(value.id)
                                                            setExtraDiaogImage(value.image)
                                                            setDialogOpen(true)
                                                            setExtraDiaogName(value.name)
                                                        }
                                                    } else {
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
                </ScrollView>
                <ExtraItemsDialog
                    navigate={navigate}
                    open={DialogOpen}
                    close={() => setDialogOpen(false)}
                    ExtraItems={ExtraItems}
                    ExtraDiaogImage={ExtraDiaogImage}
                    ExtraDiaogName={ExtraDiaogName}
                />
            </ImageBackground>
        </View >
    )
}

export default ResItem
