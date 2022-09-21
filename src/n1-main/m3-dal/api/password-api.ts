import {instance} from "./autumn-api";
import {AxiosResponse} from 'axios'

export const passwordAPI={
    passwordRecovery(data:RecoveryPasswordDataType){
        return instance.post<RecoveryPasswordDataType, AxiosResponse<ResponseType>>('auth/forgot', data)
    },
    setNewPassword(data: SetNewPasswordType){
        return instance.post<SetNewPasswordType, AxiosResponse<ResponseType>>('/auth/set-new-password', data)
    }
}


export type RecoveryPasswordDataType={
    email: string
    from: string
    message: string
}

export type SetNewPasswordType = {
    password: string
    resetPasswordToken: string
}

export type ResponseType={
    info:string
    error: string
    success:boolean
}