import { useState } from "react";
import SignUpFormUI from "./SignUpFormUI";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      console.log("Sending login request...");
      await api.post("/Auth/register", { username, email, password });
      console.log("registration successful");

      // redirect after login
      navigate("/login", { replace: true });
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

    console.log({
      email,
      username,
      password,
    });
  };

  return (
    <SignUpFormUI
      email={email}
      username={username}
      password={password}
      confirmPassword={confirmPassword}
      onEmailChange={setEmail}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSubmit={handleSubmit}
    />
  );
};

export default SignUpPage;
