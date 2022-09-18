import {ValuesType} from "../../../n2-features/f1-auth/a2-registration/Registration";
import {Dispatch} from "redux";
import {authAPI} from "../../m3-dal/api/registration-api";
import {LOGIN} from "../../m1-ui/routing/Routing";
import { AxiosError } from "axios";

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

export const registrationTC = (values: ValuesType) => async (dispatch: Dispatch<ThunkDispatch>)  => {
    try {

        let data = await authAPI.createAccount(values.email, values.password)
        dispatch(registrationAC(true));
        alert(`${JSON.stringify(data.addedUser.name)} sign up succesfully!`)

    } catch (error: any) {

            alert(error.response.data.error);
    }

}

export type ActionType = ReturnType<typeof registrationAC>
type ThunkDispatch = ActionType

