import React, { useState } from 'react'
import { View, Text, Dimensions, Image, ActivityIndicator } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Item, Label, Input, Icon } from 'native-base';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../../store/Action"
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import Axios from 'axios';

GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/userinfo.profile"], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '195040410859-nbk1i9j8jasohh45lcisrsda6ps5901a.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    // offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    // hostedDomain: '', // specifies a hosted domain restriction
    // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    // accountName: '', // [Android] specifies an account name on the device that should be used
    // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

//
const Login = (props) => {
    const { navigate, openDrawer, goBack } = props.navigation;
    const dispatch = useDispatch()

    const [DontShowPassword, setDontShowPassword] = useState(true)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ErrorMsg, setErrorMsg] = useState("")
    const [Loading, setLoading] = useState(false)



    function LoginHandler() {
        // navigate("Home")

        if (!Email) return setErrorMsg("Please Enter an Email Address!")
        if ((!Email.match(/([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/))) return setErrorMsg("Please Enter A Valid Email!")
        if (!Password) return setErrorMsg("Please Enter a Password!")
        setErrorMsg("")
        setLoading(true)
        dispatch(Actions.LoginAction(Email, Password, navigate)).then((res) => {
            if (res) {
                setErrorMsg(res)

            }
            setLoading(false)
        })

    }


    const FacebookLogin = async () => {
        try {
            setLoading(true)
            const result = await LoginManager.logInWithPermissions(["email", "public_profile",]);
            if (result.isCancelled) {
                setLoading(false)
                return console.log("Login cancelled");
            }

            const data = await AccessToken.getCurrentAccessToken()

            const UserData = await Axios.get(`https://graph.facebook.com/v2.5/me?fields=email,name,picture&access_token=${data.accessToken}`)

            const UserData2 = {
                user: {
                    id: UserData.data.id,
                    email: UserData.data.email,
                    name: UserData.data.name,
                    photo: UserData.data.picture.data.url
                },
                dataidToken: data.accessToken
            }
            dispatch(Actions.SocialLogin(UserData2, "facebook", navigate))


        } catch (error) {
            setLoading(false)
            console.log(error);
        }

    }


    const signIn = async () => {
        try {
            setLoading(true)
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            dispatch(Actions.SocialLogin(userInfo, "google", navigate))
        } catch (error) {
            setLoading(false)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log("SIGN_IN_CANCELLED")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log("IN_PROGRESS")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log("PLAY_SERVICES_NOT_AVAILABLE")
            } else {
                console.log(error)
                // some other error happened
                console.log("error happened")
            }
        }
    };


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
                    Enter your credientials to login!
                </Text>

                <Item style={{ width: "80%", marginTop: 20 }} floatingLabel>
                    <Label >Email</Label>
                    <Input
                        keyboardType="email-address"
                        value={Email}
                        onChangeText={e => setEmail(e)}
                    />
                </Item>

                <Item style={{ width: "80%", marginTop: 20 }} floatingLabel>
                    <Label >Password</Label>
                    <Input
                        value={Password}
                        onChangeText={e => setPassword(e)}
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

                <ClickAbleByAsim
                    onPress={() => { navigate("ForgetPassword") }}
                    style={{ padding: 10, paddingRight: 0, alignSelf: "flex-end", marginRight: "10%" }}

                >
                    <Text style={{ color: "#871014", fontWeight: "bold", }}>
                        Forgot Password
                    </Text>
                </ClickAbleByAsim>

                <Text style={{ color: "red" }}>{ErrorMsg}</Text>

                <ClickAbleByAsim
                    onPress={() => LoginHandler()}
                    style={{ height: 50, width: 170, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 20 }}
                >
                    {
                        Loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                                <Text style={{ color: "white" }}>Login</Text>
                            )
                    }
                </ClickAbleByAsim>


                <Text style={{ marginTop: 15, color: "grey" }}>
                    Or sign up with
                </Text>

                <View style={{ flexDirection: "row", height: 70, width: 200, marginTop: 10 }}>
                    <ClickAbleByAsim
                        onPress={() => { FacebookLogin() }}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                        <Image
                            style={{ height: "80%" }}
                            resizeMode="contain"
                            source={require("../../../assests/facebook.png")}
                        />
                    </ClickAbleByAsim>
                    <ClickAbleByAsim
                        onPress={() => signIn()}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                        <Image
                            style={{ height: "80%" }}
                            resizeMode="contain"
                            source={require("../../../assests/google.png")}
                        />
                    </ClickAbleByAsim>
                </View>

                <ClickAbleByAsim
                    onPress={() => navigate("Signup")}
                    style={{ padding: 5 }}
                >
                    <Text style={{ marginTop: 15, color: "grey" }}>
                        Are you a new User? <Text style={{ color: "#871014", fontWeight: "bold", }}>Sign Up</Text>
                    </Text>
                </ClickAbleByAsim>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Login
