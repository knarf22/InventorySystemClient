import { login, logout, register, type AuthResponse, type Login, type SignUp } from "../api/authAPI";



export async function loginService(user: Login) : Promise<AuthResponse>{
    return await login(user);
}

export async function registerService(user: SignUp) : Promise<AuthResponse>{
    return await register(user);
}

export async function logoutSerice() : Promise<AuthResponse> {
    return await logout()
}