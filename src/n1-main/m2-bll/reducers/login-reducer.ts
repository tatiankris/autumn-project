import {Dispatch} from 'redux'
import {authAPI, LoginDataType} from "../../m3-dal/api/auth-api";
import {AxiosError} from 'axios';

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
    return (dispatch:Dispatch<ActionsType>)=>{
        authAPI.login(data)
            .then(res=>{
                dispatch(loginAC(true))
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
    return (dispatch:Dispatch<ActionsType>)=>{
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

