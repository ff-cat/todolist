import axios from "axios";

export const apiKey = 'f582c58f-0778-4c75-866b-da832054adf0'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': apiKey
    },
})

export const authAPI = {
    me() {
        return instance.get(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe}).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(res => res.data)
    },
}