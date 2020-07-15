import React, { useState } from 'react'
import { View, Text, Dimensions, Image, ActivityIndicator, Alert } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Item, Label, Input, Icon } from 'native-base';
import Axios from 'axios';
import { API_ENDPOINT } from '../../../env';

const ResetPassword = (props) => {
    const { navigate, openDrawer, goBack } = props.navigation;
    const {
        Email
    } = props.route.params
    const [DontShowPassword, setDontShowPassword] = useState(true)
    const [DontShowPassword2, setDontShowPassword2] = useState(true)

    const [NewPassword, setNewPassword] = useState("")
    const [ConfrimPassword, setConfrimPassword] = useState("")
    const [ErrorMsg, setErrorMsg] = useState("")
    const [Loading, setLoading] = useState(false)


    async function submit() {
        if (!NewPassword) return setErrorMsg("Please enter a password!")
        if (!ConfrimPassword) return setErrorMsg("Please confirm your password!")
        if (ConfrimPassword !== NewPassword) return setErrorMsg("Password and confirm password does not match!")
        setErrorMsg("")
        setLoading(true)

        try {
            const res = await Axios.post(API_ENDPOINT+`/api/changePassword?email=${Email}&password=${NewPassword}&password_confirmation=${ConfrimPassword}`)
            console.log(res.data)
            Alert.alert("Password reset successfull!")
            setLoading(false)
            navigate("Login")
        } catch (error) {
            console.log(error)
            setErrorMsg("Something broke")
            setLoading(false)
        }

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

                <Text style={{ marginTop: 10, color: "grey", width: "60%", textAlign: "center" }}>
                    Enter your new password
                </Text>

                <Item style={{ width: "80%", marginTop: 20 }} floatingLabel>
                    <Label >Password</Label>
                    <Input
                        value={NewPassword}
                        onChangeText={e => setNewPassword(e)}
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
                        value={ConfrimPassword}
                        onChangeText={e => setConfrimPassword(e)}
                        secureTextEntry={DontShowPassword2}
                        style={{}}
                    />
                    <Icon
                        color="grey"
                        onPress={() => setDontShowPassword2(!DontShowPassword2)}
                        type="Entypo"
                        name={!DontShowPassword2 ? 'eye' : "eye-with-line"}
                    />
                </Item>


                <Text style={{ margin: 10, color: "red" }}>
                    {ErrorMsg}
                </Text>

                <ClickAbleByAsim
                    onPress={() => submit()}
                    style={{ height: 50, width: 170, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", }}
                >
                    {
                        Loading ? (
                            <ActivityIndicator color="white" />
                        ) : (

                                <Text style={{ color: "white" }}>Submit</Text>
                            )
                    }
                </ClickAbleByAsim>




                <ClickAbleByAsim
                    onPress={() => goBack()}
                    style={{ padding: 5 }}
                >
                    <Text style={{ marginTop: 15, color: "grey" }}>
                        <Text style={{ color: "#871014", fontWeight: "bold", }}>Go Back</Text>
                    </Text>
                </ClickAbleByAsim>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default ResetPassword
