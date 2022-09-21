import {ValuesType} from "../../../n2-features/f1-auth/a2-registration/Registration";
import {authAPI} from "../../m3-dal/api/registration-api";
import {AppDispatch} from "../store";

let initialState = {
    signUp: false
} as StateType

export type StateType = {
    signUp: boolean
}

export const registrationReducer = (state: StateType = initialState, action: ActionType): StateType => {

    switch (action.type) {
        case 'SIGN_UP': {
            return {...state, signUp: action.value}
        }
        default:
            return state
    }
}


export const registrationAC = (value: boolean) => {
    return {
        type: 'SIGN_UP',
        value
    } as const
}

export const registrationTC = (values: ValuesType) => async (dispatch: AppDispatch)  => {
    try {

        let data = await authAPI.createAccount(values.email, values.password)
        dispatch(registrationAC(true));
        alert(`${JSON.stringify(data.addedUser.name)} sign up succesfully!`)

    } catch (error: any) {

            alert(error.response.data.error);
    }

}

export type ActionType = ReturnType<typeof registrationAC>

