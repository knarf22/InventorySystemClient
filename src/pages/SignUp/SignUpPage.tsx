import { useState } from "react";
import SignUpFormUI from "./SignUpFormUI";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { signup, error } = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const res = await signup({ email, username, password });

    if (res) {
      // redirect after signup
      navigate("/login", { replace: true });
    } else {
      alert("Signup failed: " + error);
    }
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
