import { useEffectOnce, useLocalStorage } from "react-use";
import { useNavigate } from "react-router";

export default function ProtectedRoute() {
  const [token, _] = useLocalStorage("token", "");
  const navigate = useNavigate();

  useEffectOnce(() => {
    if (!token) {
      navigate("/login");
    }
  });
}
