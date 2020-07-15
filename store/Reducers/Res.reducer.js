import * as Actions from "../Action/index"

const initialState = {
    CategoriesData: null,
    CartData: null,
    MyOrders: [],

};

export const ResReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {

        case Actions.GETTING_CATEGORIES:
            return {
                ...state,
                CategoriesData: payload
            }
        case Actions.GETTING_CART_DATA:
            return {
                ...state,
                CartData: payload
            }
        case Actions.MY_ORDERS:
            return {
                ...state,
                MyOrders: payload,
            }

        default:
            return state
    }

}