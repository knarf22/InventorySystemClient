import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import Layout from "../layout/Layout/Layout";
import NotFoundPage from "../pages/NotFound";
import LoginPage from "../pages/Login/LoginPage";
import SignUpPage from "../pages/SignUp/SignUpPage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          {ROUTES.map(({ path, element }) => (
            <Route key={path} path={path.replace("/", "")} element={element} />
          ))}
        </Route>
      </Route>

      {/* Public Routes */}
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  );
};

export default AppRoutes;
