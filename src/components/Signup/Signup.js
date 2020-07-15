import React, { useState } from 'react'
import { View, Text, Dimensions, Image, ActivityIndicator } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Item, Label, Input, Icon } from 'native-base';
import * as Actions from "../../../store/Action"
import { useDispatch, useSelector } from "react-redux"
const Signup = (props) => {

    const { navigate, openDrawer, goBack } = props.navigation;

    const dispatch = useDispatch();

    const [DontShowPassword, setDontShowPassword] = useState(true)
    const [DontShowPasswordConfirm, setDontShowPasswordConfirm] = useState(true)


    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPasword, setConfirmPasword] = useState("")
    const [ErrorMsg, setErrorMsg] = useState("")
    const [Loading, setLoading] = useState(false)



    function SignUp() {
        if (!Name) return setErrorMsg("Please enter a Name!");
        if (!Email) return setErrorMsg("Please enter a Email!");
        if ((!Email.match(/([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/))) return setErrorMsg("Please Enter A Valid Email!")
        if (!Password) return setErrorMsg("Please enter a Password!");
        if (!ConfirmPasword) return setErrorMsg("Please enter a ConfirmPasword!");
        if (Password !== ConfirmPasword) return setErrorMsg("Password and Confirm Password does not match!");
        setErrorMsg("");

        setLoading(true);

        dispatch(Actions.SignUpAction(Name, Email, Password, ConfirmPasword, navigate)).then((res) => {
            if (res) setErrorMsg(res);

            setLoading(false)
        })

    }


    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <KeyboardAwareScrollView
                keyboardDismissMode="none"
                keyboardShouldPersistTaps="always"
                style={{ width: "100%", height: "100%", }}
                contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
            >
                <Image
                    style={{ height: 150, marginTop: "20%" }}
                    resizeMode="contain"
                    source={require("../../../assests/saffron.png")}
                />

                <Text style={{ marginTop: 10, color: "grey" }}>
                    Enter your details and register with us!
                </Text>

                <Item style={{ width: "80%", marginTop: 20 }} floatingLabel>
                    <Label >Name</Label>
                    <Input
                        value={Name}
                        onChangeText={(e) => setName(e)}
                    />
                </Item>


                <Item style={{ width: "80%", marginTop: 20 }} floatingLabel>
                    <Label >Email</Label>
                    <Input
                        value={Email}
                        onChangeText={(e) => setEmail(e)}
                    />
                </Item>

                <Item style={{ width: "80%", marginTop: 20 }} floatingLabel>
                    <Label >Password</Label>
                    <Input
                        value={Password}
                        onChangeText={(e) => setPassword(e)}
                        secureTextEntry={DontShowPassword}
                        style={{}}
                    />
                    <Icon
                        color="grey"
                        onPress={() => setDontShowPassword(!DontShowPassword)}
                        type="Entypo"
                        name={!DontShowPassword ? 'eye' : "eye-with-line"}
                    />
                </Item>

                <Item style={{ width: "80%", marginTop: 20 }} floatingLabel>
                    <Label >Confirm Password</Label>
                    <Input
                        value={ConfirmPasword}
                        onChangeText={(e) => setConfirmPasword(e)}
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



                <Text style={{ marginTop: 20, color: "red" }}> {ErrorMsg} </Text>

                <ClickAbleByAsim
                    onPress={() => SignUp()}
                    style={{ height: 50, width: 170, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 10 }}
                >
                    {
                        Loading ? <ActivityIndicator color="white" /> : (

                            <Text style={{ color: "white" }}>Signup</Text>
                        )
                    }
                </ClickAbleByAsim>





                <ClickAbleByAsim
                    onPress={() => navigate("Login")}
                    style={{ padding: 5 }}
                >
                    <Text style={{ marginTop: 15, color: "grey" }}>
                        Already have an account? <Text style={{ color: "#871014", fontWeight: "bold", }}>Login</Text>
                    </Text>
                </ClickAbleByAsim>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Signup
