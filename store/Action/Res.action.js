import Axios from "axios";
import { API_ENDPOINT } from "../../env";


export const GETTING_CATEGORIES = "GETTING_CATEGORIES"
export const GETTING_CART_DATA = "GETTING_CART_DATA"
export const MY_ORDERS = "MY_ORDERS"


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


export const GetTables = () => async (dispatch, getState) => {

    try {
        const res = await Axios.post(API_ENDPOINT + "/api/tables", null, {
            headers: {
                Authorization: `Bearer ${getState().auth.Token}`
            },
        });

        return res.data.data

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
        get()
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


export const  RemoveQTY = (id) => async (dispatch, getState) => {

    try {
        const res = await Axios.post(API_ENDPOINT + "/api/removeFromCart?id=" + id, null, {
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


export const RemoveProduct = (id) => async (dispatch, getState) => {

    try {
        const res = await Axios.post(API_ENDPOINT + "/api/deleteFromCart?id=" + id, null, {
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

        dispatch({
            type:MY_ORDERS,
            payload:res.data.data
        })


    } catch (error) {
        console.log(error)
    }

}