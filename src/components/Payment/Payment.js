import React, { useState } from 'react'
import { View, Text, Dimensions, Image, ActivityIndicator, Alert } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Item, Label, Input, Icon, Form } from 'native-base';
import Axios from 'axios';
import { API_ENDPOINT } from "../../../env";
import { useDispatch, useSelector } from "react-redux"
import * as Actions from "../../../store/Action"
import PayPal from 'react-native-paypal-gateway';

PayPal.initialize(PayPal.SANDBOX, "AWwiDoy5r3PPGaA4GEnGuJX3_iNsLiF_zYtZKkBrdNTTCvGybzCURusWuq-Q-8j_fLE454JT70Jp4yUE");

let stripe_url = 'https://api.stripe.com/v1/'
let secret_key = 'pk_live_51HkOE8IBZjK7c5TEX7TCGtcsDGoEc8ht8dHm1ClcCHMR8rJW4zm1xvU1yZ3VYQWAEX4wNjOiL5Ya5Y4z3nmHay5S00s9YLR4nh'

const Payment = (props) => {
    const { navigate, openDrawer, goBack } = props.navigation;
    const {
        UserPo,
        Price,
        Distance,
        IsHomeDelieveryType,
    } = props.route.params

    const dispatch = useDispatch()

    const [ViseMaster, setViseMaster] = useState("")
    const [NameOnCard, setNameOnCard] = useState("")
    const [AccountNo, setAccountNo] = useState("")
    const [ExpireDate, setExpireDate] = useState("")
    const [CVC, setCVC] = useState("")
    const [Loading, setLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")

    const Profile = useSelector(({ auth }) => auth.Profile)
    const ApiToken = useSelector(({ auth }) => auth.Token)



    function creditCardNumberHandler(num) {
        // setAccountNo(num)
        const firstOne = num.substring(0, 1)
        const firstTwo = num.substring(0, 2)
        if (num.length > 16) return
        setAccountNo(num)
        if (firstOne == 4) {
            return setViseMaster("vise")
        }



        if (firstTwo >= 51 && firstTwo <= 55) {
            return setViseMaster("master")
        }

        return setViseMaster("")
    }


    async function paymentAction() {
        if (!NameOnCard) return setErrorMsg("Please enter the name on card!")
        if (!AccountNo) return setErrorMsg("Please enter a account no!")
        if (!ExpireDate) return setErrorMsg("Please enter a expire date!")
        if (!CVC) return setErrorMsg("Please enter your CVC")
        setErrorMsg("")
        setLoading(true)



        let totalPrice = Price
        let shipping_charges = 5;
        let lang = UserPo.Long || "";
        let lat = UserPo.Lat || "";
        let distance = Distance;
        let order_type = IsHomeDelieveryType ? "delievery" : "pickup"
        let address = Profile.address1 || ""



        try {

            let cardDetails = {
                "card[number]": AccountNo,
                "card[exp_month]": ExpireDate.split("/")[0],
                "card[exp_year]": ExpireDate.split("/")[1],
                "card[cvc]": CVC
            };

            let formBody = [];
            for (let property in cardDetails) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(cardDetails[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            console.log("Making payment on stripe")
            const token = await Axios.post(stripe_url + "tokens", formBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + secret_key
                },
            })
            console.log("Payment done")
            console.log({
                "token.data.id": token.data.id,
                ApiToken: ApiToken

            })
            const res = await Axios.post(API_ENDPOINT + `/api/placeorder?stripeToken=${token.data.id}&total=${totalPrice}&shipping_charges=${shipping_charges}&lang=${lang}&lat=${lat}&distance=${distance}&order_type=${order_type}&shipping_address=${address}&drop_location=${address}`, null, {
                headers: {
                    Authorization: `Bearer ${ApiToken}`
                },
            })

            console.log("Error:asim ", res.data)

            Alert.alert("Payment Successfull!")
            dispatch(Actions.GettingCategories())
            dispatch(Actions.OrderHistory())
            navigate("Home")
            setLoading(false)
        } catch (error) {
            console.log("Error:asim ", error)
            console.log(error.response.data.error.message)
            setErrorMsg(error.response.data.error.message)
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

                <Text style={{ marginTop: 10, color: "grey" }}>
                    We accept all major credit/debit cards!
                </Text>
                <Item style={{ width: "80%", marginTop: 20 }} floatingLabel>
                    <Label >Name on card</Label>
                    <Input value={NameOnCard} onChangeText={(e) => setNameOnCard(e)} />
                </Item>
                <View style={{ flexDirection: "row", alignItems: "flex-end", width: "80%", justifyContent: "space-between", }}>
                    <Item style={{ width: ViseMaster ? "80%" : "100%", marginTop: 20 }} floatingLabel>
                        <Label >Account No</Label>
                        <Input maxLength={16} keyboardType="numeric" value={AccountNo} onChangeText={(e) => creditCardNumberHandler(e)} style={{}} />
                    </Item>
                    {
                        ViseMaster == "vise" ? <Image style={{ height: 50, width: 50 }} resizeMode="contain" source={require("../../../assests/visa.jpg")} /> : null
                    }
                    {
                        ViseMaster == "master" ? <Image style={{ height: 50, width: 50 }} resizeMode="contain" source={require("../../../assests/master.jpg")} /> : null
                    }


                </View>
                <Item style={{ width: "80%", marginTop: 20 }} floatingLabel>
                    <Label >Expire Date</Label>
                    <Input
                        maxLength={5}
                        keyboardType="numeric"
                        value={ExpireDate}
                        onChangeText={(e) => {
                            if (e.length > 5) return
                            if (e.length == 2) return setExpireDate(e + "/")
                            setExpireDate(e)
                        }}
                        style={{}}
                    />
                </Item>
                <Item style={{ width: "80%", marginTop: 20 }} floatingLabel>
                    <Label >CVC</Label>
                    <Input
                        keyboardType="numeric"
                        maxLength={3}
                        value={CVC}
                        onChangeText={e => setCVC(e)}
                        style={{}}
                    />
                </Item>

                <Text style={{
                    margin: 10,
                    color: "red"
                }}>
                    {ErrorMsg}
                </Text>

                <ClickAbleByAsim
                    onPress={() => { paymentAction() }}
                    style={{ height: 50, width: 170, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", }}
                >
                    {
                        Loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                                <Text style={{ color: "white" }}>Pay Now</Text>
                            )
                    }
                </ClickAbleByAsim>
                {/* <Text style={{ marginTop: 10, color: "grey" }}>
                    Or pay with
                </Text>

                <ClickAbleByAsim
                    onPress={() => {
                        PayPal.pay({
                            price: IsHomeDelieveryType ? (parseInt(Price.toFixed(2)) + 5).toString() : Price.toFixed(2).toString(),
                            currency: 'AED',
                            description: 'Payment for your order',
                        }).then(async confirm => {



                            let totalPrice = IsHomeDelieveryType ? parseInt(Price.toFixed(2)) + 5 : Price.toFixed(2)
                            let shipping_charges = 5;
                            let lang = UserPo.Long || "";
                            let lat = UserPo.Lat || "";
                            let distance = Distance;
                            let order_type = IsHomeDelieveryType ? "delievery" : "pickup"
                            let address = Profile.address1 || ""

                            const res = await Axios.post(API_ENDPOINT + `/api/placeorder?stripeToken=${""}&total=${totalPrice}&shipping_charges=${0}&lang=${""}&lat=${""}&distance=${0}&order_type=${order_type}&shipping_address=${""}&drop_location=${""}`, null, {
                                headers: {
                                    Authorization: `Bearer ${ApiToken}`
                                },
                            })
                            Alert.alert("Payment Successfull!")
                            dispatch(Actions.GettingCategories())
                            dispatch(Actions.OrderHistory())
                            navigate("Home")

                        }).catch(error => {
                            console.log(error)
                            Alert.alert("Error", "Expired key provided!")
                        });
                    }}
                    style={{}}
                >
                    <Image
                        style={{ height: 80 }}
                        resizeMode="contain"
                        source={require("../../../assests/ic_paypal.png")}
                    />
                </ClickAbleByAsim>
 */}



            </KeyboardAwareScrollView>
        </View>
    )
}

export default Payment
