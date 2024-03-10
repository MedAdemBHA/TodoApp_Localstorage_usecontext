import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = localStorage.getItem("currentUser");

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
