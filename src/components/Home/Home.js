import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, ImageBackground, ActivityIndicator, } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import AntDesign from "react-native-vector-icons/AntDesign"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ScrollView } from 'react-native-gesture-handler';
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

const Home = (props) => {
    const { navigate, openDrawer, goBack } = props.navigation;

    const dispatch = useDispatch()

    const [activeSlide, setActiveSlide] = useState();

    const Data = useSelector(({ res }) => res.CategoriesData)
    const Token = useSelector(({ auth }) => auth.Token)


    useEffect(()=>{
        if(Token){
            dispatch(Actions.GettingUserProfile())
        }
    },[Token])
    
    useEffect(() => {
        dispatch(Actions.GettingCategories())
    }, [])

    const _renderItem = ({ item, index }) => {
        return (
            <ImageBackground
                source={item}
                style={{ height: '100%', width: '100%', justifyContent: 'center' }}>

            </ImageBackground>
        );
    };
    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            {/* Navbar */}

            <View style={{ paddingRight: "5%", paddingLeft: "5%", height: 60, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", zIndex: 100, elevation: 1, marginTop: -2 }}>
                <ClickAbleByAsim style={{ padding: 5, paddingLeft: 0 }} onPress={() => openDrawer()}>
                    <AntDesign
                        name="bars"
                        size={30}
                    />
                </ClickAbleByAsim>


                <Image
                    style={{ height: 40, width: 100 }}
                    resizeMode="contain"
                    source={require("../../../assests/safrton_text.png")}
                />

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


            {/* Slider */}
            <ImageBackground source={require("../../../assests/bg.jpg")} style={styles.sliderContainer}>
                <Carousel
                    indicator
                    autoplay
                    loop
                    autoplayDelay={0}
                    autoplayInterval={4000}
                    // ref={(c) => { this._carousel = c; }}
                    data={dummyData}
                    renderItem={_renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    onSnapToItem={index => setActiveSlide(index)}
                />
                <Pagination
                    dotsLength={dummyData.length}
                    activeDotIndex={activeSlide}
                    containerStyle={{
                        position: 'absolute',
                        width: Dimensions.get('window').width,
                        bottom: 0,
                    }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 2,
                        backgroundColor: '#871014',
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </ImageBackground>
            {/* Slider */}



            {/* Main Body */}
            <ImageBackground
                source={require("../../../assests/bg.jpg")}
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <ScrollView
                    style={{ width: "100%", }}
                    contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                >
                    <ClickAbleByAsim
                        onPress={() => navigate("ReserveTable")}
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
                        <Text style={{ fontSize: 20, color: "white", }}>
                            Table Reservation
                            </Text>
                    </ClickAbleByAsim>

                    {
                        Data ? Data.map((value) => {
                            return (
                                <ClickAbleByAsim
                                    key={value.id}
                                    onPress={() => navigate("ResItem", { id: value.id, name: value.name })}
                                    style={{
                                        height: 120,
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
                                    <View style={{ flex: .7, height: "100%" }}>
                                        <Image
                                            style={{ height: "100%", width: "100%" }}
                                            source={{ uri: `https://rest.technozone.com.pk/core/storage/app/${value.image}` }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center", }}>
                                        <Text style={{ color: "white", fontSize: 22, }}>
                                            {value.name}
                                        </Text>

                                    </View>

                                </ClickAbleByAsim>
                            )
                        }) : (
                                <ActivityIndicator style={{ marginTop: 40 }} size={30} color="white" />
                            )

                    }
                </ScrollView>




            </ImageBackground>
            {/* Main Body */}
        </View>
    )
}

const styles = StyleSheet.create({
    sliderContainer: {
        height: 190,
        width: '100%',
    },

});

export default Home;


