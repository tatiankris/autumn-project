import {instance} from "./autumn-api";

export const profileAPI = {
    changeProfile(name: string, avatar: string) {
        return instance.put('auth/me', {name, avatar})
    }
}

export type ProfileType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error?: string
}