import Axios from "axios";
import { API_ENDPOINT } from "../../env";
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';


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
export const LOGIN_ATTEMPT = "LOGIN_ATTEMP"
export const LOGOUT = "LOGOUT"
export const GETTING_PROFILE = "GETTING_PROFILE"


export const LoginAction = (email, password, navigate) => async (dispatch, getState) => {



    try {

        const res = await Axios.post(API_ENDPOINT + `/api/login?email=${email}&password=${password}`)


        if (res.data?.data?.token) {
            dispatch({
                type: LOGIN_ATTEMPT,
                payload: res.data?.data?.token
            })
            await AsyncStorage.setItem("@token", res.data?.data?.token)
            navigate("Home")
            return
        } else {
            return "Invalid Credientials"
        }


    } catch (error) {
        return "Something went wrong, Try again later"
    }
}


export const LogoutAction = () => async (dispatch, getState) => {


    try {
        dispatch({
            type: LOGOUT,
        })

        await AsyncStorage.clear()
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
    } catch (error) {
        console.log(error)
    }
}


export const SignUpAction = (Name, Email, Password, CPassword, navigate) => async (dispatch, getState) => {



    try {

        const res = await Axios.post(API_ENDPOINT + `/api/signup?name=${Name}&email=${Email}&password=${Password}&c_password=${CPassword}`)


        if (res?.data?.data?.email) {
            return res.data.data.email[0]
        }

        if (res.data?.data?.token) {
            dispatch({
                type: LOGIN_ATTEMPT,
                payload: res.data?.data?.token
            })
            await AsyncStorage.setItem("@token", res.data?.data?.token)
            navigate("Home")
            return
        }

    } catch (error) {
        console.log(error)
        return "Something went wrong, Try again later"
    }
}


export const GettingUserProfile = () => async (dispatch, getState) => {
    try {

        const res = await Axios.post(API_ENDPOINT + "/api/profile", null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        })


        dispatch({
            type: GETTING_PROFILE,
            payload: res.data.data
        })

    } catch (error) {
        console.log(error)
        return "Something went wrong, Try again later"
    }
}


export const UpdateGeneralInfo = (name, cell1, cell2, cell3) => async (dispatch, getState) => {
    try {

        const res = await Axios.post(API_ENDPOINT + `/api/savegeneral?name=${name}&cell1=${cell1}&cell2=${cell2}&cell3=${cell3}`, null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        })
        dispatch(GettingUserProfile())

        Alert.alert("General Info Updated!")

    } catch (error) {
        console.log(error)
        return "Something went wrong, Try again later"
    }
}

export const PasswordUpdate = (p, cp) => async (dispatch, getState) => {
    try {

        const res = await Axios.post(API_ENDPOINT + `/api/changepassword?password=${p}&password_confirmation=${cp}`, null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        })

        Alert.alert("Password Updated!")

    } catch (error) {
        console.log(error)
        return "Something went wrong, Try again later"
    }
}

export const UpdateAddresses = (ad1, ad2, ad3) => async (dispatch, getState) => {
    try {

        const res = await Axios.post(API_ENDPOINT + `/api/saveaddress?address1=${ad1}&address2=${ad2}&address3=${ad3}`, null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        })
        dispatch(GettingUserProfile())

        Alert.alert("Addresses Updated!")

    } catch (error) {
        console.log(error)
        return "Something went wrong, Try again later"
    }
}


export const UploadPicture = () => async (dispatch, getState) => {

    Alert.alert(
        'How do you want to upload file?',
        'You can choose Camera or Files!',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'Files',
                onPress: () => dispatch(Files())
            },

            {
                text: 'Camera',
                onPress: () => dispatch(Camera())
            },

        ],
        { cancelable: false }
    );

}

export const Camera = () => async (dispatch, getState) => {

    try {
        const image = await ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true
        })

        const MyForm = new FormData();

        const file = {
            uri: image.path,
            type: 'image/png',
            name: image.path.split('/').pop(),
        }
        MyForm.append("profile", file)

        const res = await Axios.post(API_ENDPOINT + "/api/saveimage", MyForm, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`,
                'content-type': 'multipart/form-data'
            },
        })

        dispatch({
            type: GETTING_PROFILE,
            payload: res.data.data
        })

    } catch (error) {
        console.log(error)
    }

}
//  /api/saveimage
//  profile
export const Files = () => async (dispatch, getState) => {


    try {
        const image = await ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        })

        const MyForm = new FormData();

        const file = {
            uri: image.path,
            type: 'image/png',
            name: image.path.split('/').pop(),
        }
        MyForm.append("profile", file)

        const res = await Axios.post(API_ENDPOINT + "/api/saveimage", MyForm, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`,
                'content-type': 'multipart/form-data'
            },
        })

        dispatch({
            type: GETTING_PROFILE,
            payload: res.data.data
        })

    } catch (error) {
        console.log(error)
        console.log(error.response)
    }
}


export const SocialLogin = (data, provider, navigate) => async (dispatch, getState) => {

    try {
        // const res = await Axios.post(API_ENDPOINT + `/api/callback?provider=${provider}&id=${data.user.id}&email=${data.user.email}&device_token=${data.dataidToken}&name=${data.user.name}&profile=${data?.user?.profile || data?.user?.photo}`);
        const res = await Axios.post(API_ENDPOINT + "/api/callback", {
            provider: provider,
            id: data.user.id,
            email: data.user.email,
            device_token: data.dataidToken || "dataidToken",
            name: data.user.name,
            profile: data?.user?.photo

        })
        dispatch({
            type: LOGIN_ATTEMPT,
            payload: res.data?.data?.access_token
        })
        dispatch({
            type: GETTING_PROFILE,
            payload: res.data?.data?.user
        })
        await AsyncStorage.setItem("@token", res.data?.data?.access_token)
        navigate("Home")
    } catch (error) {
        console.log(error)
    }
}