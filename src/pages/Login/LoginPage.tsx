import { useState } from "react";
import LoginFormUI from "./LoginFormUI";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const correctAccount = {
        email: "frank@gmail.com",
        password: "ffff1234"
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            email === correctAccount.email &&
            password === correctAccount.password
        ) {
            navigate("/")
        } else {
            alert("Mali")
        }
    };

    return (
        <LoginFormUI
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
        />
    );
};

export default LoginPage;
