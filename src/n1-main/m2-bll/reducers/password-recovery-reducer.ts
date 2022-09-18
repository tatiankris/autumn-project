import {Dispatch} from "redux";
import {passwordAPI} from "../../m3-dal/api/password-api";

let initialState = {
    recoveryStatus:false,
    email: ""
}
export type StateType = typeof initialState;

export const passwordRecoveryReducer = (state: StateType = initialState, action: ActionType): StateType => {

    switch (action.type) {
        case 'PASSWORD/CHANGE-PR-STATUS': {
            return {...state, recoveryStatus: action.status, email:action.email}
        }
        default:
            return state
    }
}


export const changePasswordRecoveryStatusAC = (status:boolean, email:string) => {
    return {
        type: 'PASSWORD/CHANGE-PR-STATUS',
        status, email
    } as const
}

export const passwordRecoveryTC = (email: { email: string }) => {
    return (dispatch: Dispatch) => {
        const data = {
            ...email, // кому восстанавливать пароль
            from: "Yuhee <YuheePlyuhee@gmail.com>", // можно указать разработчика фронта)
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
            // хтмп-письмо, вместо $token$ бэк вставит токен
        }
        passwordAPI.passwordRecovery(data)
            .then(res=>{
                dispatch(changePasswordRecoveryStatusAC(res.data.success, data.email))
                })
            .catch(err=>{
                console.log(err)
            })
    }
}


export type ActionType = ReturnType<typeof changePasswordRecoveryStatusAC>