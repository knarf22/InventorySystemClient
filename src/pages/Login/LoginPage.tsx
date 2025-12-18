import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormUI from "./LoginFormUI";
import api from "./axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log("Sending login request...");
      await api.post("/Auth/login", { email, password });
      console.log("Login successful, cookie should be set");

      // redirect after login
      navigate("/", { replace: true });
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
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
