import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import Layout from "../layout/Layout/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path.replace("/", "")} element={element} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
