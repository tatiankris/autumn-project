import {instance} from "./autumn-api";
import {AxiosResponse} from 'axios';

export const authAPI = {
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<LoginResponseType>>('/auth/login', data)
    },
    logout() {
        return instance.delete<{},AxiosResponse<{info:string}>>('/auth/me')
    },
    me() {
        return instance.post<{},AxiosResponse<LoginResponseType>>('/auth/me')
    }
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type LoginResponseType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}

