import React, { useState } from 'react'
import { View, Text, Dimensions, Image, ActivityIndicator } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Item, Label, Input, Icon } from 'native-base';
import Axios from 'axios';
import { API_ENDPOINT } from '../../../env';

const ForgetPassword = (props) => {
    const { navigate, openDrawer, goBack } = props.navigation;

    const [Email, setEmail] = useState("")
    const [ErrorMsg, setErrorMsg] = useState("")
    const [Loading, setLoading] = useState(false)


    async function submit() {
        if (!Email) return setErrorMsg("Please Enter an Email Address!")
        if ((!Email.match(/([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/))) return setErrorMsg("Please Enter A Valid Email!")
        setLoading(true)
        try {
            const res = await Axios.post(API_ENDPOINT + `/api/checkUser?email=${Email}`)
            setLoading(false)
            if (res.data.data) return navigate("ResetPassword", { Email })
            setErrorMsg("User Not Found")
        } catch (error) {
            setLoading(false)
            setErrorMsg("Something broke")
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
                    Enter your email address to request a reset link!
                </Text>

                <Item style={{ width: "80%", marginTop: 20 }} floatingLabel>
                    <Label >Email</Label>
                    <Input keyboardType="email-address" value={Email} onChangeText={(e) => setEmail(e)} />
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

export default ForgetPassword
