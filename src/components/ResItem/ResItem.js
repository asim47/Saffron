import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, ImageBackground, TextInput, FlatList } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import AntDesign from "react-native-vector-icons/AntDesign"
import { ScrollView } from 'react-native-gesture-handler';
import ExtraItemsDialog from './ExtraItemsDialog';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../../store/Action"
// import { Value } from 'react-native-reanimated';
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
    const [DialogType, setDialogType] = useState("Extra") //Extra //Additional
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


                <View
                    style={{ width: "100%", justifyContent: "center", alignItems: "center", }}
                // contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                >
                    <FlatList
                    ListFooterComponent={<View />}
                    ListFooterComponentStyle={{height:100}}
                        data={Items}
                        renderItem={({ item }) => {
                            return (


                                (
                                    <View
                                        // onPress={() => setDialogOpen(true)}
                                        style={{
                                            height: 150,
                                            width: (90 / 100) * Dimensions.get("window").width,
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
                                                source={{ uri: `https://saffronclub.com.au/core/storage/app/${item.image}` }}
                                            />
                                        </View>
                                        <View style={{ flex: 1, height: "100%", justifyContent: "center", padding: 5 }}>
                                            <Text style={{ color: "white", fontSize: 22, }}>
                                                {item.name}
                                            </Text>
                                            <Text style={{ color: "white", fontSize: 11, width: "90%", marginTop: 5, marginBottom: 5 }}>
                                                {item.desc}
                                            </Text>
                                            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                                                <Text style={{ color: "white", fontSize: 22, }}>
                                                    ${item.price}
                                                </Text>

                                                <ClickAbleByAsim
                                                    onPress={() => {
                                                        if (!item.cart) {

                                                            if (item.extra.length > 0) {
                                                                setSelectedItemToShowForExtraItem(item.id)
                                                                setDialogType("Extra")
                                                                setExtraDiaogImage(item.image)
                                                                setDialogOpen(true)
                                                                setExtraDiaogName(item.name)
                                                            } else {
                                                                dispatch(Actions.AddProductToCart(item.id))
                                                                setSelectedItemToShowForExtraItem(item.id)
                                                                setDialogType("Additional")
                                                                setExtraDiaogImage(item.image)
                                                                setExtraDiaogName(item.name)
                                                                setDialogOpen(true)
                                                            }
                                                        } else {
                                                            dispatch(Actions.RemoveProduct(item.id_cart))
                                                        }
                                                    }}
                                                    style={{ height: 30, width: 100, backgroundColor: "#4A8387", borderRadius: 100, justifyContent: "center", alignItems: "center", }}
                                                >
                                                    <Text style={{ color: "white" }}>

                                                        {
                                                            item.cart ? "Remove" : "Add"
                                                        }
                                                    </Text>
                                                </ClickAbleByAsim>
                                            </View>

                                        </View>

                                    </View>
                                )
                            )
                        }}
                        keyExtractor={(item) => item.id}
                    />

                    {/* <View style={{height:50}} /> */}
                </View>
                <ExtraItemsDialog
                    navigate={navigate}
                    open={DialogOpen}
                    close={() => setDialogOpen(false)}
                    ExtraItems={ExtraItems}
                    ExtraDiaogImage={ExtraDiaogImage}
                    ExtraDiaogName={ExtraDiaogName}
                    DialogType={DialogType}
                />
            </ImageBackground>
        </View >
    )
}

export default ResItem
