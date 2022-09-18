import { AxiosResponse } from "axios";
import { instance } from "./autumn-api";

export const authAPI = {
    createAccount(email: string, password: string) {
        return instance.post<{ email: string, password: string }, AxiosResponse<{addedUser:any, error?: string}>>
        ('auth/register', {email, password})
            .then(res => res.data)
    },
}



