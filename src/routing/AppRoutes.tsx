import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import Layout from "../layout/Layout/Layout";
import NotFoundPage from "../pages/NotFound";
import LoginPage from "../pages/Login/LoginPage";
import SignUpPage from "../pages/SignUp/SignUpPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path.replace("/", "")} element={element} />
        ))}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  );
};

export default AppRoutes;
