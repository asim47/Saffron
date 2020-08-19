import React from 'react'
import { View, Text, Image } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import ClickAbleByAsim from '../comman/ClickAbleByAsim';
import * as Actions from "../../store/Action"
import { useSelector, useDispatch } from "react-redux"



const DrawerComponent = (props) => {
    const { navigate, openDrawer, goBack, closeDrawer } = props.navigation;
    const dispatch = useDispatch()


    const Profile = useSelector(({ auth }) => auth.Profile)

    return (
        <View style={{ flex: 1 }}>
            {
                Profile?.online_link ? (
                    <Image
                        style={{ height: 100, width: 100, margin: 10,borderRadius:1000 }}
                        resizeMode="cover"
                        source={{ uri: Profile.online_link }}
                    />
                ) : Profile?.image ? (
                    <Image
                        style={{ height: 100, width: 100, margin: 10,borderRadius:1000 }}
                        resizeMode="cover"
                        source={{ uri: "https://saffronclub.com.au/core/storage/app/" + Profile.image }}
                    />
                ) : (
                            <Image
                                style={{ height: 100, width: 100, margin: 10 }}
                                resizeMode="center"
                                source={require("../../assests/logo.png")}
                            />
                        )
            }


            <Text style={{ margin: 10, fontWeight: "bold", fontSize: 16 }}>
                Welcome, {Profile?.name}
            </Text>

            <ClickAbleByAsim onPress={() => {
                navigate("Home")
            }} style={{ height: 60, flexDirection: "row" }}>
                <View style={{ width: 60, justifyContent: "center", alignItems: "center" }}>
                    <FontAwesome
                        name="home"
                        size={30}
                        color="grey"

                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 5, justifyContent: "center" }}>
                    <Text style={{ margin: 10, fontWeight: "bold", fontSize: 16 }}>
                        Home
                    </Text>
                </View>
            </ClickAbleByAsim>

            <ClickAbleByAsim onPress={() => {
                navigate("MyProfile")
            }} style={{ height: 60, flexDirection: "row" }}>
                <View style={{ width: 60, justifyContent: "center", alignItems: "center" }}>
                    <Ionicons
                        name="md-person"
                        size={30}
                        color="grey"

                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 5, justifyContent: "center" }}>
                    <Text style={{ margin: 10, fontWeight: "bold", fontSize: 16 }}>
                        My Profile
                    </Text>
                </View>
            </ClickAbleByAsim>

            <ClickAbleByAsim onPress={() => {
                navigate("MyOrder")
            }} style={{ height: 60, flexDirection: "row" }}>
                <View style={{ width: 60, justifyContent: "center", alignItems: "center" }}>
                    <Ionicons
                        name="ios-document"
                        size={30}
                        color="grey"
                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 5, justifyContent: "center" }}>
                    <Text style={{ margin: 10, fontWeight: "bold", fontSize: 16 }}>
                        My Orders
                    </Text>
                </View>
            </ClickAbleByAsim>

            <ClickAbleByAsim onPress={() => {
                dispatch(Actions.LogoutAction())
                closeDrawer()
            }} style={{ height: 60, flexDirection: "row" }}>
                <View style={{ width: 60, justifyContent: "center", alignItems: "center" }}>
                    <AntDesign
                        name="logout"
                        size={30}
                        color="grey"
                        style={{ transform: [{ scaleX: -1 }] }}
                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 5, justifyContent: "center" }}>
                    <Text style={{ margin: 10, fontWeight: "bold", fontSize: 16 }}>
                        Logout
                    </Text>
                </View>
            </ClickAbleByAsim>

        </View>
    )
}

export default DrawerComponent
