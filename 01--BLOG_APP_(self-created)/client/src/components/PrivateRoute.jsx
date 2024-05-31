import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  return <>{currentUser ? <Outlet /> : navigate("/")}</>;
}
