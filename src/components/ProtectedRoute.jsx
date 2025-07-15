import { useLocalStorage } from "react-use";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { alertLoginFirst } from "../lib/alert";

export default function ProtectedRoute() {
  const [token, _] = useLocalStorage("token", "");
  const navigate = useNavigate();

  const checkAuth = async () => {
    if (!token) {
      await alertLoginFirst("You must login to access this page.");
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <Outlet />;
}
