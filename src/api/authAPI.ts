import { API_ROUTES } from "../constants/apiRoutes";
import api from "./axios";

export interface AuthResponse {
    message: string
}

export interface Login {
    email: string;
    password: string;
}

export interface SignUp extends Login {
    username: string
}

export interface AddAllowedUsers {
    email: string;
    roleId: number;
}

// ✅ POST
export async function login(login: Login): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>(API_ROUTES.LOGIN, login);
    return res.data;
}

export async function logout(): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>(API_ROUTES.LOGOUT);
    return res.data;
}

export async function register(signup: SignUp): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>(API_ROUTES.SIGNUP, signup);
    return res.data;
}


export async function addAllowedUsers(user: AddAllowedUsers): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>(API_ROUTES.ADD_USER, user);
    return res.data;
}


