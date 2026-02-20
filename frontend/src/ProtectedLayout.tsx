import { Navigate, Outlet } from "react-router";
import authStore from "@/store/authStore";

export default function ProtectedRoute() {
  const { isLoggedIn } = authStore();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
