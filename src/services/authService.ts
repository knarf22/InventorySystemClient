import { addAllowedUsers, login, logout, register, type AddAllowedUsers, type AuthResponse, type Login, type SignUp } from "../api/authAPI";



export async function loginService(user: Login) : Promise<AuthResponse>{
    return await login(user);
}

export async function registerService(user: SignUp) : Promise<AuthResponse>{
    return await register(user);
}

export async function logoutService() : Promise<AuthResponse> {
    return await logout()
}

export async function addAllowedUsersService(user: AddAllowedUsers) : Promise<AuthResponse> {
    return await addAllowedUsers(user);
}