import {authAPI, LoginDataType} from "../../m3-dal/api/auth-api";
import {setProfileAC} from "./profile-reducer";
import {AppDispatch} from "../store";
import {handleServerNetworkError} from "../../m1-ui/common/utils/error-utils";
import {setAppStatusAC} from "./app-reducer";
import {ValuesType} from "../../../n2-features/f1-auth/a2-registration/Registration";


let initialState = {
    isLoggedIn: false,
    isInitialized: false,
    signUp: false,
    recoveryStatus: false,
    email: "",
    newPasswordStatus: false
}
export type StateType = typeof initialState;

export const authReducer = (state: StateType = initialState, action: ActionsType): StateType => {

    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value}
        }
        case 'auth/SET-IS-INITIALIZED': {
            return {...state, isInitialized: action.value}
        }
        case 'auth/SIGN_UP': {
            return {...state, signUp: action.value}
        }
        case 'auth/CHANGE-PR-STATUS': {
            return {...state, recoveryStatus: action.status, email: action.email}
        }
        case 'auth/SET-NEW-PASSWORD': {
            return {...state, newPasswordStatus: action.newPasswordStatus}
        }
        default:
            return state
    }
}

//actions
export const loginAC = (value: boolean) => {
    return {
        type: 'auth/SET-IS-LOGGED-IN',
        value
    } as const
}

export const setIsInitializedAC = (value: boolean) => ({type: 'auth/SET-IS-INITIALIZED', value} as const);

export const registrationAC = (value: boolean) => {
    return {
        type: 'auth/SIGN_UP',
        value
    } as const
}

export const changePasswordRecoveryStatusAC = (status: boolean, email: string) => {
    return {
        type: 'auth/CHANGE-PR-STATUS',
        status, email
    } as const
}

export const setNewPasswordAC = (value: boolean) => {
    return {
        type: 'auth/SET-NEW-PASSWORD',
        newPasswordStatus: value
    } as const
}

//thunks
export const loginTC = (data: LoginDataType) => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.login(data)
            .then(res => {
                dispatch(setProfileAC(res.data))
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
            dispatch(setProfileAC(res.data));
        })
        .catch( () => {
                // const error = err.response
                //     ? err.response.data.error
                //     : err.message
                // handleServerNetworkError({message: error}, dispatch)
            }

        )
        .finally(() => {
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC("idle"))
        }
)

}

export const registrationTC = (values: ValuesType) =>(dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.register({email: values.email, password: values.password})
        .then(res=>{
            dispatch(registrationAC(true));
            alert(`${JSON.stringify(res.data.addedUser.name)} sign up successfully!`)
        })
        .catch (err=> {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        }).finally(() => dispatch(setAppStatusAC("idle")))
}

export const passwordRecoveryTC = (email: { email: string }) => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC("loading"))
        const data = {
            ...email, // ???????? ?????????????????????????????? ????????????
            from: "Yuhee <YuheePlyuhee@gmail.com>", // ?????????? ?????????????? ???????????????????????? ????????????)
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            Forgot your password? That is okay? it happens! Click on the link bellow to reset yor password:
            <a href='https://tatiankris.github.io/autumn-project/#/new-password/$token$'>link</a></div>`
            // ????????-????????????, ???????????? $token$ ?????? ?????????????? ??????????
        }
        authAPI.passwordRecovery(data)
            .then(res => {
                dispatch(changePasswordRecoveryStatusAC(res.data.success, data.email))
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

export const setNewPasswordTC = (password: string, resetPasswordToken: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));

    const data = {
        password,
        resetPasswordToken
    }

    authAPI.setNewPassword(data)
        .then(() => {
            dispatch(setNewPasswordAC(true));
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch);
        })
        .finally(() => dispatch(setAppStatusAC("idle")));
}

//types
export type ActionsType = ReturnType<typeof loginAC> | ReturnType<typeof setIsInitializedAC> |
    ReturnType<typeof registrationAC> | ReturnType<typeof changePasswordRecoveryStatusAC> | ReturnType<typeof setNewPasswordAC>

