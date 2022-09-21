import {AppDispatch} from "../store";
import {setAppStatusAC} from "./app-reducer";
import {passwordAPI} from "../../m3-dal/api/password-api";
import {handleServerNetworkError} from "../../m1-ui/common/utils/error-utils";

let initialState = {
    newPasswordStatus: false
}

export const newPasswordReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case 'NEW-PASSWORD/SET-NEW-PASSWORD': {
            return {...state, newPasswordStatus: action.newPasswordStatus}
        }
        default:
            return state
    }
}

//actions
export const setNewPasswordAC = (value: boolean) => {
    return {
        type: 'NEW-PASSWORD/SET-NEW-PASSWORD',
        newPasswordStatus: value
    } as const
}

//thunks
export const setNewPasswordTC = (password: string, resetPasswordToken: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"));

    const data = {
        password,
        resetPasswordToken
    }

    passwordAPI.setNewPassword(data)
        .then(res => {
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
export type ActionType = ReturnType<typeof setNewPasswordAC>;
export type StateType = typeof initialState;