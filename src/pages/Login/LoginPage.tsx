import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormUI from "./LoginFormUI";
import api from "./axios";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const res = await login({ email, password });
    console.log("titores", res)
    if (res) {
      // redirect after login
      alert("Login failed: " + res);

      navigate("/", { replace: true });
    } else {
      alert("Login failed: " + error);
    }


  };

  return (
    <LoginFormUI
      email={email}
      password={password}
      loading={loading}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
