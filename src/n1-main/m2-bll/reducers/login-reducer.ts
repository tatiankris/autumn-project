import {authAPI, LoginDataType} from "../../m3-dal/api/auth-api";
import {AxiosError} from 'axios';
import {setProfileAC} from "./profile-reducer";
import {AppDispatch} from "../store";
import {handleServerNetworkError} from "../../m1-ui/common/utils/error-utils";
import {setAppStatusAC} from "./app-reducer";

let initialState = {
    isLoggedIn: false,
    isInitialized: false
}
export type StateType = typeof initialState;

export const loginReducer = (state: StateType = initialState, action: ActionsType): StateType => {

    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value}
        }
        case 'LOGIN/SET-IS-INITIALIZED': {
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}

export const loginAC = (value: boolean) => {
    return {
        type: 'LOGIN/SET-IS-LOGGED-IN',
        value
    } as const
}

export const setIsInitializedAC = (value: boolean) => ({type: 'LOGIN/SET-IS-INITIALIZED', value} as const);


export const loginTC = (data: LoginDataType) => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.login(data)
            .then(res => {
                dispatch(setProfileAC(res.data._id, res.data.name, res.data.email, res.data.avatar))
                dispatch(loginAC(true))
            })
            .catch(err => {
                const error = err.response
                    ? err.response.data.error
                    : err.message
                handleServerNetworkError({message: error}, dispatch)
            })
            .finally(() => dispatch(setAppStatusAC("idle")))
    }
}


export const logoutTC = () => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.logout()
            .then(() => {
                dispatch(loginAC(false))
            })
            .catch(err => {
                const error = err.response
                    ? err.response.data.error
                    : err.message
                handleServerNetworkError({message: error}, dispatch)
            })
            .finally(() => dispatch(setAppStatusAC("idle")))
    }
}

export const initializeAppTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.me()
        .then(res => {
            dispatch(loginAC(true))
            dispatch(setProfileAC(res.data._id, res.data.name, res.data.email, res.data.avatar));
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC("idle"))
        }
)

}


export type ActionsType = ReturnType<typeof loginAC> | ReturnType<typeof setIsInitializedAC>

