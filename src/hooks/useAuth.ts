import { useState } from "react";
import type { Login, AuthResponse, SignUp, AddAllowedUsers } from "../api/authAPI";
import { loginService, registerService, logoutService, addAllowedUsersService } from "../services/authService";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<AuthResponse | null>(null);

    const login = async (data: Login): Promise<AuthResponse | null> => {
        setLoading(true);
        setError(null);

        try {
            const res = await loginService(data);
            setResponse(res);
            return res;
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (data: SignUp): Promise<AuthResponse | null> => {
        setLoading(true);
        setError(null);

        try {
            const res = await registerService(data);
            setResponse(res);
            return res;
        } catch (err: any) {
            console.log("error ni", err)
            setError(err.response?.data?.message || "Signup failed");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);

        try {
            await logoutService();
        } catch (err: any) {
            setError(err.response?.data?.message || "Logout failed");
        } finally {
            setLoading(false);
        }
    };

    const addAllowedUsers = async (data: AddAllowedUsers) => {
        setLoading(true);
        setError(null);
        try {
            const res = await addAllowedUsersService(data);
            setResponse(res);
            return res;
        }
        catch (err: any) {
            setError(err.response?.data?.message || "Adding allowed users failed");
            return null;
        }
        finally {
            setLoading(false);
        }
    }

    return {
        login,
        signup,
        logout,
        addAllowedUsers,
        loading,
        error,
        response
    };
}