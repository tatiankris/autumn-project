import {instance} from "./autumn-api";
import {AxiosResponse} from 'axios'

export const passwordAPI={
    passwordRecovery(data:RecoveryPasswordDataType){
        return instance.post<RecoveryPasswordDataType, AxiosResponse<ResponseType>>('auth/forgot', data)
    },
}


export type RecoveryPasswordDataType={
    email: string
    from: string
    message: string
}

export type ResponseType={
    info:string
    error: string
    success:boolean
}