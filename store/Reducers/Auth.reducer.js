import * as Actions from "../Action/index"

const initialState = {
    isAuth: false,
    Token: null,
    Profile: null,

};

export const AuthReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {

        case Actions.LOGIN_ATTEMPT:
            return {
                ...state,
                isAuth: true,
                Token: payload
            }


        case Actions.LOGOUT:
            return {
                ...state,
                isAuth: false,
                Token: null,
                Profile: null,
            }
        case Actions.GETTING_PROFILE:
            return {
                ...state,
                Profile: payload,
            }

        default:
            return state
    }

}