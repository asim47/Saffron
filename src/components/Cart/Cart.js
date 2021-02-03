import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, ImageBackground, ActivityIndicator, Alert } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import AntDesign from "react-native-vector-icons/AntDesign"
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from "react-redux"
import * as Actions from "../../../store/Action"
import { CheckBox } from "react-native-elements"
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { useLinkProps } from '@react-navigation/native';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import GetLocation from 'react-native-get-location'


const dummyData = [
    require("../../../assests/pexels-photo-461198.jpeg"),
    require("../../../assests/pexels-photo-1640777.jpeg"),
    require("../../../assests/pexels-photo-461198.jpeg"),
]


const Cart = (props) => {
    const { navigate, openDrawer, goBack } = props.navigation;

    const dispatch = useDispatch();
    const _map = useRef()
    const [IsHomeDelieveryType, setIsHomeDelieveryType] = useState(false)
    const [IsLoading, setIsLoading] = useState(true)
    const [ExtraItems, setExtraItems] = useState([])
    const [Price, setPrice] = useState(0)
    const [Distance, setDistance] = useState(0)
    const [Region, setRegion] = useState({
        latitude: -34.877178,
        longitude: 138.601852,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [UserPo, setUserPo] = useState({
        Lat: 0,
        Long: 0,
    })

    const CartData = useSelector(({ res }) => res.CartData)
    const AdditionalItems = useSelector(({ res }) => res.AdditionalItems)



    useEffect(() => {
        if (_map?.current) {
            _map.current.animateCamera(
                {
                    center: {
                        latitude: Region.latitude,
                        longitude: Region.longitude
                    },
                    // zoom: 15
                },
                6000
            );
        }
    }, [Region])

    useEffect(() => {
        priceCalculator()
    }, [CartData, AdditionalItems])
    // useEffect(() => {
    //     if (CartData && CartData?.menu?.length != 0) {
    //         let Arr = []
    //         for (const value of CartData?.menu) {
    //             for (const value2 of value.products.extra) {
    //                 if (value2.cart) {
    //                     Arr = [...Arr, value2]
    //                 }
    //             }
    //         }
    //         setExtraItems(Arr)
    //         priceCalculator()
    //     }
    // }, [CartData])


    useEffect(() => {
        dispatch(Actions.GetCart()).then(() => {
            setIsLoading(false)
        })
    }, [])


    function priceCalculator() {
        let price = 0;

        if (!CartData) return
        // if (!ExtraItems) return
        for (const value of CartData?.menu) {
            price = price + ((value?.products?.price * (value.products.qty_cart || 1)) || 0)
        }

        for (const value of AdditionalItems) {
            if (value.cart) {
                price = price + (value.price*value.qty_cart)

            }
        }

        setPrice(price)

    }

    async function getLocation() {
        let result = await check(Platform.OS == "android" ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log(
                    'This feature is not available (on this device / in this context)',
                );
                break;
            case RESULTS.DENIED: {
                console.log(
                    'The permission has not been requested / is denied but requestable',
                );
                let result = await request(Platform.OS == "android" ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
                return getLocation()
            }
                break;
            case RESULTS.GRANTED: {
                let lat = 0;
                let long = 0

                const location = await GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                })

                lat = location.latitude
                long = location.longitude

                setUserPo({
                    Lat: lat,
                    Long: long
                })
                setRegion({
                    latitudeDelta: Region.latitudeDelta,
                    longitudeDelta: Region.longitudeDelta,
                    latitude: lat,
                    longitude: long
                })
                getDistanceFromLatLonInKm(-34.877178, 138.601852, lat, long)


            }

                break;
            case RESULTS.BLOCKED:
                console.log('The permission is denied and not requestable anymore');
                Alert.alert("You have to Allow Location for this Application to Work!")
                break;
        }
    }


    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1);  // deg2rad below
        let dLon = deg2rad(lon2 - lon1);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return setDistance(Math.floor(d))
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    if (IsLoading) {
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                {/* Navbar */}

                <View style={{ paddingRight: "5%", paddingLeft: "5%", height: 60, width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", zIndex: 100, elevation: 1, marginTop: -2 }}>
                    <ClickAbleByAsim style={{ padding: 5, paddingLeft: 0 }} onPress={() => goBack()}>
                        <AntDesign
                            name="arrowleft"
                            size={30}
                        />
                    </ClickAbleByAsim>


                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
                        Cart
                    </Text>
                </View>
                {/* Navbar */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                    <ActivityIndicator color="#871014" size={30} style={{ marginTop: -100 }} />

                </View>
            </View>
        )
    }


    if (CartData && CartData?.menu?.length == 0 && CartData.reservations?.length == 0) {
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                {/* Navbar */}

                <View style={{ paddingRight: "5%", paddingLeft: "5%", height: 60, width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", zIndex: 100, elevation: 1, marginTop: -2 }}>
                    <ClickAbleByAsim style={{ padding: 5, paddingLeft: 0 }} onPress={() => goBack()}>
                        <AntDesign
                            name="arrowleft"
                            size={30}
                        />
                    </ClickAbleByAsim>


                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
                        Cart
                    </Text>
                </View>
                {/* Navbar */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                    <Text style={{ fontSize: 25, color: "grey", marginTop: -100 }}>
                        Nothing in the cart
                </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            {/* Navbar */}

            <View style={{ paddingRight: "5%", paddingLeft: "5%", height: 60, width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", zIndex: 100, elevation: 1, marginTop: -2 }}>
                <ClickAbleByAsim style={{ padding: 5, paddingLeft: 0 }} onPress={() => goBack()}>
                    <AntDesign
                        name="arrowleft"
                        size={30}
                    />
                </ClickAbleByAsim>


                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
                    Cart
               </Text>
            </View>
            {/* Navbar */}

            <ScrollView style={{ width: "100%", }} contentContainerStyle={{ alignItems: "center" }}>
                {
                    CartData?.reservations.length > 0 ? (
                        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, color: "#871014", fontWeight: "bold" }}>
                            Table Reservations
                        </Text>
                    ) : null
                }

                {
                    CartData?.reservations.map((value, index) => {
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
                    CartData?.menu.length > 0 ? (
                        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, color: "#871014", fontWeight: "bold" }}>
                            Menu
                        </Text>
                    ) : null
                }

                {
                    CartData?.menu?.map((value) => {
                        return (
                            <View
                                style={{
                                    height: 140,
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

                                <ClickAbleByAsim
                                    onPress={() => { dispatch(Actions.RemoveProduct(value?.id)) }}
                                    style={{ elevation: 6, zIndex: 100, height: 30, width: 30, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", position: "absolute", top: 5, right: 5 }}
                                >
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>X</Text>
                                </ClickAbleByAsim>
                                <View style={{ flex: .6, height: "100%" }}>
                                    <Image
                                        resizeMode="cover"
                                        style={{ height: "100%", width: "100%" }}
                                        source={{ uri: `https://saffronclub.com.au/core/storage/app/${value?.products?.image}` }}
                                    />
                                </View>
                                <View style={{ flex: 1, height: "100%", justifyContent: "center", padding: 5 }}>
                                    <Text style={{ color: "#871014", fontSize: 19, }}>
                                        {value.products.name}
                                    </Text>
                                    <Text style={{ color: "#871014", fontSize: 17, }}>
                                        {value?.extra?.name}
                                    </Text>
                                    <Text style={{ color: "#871014", fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                                        ${value.extra ? value.extra.price : value?.products?.price}
                                    </Text>

                                    <View style={{ height: 30, width: 100, borderRadius: 100, justifyContent: "center", alignItems: "center", borderWidth: .7, borderColor: "#871014", overflow: "hidden", flexDirection: "row", alignSelf: "flex-end" }}>
                                        <ClickAbleByAsim onPress={() => {
                                            if (value.extra) {
                                                dispatch(Actions.AddExtraItemToCart(value?.extra?.id))
                                            } else {
                                                dispatch(Actions.IncreaseQTY(value?.products?.id))
                                            }
                                        }} style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "#871014" }}>
                                            <Text style={{ fontSize: 20, color: "white" }}>+</Text>
                                        </ClickAbleByAsim>
                                        <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: 20, color: "#871014" }}> {value?.products?.qty_cart} </Text>
                                        </View>
                                        <ClickAbleByAsim onPress={() => { dispatch(Actions.RemoveQTY(value?.id)) }} style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "#871014" }}>
                                            <Text style={{ fontSize: 20, color: "white" }}>-</Text>
                                        </ClickAbleByAsim>
                                    </View>


                                </View>

                            </View>
                        )
                    })
                }
                {
                    AdditionalItems?.filter(x=>x.cart == true).length > 0 ? (
                        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 0, color: "#871014", fontWeight: "bold" }}>
                            Additional Item
                        </Text>
                    ) : null
                }
                {/* {
                    AdditionalItems?.map((value, index) => {
                        if (!value.cart) return null

                        return (
                            <>


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

                            </>
                        )
                    })
                } */}

                {/* {
                    ExtraItems.length > 0 ? (
                        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, color: "#871014", fontWeight: "bold" }}>
                            Extra Items
                        </Text>
                    ) : null
                } */}

                {
                    AdditionalItems?.map((value) => {
                        if (!value.cart) return null
                        return (
                            <View
                                style={{
                                    height: 120,
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

                                <ClickAbleByAsim
                                    onPress={() => { dispatch(Actions.RemoveProduct(value?.id_cart)) }}
                                    style={{ elevation: 6, zIndex: 100, height: 30, width: 30, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", position: "absolute", top: 5, right: 5 }}
                                >
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>X</Text>
                                </ClickAbleByAsim>
                                <View style={{ flex: .6, height: "100%" }}>
                                    <Image
                                        resizeMode="cover"
                                        style={{ height: "100%", width: "100%" }}
                                        source={{ uri: `https://saffronclub.com.au/core/storage/app/${value.image}` }}
                                    />
                                </View>
                                <View style={{ flex: 1, height: "100%", justifyContent: "center", padding: 5 }}>
                                    <Text style={{ color: "#871014", fontSize: 22, }}>
                                        {value?.name}
                                    </Text>
                                    <Text style={{ color: "#871014", fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                                        ${value?.price}
                                    </Text>

                                    <View style={{ height: 30, width: 100, borderRadius: 100, justifyContent: "center", alignItems: "center", borderWidth: .7, borderColor: "#871014", overflow: "hidden", flexDirection: "row", alignSelf: "flex-end" }}>
                                        <ClickAbleByAsim onPress={() => {
                                             dispatch(Actions.AddProductToCart(value.id))
                                        }} style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "#871014" }}>
                                            <Text style={{ fontSize: 20, color: "white" }}>+</Text>
                                        </ClickAbleByAsim>
                                        <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: 20, color: "#871014" }}> {value?.qty_cart} </Text>
                                        </View>
                                        <ClickAbleByAsim onPress={() => { dispatch(Actions.RemoveQTY(value?.id_cart)) }} style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "#871014" }}>
                                            <Text style={{ fontSize: 20, color: "white" }}>-</Text>
                                        </ClickAbleByAsim>
                                    </View>


                                </View>

                            </View>
                        )
                    })
                }
                <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, color: "#871014", fontWeight: "bold" }}>
                    Delievery Type
                </Text>


                <View style={{ width: "80%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                    <CheckBox
                        center
                        title='Pick Up'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checkedColor="#871014"
                        checked={!IsHomeDelieveryType}
                        containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                        onPress={() => setIsHomeDelieveryType(false)}
                    />
                    <CheckBox
                        center
                        title='Home Delievery'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checkedColor="#871014"
                        checked={IsHomeDelieveryType}
                        containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                        onPress={() => {
                            setIsHomeDelieveryType(true)
                            getLocation()
                        }}
                    />
                </View>

                {
                    IsHomeDelieveryType ? (
                        <>
                            <View style={{
                                height: 200,
                                width: "90%",
                                elevation: 6,
                                backgroundColor: "white",
                                borderRadius: 20,
                                overflow: "hidden"
                            }}>
                                <MapView
                                    ref={_map}
                                    onPress={(e) => {
                                        getDistanceFromLatLonInKm(-34.877178, 138.601852, e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
                                        setUserPo({
                                            Lat: e.nativeEvent.coordinate.latitude,
                                            Long: e.nativeEvent.coordinate.longitude
                                        })
                                        setRegion({
                                            latitudeDelta: Region.latitudeDelta,
                                            longitudeDelta: Region.longitudeDelta,
                                            latitude: e.nativeEvent.coordinate.latitude,
                                            longitude: e.nativeEvent.coordinate.longitude
                                        })
                                    }}
                                    showsUserLocation={true}

                                    style={{ height: "100%", width: "100%" }}
                                    initialRegion={Region}
                                // onRegionChange={e => setRegion(e)}
                                >
                                    <Marker

                                        coordinate={{
                                            latitude: +UserPo.Lat,
                                            longitude: +UserPo.Long,
                                            latitudeDelta: 2,
                                            longitudeDelta: 2,
                                        }}
                                    />
                                </MapView>
                            </View>

                            <Text style={{ width: "90%", textAlign: "center", color: "red", marginTop: 15, marginBottom: 15 }}>
                                {
                                    Distance > 6 ? "You are out of our delievery range, try our Pick Up option." : ""
                                }
                            </Text>
                            <View
                                style={{
                                    height: 50,
                                    width: "90%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // marginTop: 30,
                                    backgroundColor: "white", //rgba(0,0,0,.3)
                                    elevation: 6,
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    overflow: "hidden"
                                }}
                            >
                                <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "#871014" }}>
                                        Distance: {Distance}KM
                        </Text>
                                </View>
                                <View style={{ flex: 1, height: "100%", backgroundColor: "#871014", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
                                        $5
                                    </Text>
                                </View>

                            </View>
                        </>
                    ) : null
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
                            ${IsHomeDelieveryType ? parseInt(Price.toFixed(2)) + 5 : Price.toFixed(2)}
                        </Text>
                    </View>

                </View>


                <ClickAbleByAsim
                    onPress={() => {
                        if (IsHomeDelieveryType) {
                            if (Distance > 6) return
                        }
                        navigate("Payment", {
                            UserPo,
                            Price,
                            Distance,
                            IsHomeDelieveryType,

                        })
                    }
                    }
                    style={{ height: 50, width: 210, backgroundColor: IsHomeDelieveryType && Distance > 6 ? "grey" : "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 20, elevation: 6 }}
                >
                    <Text style={{ color: "white" }}>Proceed to checkout</Text>
                </ClickAbleByAsim>

                <View style={{ height: 50 }}></View>
            </ScrollView>
        </View>
    )
}

export default Cart
