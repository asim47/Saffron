import * as Actions from "../Action/index"

const initialState = {
    CategoriesData: null,
    CartData: null,
    MyOrders: [],
    AdditionalItems: null

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
        case Actions.GETTING_ADDITIONAL_ITEMS:
            return {
                ...state,
                AdditionalItems: payload,
            }
        default:
            return state
    }

}