import {authAPI, LoginDataType} from "../../m3-dal/api/auth-api";
import {AxiosError} from 'axios';
import {setProfileAC} from "./profile-reducer";
import {AppDispatch} from "../store";

let initialState = {
    isLoggedIn:false
}
export type StateType = typeof initialState;

export const loginReducer = (state: StateType = initialState, action: ActionsType): StateType => {

    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}


export const loginAC = (value:boolean) => {
    return {
        type: 'LOGIN/SET-IS-LOGGED-IN',
        value
    } as const
}


export const loginTC=(data:LoginDataType)=>{
    return (dispatch: AppDispatch)=>{
        authAPI.login(data)
            .then(res=>{
                dispatch(loginAC(true))
                dispatch(setProfileAC(res.data._id, res.data.name, res.data.email, res.data.avatar))
            })
            .catch((err:AxiosError<{error:string}>)=>{
                const error = err.response
                    ? err.response.data.error
                    : err.message
                console.log('error: ', error)
            })
    }
}


export const logoutTC=()=>{
    return (dispatch: AppDispatch)=>{
        authAPI.logout()
            .then(res=>{
                dispatch(loginAC(false))
            })
            .catch((err:AxiosError<{error:string}>)=>{
                const error = err.response
                    ? err.response.data.error
                    : err.message
                console.log('error: ', error)
            })
    }
}


export type ActionsType = ReturnType<typeof loginAC>

