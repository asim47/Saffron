import Axios from "axios";
import { API_ENDPOINT } from "../../env";
import moment from "moment"

export const GETTING_CATEGORIES = "GETTING_CATEGORIES"
export const GETTING_CART_DATA = "GETTING_CART_DATA"
export const MY_ORDERS = "MY_ORDERS"
export const GETTING_ADDITIONAL_ITEMS = "GETTING_ADDITIONAL_ITEMS"


export const GettingCategories = () => async (dispatch, getState) => {

    try {

        const res = await Axios.post(API_ENDPOINT + "/api/category", null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });


        dispatch({
            type: GETTING_CATEGORIES,
            payload: res.data.data
        })

    } catch (error) {
        console.log(error)
    }
}

export const AddProductToCart = (id) => async (dispatch, getState) => {

    try {
        const res = await Axios.post(API_ENDPOINT + "/api/addToCart?id=" + id, null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });

        dispatch(GettingCategories())
        dispatch(GettingAdditionalItems())
    } catch (error) {
        console.log(error)
    }

}

export const RemoveProductFromCart = (id) => async (dispatch, getState) => {
    try {
        const res = await Axios.post(API_ENDPOINT + "/api/deleteFromCart?id=" + id, null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });
        dispatch(GettingCategories())
    } catch (error) {
        console.log(error)
    }

}


export const AddExtraItemToCart = (id) => async (dispatch, getState) => {
    try {
        const res = await Axios.post(API_ENDPOINT + "/api/addExtraToCart?id=" + id, null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });

        dispatch(GetCart())
        dispatch(GettingCategories())
        dispatch(GettingAdditionalItems())
    } catch (error) {
        console.log(error)
    }

}


export const GetCart = () => async (dispatch, getState) => {

    try {
        const res = await Axios.post(API_ENDPOINT + "/api/cart", null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });
        // dispatch(GettingCategories())

        dispatch({
            type: GETTING_CART_DATA,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error.response.data)
    }

}


export const GetTables = (NoOfGuests, date, time, timeTo) => async (dispatch, getState) => {

    try {

        //rest.technozone.com.pk/api/tables?persons=4&date=2020-07-24&time=13:30&time_to=14:30
        const res = await Axios.post(API_ENDPOINT + `/api/tables?persons=${NoOfGuests}&date=${moment(date).format("YYYY-MM-DD")}&time=${moment(time).format("HH:mm")}&time_to=${moment(timeTo).format("HH:mm")}`, null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });

        if (res.data.meta.status == 200) {
            return res.data.data

        } else {
            return false
        }

    } catch (error) {
        console.log(error.response.data)
    }
}


export const AddTables = (id, persons, time, date, get) => async (dispatch, getState) => {

    try {
        const res = await Axios.post(API_ENDPOINT + `/api/addtable?id=${id}&persons=${persons}&time=${time}&date=${date}`, null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });

        // return res.data.data

    } catch (error) {
        console.log(error.response.data)
    }
}


export const RemoveTables = (id) => async (dispatch, getState) => {

    try {
        const res = await Axios.post(API_ENDPOINT + "/api/removetable?id=" + id, null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });
        dispatch(GetCart())
        dispatch(GettingCategories())
        return true

    } catch (error) {
        console.log(error.response.data)
    }
}


export const RemoveQTY = (id) => async (dispatch, getState) => {

    try {
        const res = await Axios.post(API_ENDPOINT + "/api/removeFromCart?id=" + id, null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });
        dispatch(GetCart())
        dispatch(GettingCategories())
        dispatch(GettingAdditionalItems())
        console.log(res.data,res.data.meta)
        return true

    } catch (error) {
        console.log(error.response.data)
    }
}


export const RemoveProduct = (id) => async (dispatch, getState) => {

    try {
        const res = await Axios.post(API_ENDPOINT + "/api/deleteFromCart?id=" + id, null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });
        dispatch(GetCart())
        dispatch(GettingCategories())
        dispatch(GettingAdditionalItems())
        return true

    } catch (error) {
        console.log(error.response.data)
    }
}

export const IncreaseQTY = (id) => async (dispatch, getState) => {
    try {
        const res = await Axios.post(API_ENDPOINT + "/api/addToCart?id=" + id, null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });
        dispatch(GetCart())
        dispatch(GettingCategories())
    } catch (error) {
        console.log(error)
    }

}


export const OrderHistory = (id) => async (dispatch, getState) => {

    try {
        const res = await Axios.post(API_ENDPOINT + "/api/orders", null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });
        console.log(res.data)
        dispatch({
            type: MY_ORDERS,
            payload: res.data.data
        })


    } catch (error) {
        console.log(error)
    }

}

export const GettingAdditionalItems = () => async (dispatch, getState) => {

    try {
        const res = await Axios.post(API_ENDPOINT + "/api/aditional_items", null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        })
        dispatch({
            type: GETTING_ADDITIONAL_ITEMS,
            payload: res.data.data.products
        })
    } catch (error) {
        console.log(error)
    }
}