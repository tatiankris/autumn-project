import {ValuesType} from "../../../n2-features/f1-auth/a2-registration/Registration";
import {authAPI} from "../../m3-dal/api/registration-api";
import {handleServerNetworkError} from "../../m1-ui/common/utils/error-utils";
import {setAppStatusAC} from "./app-reducer";
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

export const registrationTC = (values: ValuesType) =>(dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.createAccount(values.email, values.password)
        .then(res=>{
            dispatch(registrationAC(true));
            alert(`${JSON.stringify(res.addedUser.name)} sign up successfully!`)
        })
        .catch (err=> {
        const error = err.response
            ? err.response.data.error
            : err.message
        handleServerNetworkError({message: error}, dispatch)
    }).finally(() => dispatch(setAppStatusAC("idle")))


}

export type ActionType = ReturnType<typeof registrationAC>
type ThunkDispatch = ActionType

