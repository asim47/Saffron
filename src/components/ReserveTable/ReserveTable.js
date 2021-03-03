import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, ScrollView, ActivityIndicator, FlatList, TextInput, Alert } from 'react-native'
import ClickAbleByAsim from '../../comman/ClickAbleByAsim';
import AntDesign from "react-native-vector-icons/AntDesign"
// import { ScrollView } from 'react-native-gesture-handler';
import { Item, Label, Icon, Input, } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"
// import { TabView, SceneMap } from 'react-native-tab-view';
import ExtraItemsDialog from '../ResItem/ExtraItemsDialog';
import { useDispatch, useSelector } from "react-redux"
import * as Actions from "../../../store/Action"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// const initialLayout = { width: Dimensions.get('window').width };
const ReserveTable = (props) => {
    const { navigate, openDrawer, goBack } = props.navigation;

    const dispatch = useDispatch()
    const [DialogType, setDialogType] = useState("Extra") //Extra //Additional

    const [DialogOpen, setDialogOpen] = useState(false)
    const [IsNewError, setIsNewError] = useState(false)
    const [Loadding, setLoadding] = useState(false)
    const [index, setIndex] = React.useState(0);
    const [TimeIndex, setTimeIndex] = React.useState(0);
    const [date, setDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
    const [time, setTime] = useState(new Date("2015-03-25T05:00:00Z"));
    const [timeTo, setTimeTo] = useState(new Date("2015-03-25T10:00:00Z"));
    const [NoOfGuests, setNoOfGuests] = useState("");
    const [mode, setMode] = useState('date'); //date //time
    const [show, setShow] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState("");
    const [SelectedID, setSelectedID] = useState("");
    const [ResItems, setResItems] = useState([]);
    const [ExtraItems, setExtraItems] = useState([]);
    const [ExtraDiaogImage, setExtraDiaogImage] = useState("")
    const [ExtraDiaogName, setExtraDiaogName] = useState("")
    const [UseLess, setUseLess] = useState(1)
    const [SelectedItemToShowForExtraItem, setSelectedItemToShowForExtraItem] = useState(0)
    console.log(date)

    const [Tables, setTables] = useState([]);

    // const [routes] = React.useState([
    //     { key: 'first', title: 'First' },
    //     { key: 'second', title: 'Second' },
    //     { key: 'Third', title: 'Third' },
    //     { key: 'Forth', title: 'Forth' },
    // ]);


    const CategoriesData = useSelector(({ res }) => res.CategoriesData)


    useEffect(()=>{
        setIsNewError(false)
    },[NoOfGuests,date,time,timeTo])

    useEffect(() => {
        if (SelectedItemToShowForExtraItem) {
            console.log("test")
            setExtraItems(ResItems.filter(x => x.id == SelectedItemToShowForExtraItem)[0].extra)
        }
    }, [SelectedItemToShowForExtraItem, ResItems, UseLess])

    // useEffect(() => {
    //     getTables()
    // }, [])

    useEffect(() => {
        dispatch(Actions.GettingCategories())
    }, [])

    useEffect(() => {
        if (SelectedID) {
            setResItems(CategoriesData.filter(x => x.id == SelectedID)[0].products)
        }
        setUseLess(UseLess + 1)
    }, [SelectedID, CategoriesData])



    function getTables() {

    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        if (mode === "date") {
            setDate(currentDate);

        } else {
            if (TimeIndex == 0) {
                setTime(currentDate)

            } else {
                setTimeTo(currentDate)
            }
        }
    };




    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };









    const FirstRoute = () => {
        return (
            <></>
        )
    }

    const SecondRoute = () => (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, color: "#871014", fontWeight: "bold" }}>
                Choose Table
                        </Text>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>

                <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap" }}>
                    {
                        Tables?.map((value, index) => {
                            return (
                                <View style={{ width: "50%", height: 200, justifyContent: "center", alignItems: "center" }}>
                                    <Image
                                        style={{ height: 80, marginBottom: 5 }}
                                        resizeMode="contain"
                                        source={require("../../../assests/table.png")}
                                    />


                                    <Text style={{ fontSize: 17, marginBottom: 5 }}>
                                        Table No: <Text style={{ color: "#871014", fontWeight: "bold" }}>{value.id}</Text>
                                    </Text>
                                    <Text style={{ fontSize: 17, marginBottom: 5 }}>
                                        Persons: <Text style={{ color: "#871014", fontWeight: "bold" }}>{value.person}</Text>
                                    </Text>

                                    <ClickAbleByAsim
                                        onPress={() => {
                                            try {
                                                dispatch(Actions.AddTables(value?.id, value?.person, moment(time)?.format("H:m"), date?.toISOString(), getTables))
                                                setIndex(2)
                                            } catch (error) {
                                                Alert.alert(error)
                                            }
                                        }}
                                        style={{ height: 30, width: 100, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", }}
                                    >
                                        <Text style={{ color: "white", fontSize: 14 }}>Add</Text>
                                    </ClickAbleByAsim>
                                </View>
                            )
                        })
                    }
                </View>
                <ClickAbleByAsim
                    onPress={() => setIndex(0)}
                    style={{ height: 50, width: 270, backgroundColor: "white", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 20 }}
                >
                    <Text style={{ color: "#871014", fontSize: 18 }}>BACK</Text>
                </ClickAbleByAsim>
            </ScrollView>

        </View>

    );
    const ThirdRoute = () => (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, color: "#871014", fontWeight: "bold" }}>
                Choose Menu
            </Text>
            <ScrollView style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }}>

                {/* <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap",alignItems:"center",bac }}> */}
                {
                    CategoriesData?.map((value, index) => {
                        return (
                            <ClickAbleByAsim
                                onPress={() => {
                                    setSelectedID(value.id)
                                    setIndex(3)
                                }}
                                style={{
                                    height: 120,
                                    width: "90%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "white",
                                    marginTop: 30,
                                    backgroundColor: "white", //rgba(0,0,0,.3)
                                    elevation: 6,
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    overflow: "hidden"
                                }}
                            >
                                <View style={{ flex: .7, height: "100%" }}>
                                    <Image
                                        style={{ height: "100%", width: "100%" }}
                                        source={{ uri: `https://saffronclub.com.au/core/storage/app/${value.image}` }}
                                    />
                                </View>
                                <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center", }}>
                                    <Text style={{ color: "#871014", fontSize: 21, }}>
                                        {value.name}
                                    </Text>

                                </View>

                            </ClickAbleByAsim>
                        )
                    })
                }
                {/* </View> */}
                <ClickAbleByAsim
                    onPress={() => setIndex(0)}
                    style={{ height: 50, width: 270, backgroundColor: "white", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 20 }}
                >
                    <Text style={{ color: "#871014", fontSize: 18 }}>BACK</Text>
                </ClickAbleByAsim>
            </ScrollView>

        </View>
    );

    const ForthRoute = () => (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, color: "#871014", fontWeight: "bold" }}>
                Choose Menu
            </Text>
            <View
                style={{ width: "100%", justifyContent: "center", alignItems: "center", }}
            // contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
            >
                <FlatList
                    ListFooterComponent={<View />}
                    ListFooterComponentStyle={{ height: 100 }}
                    data={ResItems}
                    renderItem={({ item }) => {
                        return (
                            (
                                <View
                                    // onPress={() => setDialogOpen(true)}
                                    style={{
                                        height: 150,
                                        width: (90 / 100) * Dimensions.get("window").width,
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
                                            source={{ uri: `https://saffronclub.com.au/core/storage/app/${item.image}` }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, height: "100%", justifyContent: "center", padding: 5 }}>
                                        <Text style={{ color: "#871014", fontSize: 22, }}>
                                            {item.name}
                                        </Text>
                                        <Text style={{ color: "#871014", fontSize: 11, width: "90%", marginTop: 5, marginBottom: 5 }}>
                                            {item.desc}
                                        </Text>
                                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                                            <Text style={{ color: "#871014", fontSize: 22, }}>
                                                ${item.price}
                                            </Text>

                                            <ClickAbleByAsim
                                                onPress={() => {
                                                    if (!item.cart) {
                                                        // dispatch(Actions.AddProductToCart(item.id))
                                                        if (item.extra.length > 0) {
                                                            setSelectedItemToShowForExtraItem(item.id)
                                                            setDialogType("Extra")
                                                            setExtraDiaogImage(item.image)
                                                            setDialogOpen(true)
                                                            setExtraDiaogName(item.name)
                                                        } else {
                                                            dispatch(Actions.AddProductToCart(item.id))
                                                            setSelectedItemToShowForExtraItem(item.id)
                                                            setDialogType("Additional")
                                                            setExtraDiaogImage(item.image)
                                                            setExtraDiaogName(item.name)
                                                            setDialogOpen(true)
                                                        }
                                                    } else {
                                                        dispatch(Actions.RemoveProduct(item.id_cart))
                                                    }
                                                }}
                                                style={{ height: 30, width: 100, backgroundColor: "#4A8387", borderRadius: 100, justifyContent: "center", alignItems: "center", }}
                                            >
                                                <Text style={{ color: "white" }}>
                                                    {
                                                        item.cart ? "Remove" : "Add"
                                                    }
                                                </Text>
                                            </ClickAbleByAsim>
                                        </View>

                                    </View>

                                </View>
                            )
                        )
                    }}
                    keyExtractor={(item) => item.id}
                />

                {/* <View style={{height:50}} /> */}
            </View>
            <ExtraItemsDialog
                navigate={navigate}
                open={DialogOpen}
                close={() => setDialogOpen(false)}
                ExtraItems={ExtraItems}
                ExtraDiaogImage={ExtraDiaogImage}
                ExtraDiaogName={ExtraDiaogName}
                DialogType={DialogType}

            />
        </View>
    );

    // const renderScene = SceneMap({
    //     first: FirstRoute,
    //     second: SecondRoute,
    //     Third: ThirdRoute,
    //     Forth: ForthRoute,
    // });



    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            {/* Navbar */}

            <View style={{ paddingRight: "5%", paddingLeft: "5%", height: 60, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", zIndex: 100, elevation: 1, marginTop: -2 }}>
                <ClickAbleByAsim style={{ padding: 5, paddingLeft: 0 }} onPress={() => {
                    // if(index == 3) return setIndex(2)
                    // if(index == 2) return setIndex(1)
                    // if(index == 1) return setIndex(0)
                    goBack()
                }}>
                    <AntDesign
                        name="arrowleft"
                        size={30}
                    />
                </ClickAbleByAsim>


                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
                    Make A Reservation
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

            {/* <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={() => <View></View>}
            /> */}
            {
                index == 0
                    ? (
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <KeyboardAwareScrollView style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }} keyboardDismissMode="none" keyboardShouldPersistTaps="always">
                                <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, color: "#871014", fontWeight: "bold" }}>
                                    Find Table
                    </Text>

                                <Item style={{ width: "90%", marginTop: 30 }} floatingLabel>
                                    <Label >Number of guests</Label>
                                    <Input
                                        keyboardType="number-pad"
                                        value={NoOfGuests}
                                        onChangeText={e => setNoOfGuests(e)}
                                        maxLength={3}
                                    />
                                    <Icon
                                        type="FontAwesome5"
                                        name="pen"
                                        style={{ color: "grey", fontSize: 16 }}
                                    />
                                </Item>

                                <Item style={{ width: "90%", marginTop: 30 }} floatingLabel>
                                    <Label >Date</Label>
                                    <Input
                                        value={moment(date).format("DD/MM/YYYY")}
                                        onFocus={showDatepicker}
                                    />
                                    <Icon
                                        onPress={showDatepicker}
                                        type="FontAwesome5"
                                        name="pen"
                                        style={{ color: "grey", fontSize: 16 }}
                                    />
                                </Item>

                                <Item style={{ width: "90%", marginTop: 30 }} floatingLabel>
                                    <Label >Time from </Label>
                                    <Input
                                        value={moment(time).format("h:mm a ")}
                                        onFocus={() => {
                                            setTimeIndex(0)
                                            showTimepicker()
                                        }}
                                    />
                                    <Icon
                                        onPress={() => {
                                            setTimeIndex(0)
                                            showTimepicker()
                                        }}
                                        type="FontAwesome5"
                                        name="pen"
                                        style={{ color: "grey", fontSize: 16 }}
                                    />
                                </Item>

                                <Item style={{ width: "90%", marginTop: 30 }} floatingLabel>
                                    <Label >Time To </Label>
                                    <Input
                                        value={moment(timeTo).format("h:mm a ")}
                                        onFocus={() => {
                                            setTimeIndex(1)
                                            showTimepicker()
                                        }}
                                    />
                                    <Icon
                                        onFocus={() => {
                                            setTimeIndex(1)
                                            showTimepicker()
                                        }}
                                        type="FontAwesome5"
                                        name="pen"
                                        style={{ color: "grey", fontSize: 16 }}
                                    />
                                </Item>
                                <Text style={{ color: "red", margin: 20 }}>
                                    {ErrorMsg}
                                </Text>
                                {
                                    NoOfGuests > 20 || IsNewError ? (
                                       <>
                                        <View style={{justifyContent:"center",alignItems:"center"}}>
                                            <Text style={{textAlign:"center",width:300, marginBottom:10, color:"red"}}>
                                               No Tables available for {NoOfGuests} people, Please contact Saffron Team for more information. 
                                            </Text>
                                            <Text style={{fontWeight:"bold",}}>
                                                Email: Contact@saffronclub.com.au
                                            </Text>
                                            <Text style={{fontWeight:"bold",}}>
                                                Phone No: +61 882 694 194
                                            </Text>
                                        </View>
                                            <ClickAbleByAsim
                                            onPress={() => navigate("Home")}
                                            style={{ height: 50, width: 270, backgroundColor: "white", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 20 }}
                                        >
                                            <Text style={{ color: "#871014", fontSize: 18 }}>Go Back</Text>
                                        </ClickAbleByAsim>
                                       
                                       </>
                                    ) : (
                                        <>
                                            <ClickAbleByAsim
                                                onPress={() => {
                                                    if (!NoOfGuests) return setErrorMsg("Please enter number of guests");
                                                    setErrorMsg("")
                                                    setLoadding(true)
                                                    dispatch(Actions.GetTables(NoOfGuests, date, time, timeTo)).then((res) => {
                                                        setLoadding(false)
                                                        if (!res) {
                                                            return setErrorMsg("Please choose a time between 09:00am and 02:00:am")
                                                        }
                                                        console.log(res)
                                                        if(res?.length == 0) return setIsNewError(true)
                                                        setTables(res)
                                                        setIndex(1)

                                                    })

                                                }}
                                                style={{ height: 50, width: 270, backgroundColor: "#871014", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 10 }}
                                            >
                                                {
                                                    Loadding ? <ActivityIndicator color="white" /> : <Text style={{ color: "white", fontSize: 18 }}>Find Table</Text>
                                                }

                                            </ClickAbleByAsim>


                                            <ClickAbleByAsim
                                                onPress={() => navigate("Home")}
                                                style={{ height: 50, width: 270, backgroundColor: "white", borderRadius: 100, justifyContent: "center", alignItems: "center", marginTop: 20 }}
                                            >
                                                <Text style={{ color: "#871014", fontSize: 18 }}>CANCEL</Text>
                                            </ClickAbleByAsim>
                                        </>
                                    )
                                }
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={mode === "date" ? date : time}
                                        mode={mode}
                                        minimumDate={new Date()}
                                        is24Hour={false}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                            </KeyboardAwareScrollView>
                        </View>
                    )
                    :
                    index == 1
                        ? (
                            <SecondRoute />
                        )
                        :
                        index == 2
                            ? (
                                <ThirdRoute />
                            )
                            :
                            index == 3
                                ? (
                                    <ForthRoute />
                                )
                                : null

            }

        </View>
    )
}

export default ReserveTable
