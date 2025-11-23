import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectIsLogin } from "../../redux/auth/auth-selectors";

const PublicRoute = (): ReactNode => {
  const isLogin: boolean = useSelector(selectIsLogin);

  if (isLogin) return <Navigate to="/" />;
  return <Outlet />;
};

export default PublicRoute;
