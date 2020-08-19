import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, ImageBackground, TextInput, } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import AntDesign from "react-native-vector-icons/AntDesign"
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Item, Label, Input, Icon } from 'native-base';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../../store/Action"


const MyProfile = (props) => {
    const { navigate, openDrawer, goBack } = props.navigation;

    const dispatch = useDispatch()

    const [DontShowPassword, setDontShowPassword] = useState(true)
    const [ProfilePicture, setProfilePicture] = useState("")
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [ContactNo1, setContactNo1] = useState("")
    const [ContactNo2, setContactNo2] = useState("")
    const [ContactNo3, setContactNo3] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [Address1, setAddress1] = useState("")
    const [Address2, setAddress2] = useState("")
    const [Address3, setAddress3] = useState("")
    const [DontShowPasswordConfirm, setDontShowPasswordConfirm] = useState(true)
    const [PasswordErrorMsg, setPasswordErrorMsg] = useState("")
    const [AddressErrorMsg, setAddressErrorMsg] = useState("")


    const Profile = useSelector(({ auth }) => auth.Profile)


    useEffect(() => {
        dispatch(Actions.GettingUserProfile())
    }, [])
    useEffect(() => {
        if (Profile) {
            setProfilePicture(Profile.image ? "https://saffronclub.com.au/core/storage/app/" + Profile.image : Profile.online_link)
            setName(Profile.name)
            setEmail(Profile.email)
            setContactNo1(Profile.cell1)
            setContactNo2(Profile.cell2)
            setContactNo3(Profile.cell3)
            setAddress1(Profile.address1)
            setAddress2(Profile.address2)
            setAddress3(Profile.address3)
        }
    }, [Profile])


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
                    Saffron
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
            <KeyboardAwareScrollView
                keyboardDismissMode="none"
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ alignItems: "center", paddingBottom: 10 }}
                style={{ width: "100%", }}

            >


                <View style={{ height: 180, width: "90%", backgroundColor: "white", elevation: 6, marginTop: 10, borderRadius: 10, overflow: "hidden" }}>
                    <View style={{ backgroundColor: "#007EDF", width: "100%", height: 40, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Profile Picture</Text>
                    </View>
                    <ClickAbleByAsim onPress={() => dispatch(Actions.UploadPicture())} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                        {
                            ProfilePicture ? (
                                <Image
                                    style={{ height: "80%",width:"80%",borderRadius:100 }}
                                    resizeMode="contain"
                                    source={{ uri: ProfilePicture }}
                                />
                            ) : (
                                    <Image
                                        style={{ height: "80%" }}
                                        resizeMode="contain"
                                        source={require("../../../assests/ic_add_picture.png")}
                                    />
                                )
                        }
                    </ClickAbleByAsim>
                </View>

                <View style={{ height: 480, width: "90%", backgroundColor: "white", elevation: 6, marginTop: 10, borderRadius: 10, overflow: "hidden" }}>
                    <View style={{ backgroundColor: "#007EDF", width: "100%", height: 40, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>General</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>

                        <Item style={{ width: "90%", marginTop: 20 }} floatingLabel>
                            <Label >Name</Label>
                            <Input
                                value={Name}
                                onChangeText={(e) => setName(e)}
                            />
                        </Item>

                        <Item style={{ width: "90%", marginTop: 20 }} floatingLabel>
                            <Label >Email</Label>
                            <Input
                                editable={false}
                                value={Email}
                                onChangeText={(e) => setEmail(e)} />
                        </Item>

                        <Item style={{ width: "90%", marginTop: 20 }} floatingLabel>
                            <Label >Contact No (Personal)</Label>
                            <Input
                                keyboardType="numeric"
                                value={ContactNo1}
                                onChangeText={(e) => setContactNo1(e)}
                            />
                        </Item>


                        <Item style={{ width: "90%", marginTop: 20 }} floatingLabel>
                            <Label >Contact No 2</Label>
                            <Input
                                keyboardType="numeric"
                                value={ContactNo2}
                                onChangeText={(e) => setContactNo2(e)}
                            />
                        </Item>

                        <Item style={{ width: "90%", marginTop: 20 }} floatingLabel>
                            <Label >Contact No (Home)</Label>
                            <Input
                                keyboardType="numeric"
                                value={ContactNo3}
                                onChangeText={(e) => setContactNo3(e)}

                            />
                        </Item>

                        <ClickAbleByAsim
                            onPress={() => {
                                // console.log()
                                dispatch(Actions.UpdateGeneralInfo(Name, ContactNo1, ContactNo2, ContactNo3))
                            }}
                            style={{ height: 40, width: 170, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 20 }}
                        >
                            <Text style={{ color: "white" }}>Save Changes</Text>
                        </ClickAbleByAsim>
                    </View>
                </View>






                <View style={{ height: 280, width: "90%", backgroundColor: "white", elevation: 6, marginTop: 10, borderRadius: 10, overflow: "hidden" }}>
                    <View style={{ backgroundColor: "#007EDF", width: "100%", height: 40, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Change Password</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Item style={{ width: "90%", marginTop: 20 }} floatingLabel>
                            <Label >New Password</Label>
                            <Input
                                value={Password}
                                onChangeText={(e) => setPassword(e)}
                                secureTextEntry={DontShowPassword}

                            />

                            <Icon
                                color="grey"
                                onPress={() => setDontShowPassword(!DontShowPassword)}
                                type="Entypo"
                                name={!DontShowPassword ? 'eye' : "eye-with-line"}
                            />
                        </Item>

                        <Item style={{ width: "90%", marginTop: 20 }} floatingLabel>
                            <Label >Confirm Password</Label>
                            <Input
                                value={ConfirmPassword}
                                onChangeText={(e) => setConfirmPassword(e)}
                                secureTextEntry={DontShowPasswordConfirm}
                                style={{}}
                            />
                            <Icon
                                color="grey"
                                onPress={() => setDontShowPasswordConfirm(!DontShowPasswordConfirm)}
                                type="Entypo"
                                name={!DontShowPasswordConfirm ? 'eye' : "eye-with-line"}
                            />
                        </Item>

                        <Text style={{ margin: 10, color: "red" }}>
                            {PasswordErrorMsg}
                        </Text>
                        <ClickAbleByAsim
                            onPress={() => {
                                if (!Password || !ConfirmPassword) return setPasswordErrorMsg("Please Fill both fields")
                                if (Password !== ConfirmPassword) return setPasswordErrorMsg("Password does not match");
                                setPasswordErrorMsg("")
                                dispatch(Actions.PasswordUpdate(Password, ConfirmPassword))
                            }}
                            style={{ height: 40, width: 170, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 0 }}
                        >
                            <Text style={{ color: "white" }}>Save Password</Text>
                        </ClickAbleByAsim>
                    </View>
                </View>


                <View style={{ height: 350, width: "90%", backgroundColor: "white", elevation: 6, marginTop: 10, borderRadius: 10, overflow: "hidden" }}>
                    <View style={{ backgroundColor: "#007EDF", width: "100%", height: 40, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>General</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Item style={{ width: "90%", marginTop: 20 }} floatingLabel>
                            <Label >Address 1</Label>
                            <Input
                                value={Address1}
                                onChangeText={(e) => setAddress1(e)}

                            />
                        </Item>


                        <Item style={{ width: "90%", marginTop: 20 }} floatingLabel>
                            <Label >Address 2</Label>
                            <Input
                                value={Address2}
                                onChangeText={(e) => setAddress2(e)}
                            />
                        </Item>

                        <Item style={{ width: "90%", marginTop: 20 }} floatingLabel>
                            <Label >Address 3</Label>
                            <Input
                                value={Address3}
                                onChangeText={(e) => setAddress3(e)}
                            />
                        </Item>
                        <Text style={{ margin: 10, color: "red" }}>
                            {AddressErrorMsg}
                        </Text>
                        <ClickAbleByAsim
                            onPress={() => {
                                if (!Address1 || !Address2 || !Address3) return setAddressErrorMsg("Please enter address");
                                setAddressErrorMsg("");
                                dispatch(Actions.UpdateAddresses(Address1, Address2, Address3))
                            }}
                            style={{ height: 40, width: 170, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 0 }}
                        >
                            <Text style={{ color: "white" }}>Save Changes</Text>
                        </ClickAbleByAsim>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>


    )
}

export default MyProfile
