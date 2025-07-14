import { useNavigate } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { userLogout } from "../../lib/api/UserApi";

function UserLogout() {
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await userLogout(token);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setToken("");
      await navigate({
        pathname: "/login",
      });
    } else {
      await alertError(responseBody);
    }
  }

  useEffectOnce(() => {
    handleLogout().then(() => console.log("user logout success"));
  });

  return <></>;
}

export default UserLogout;
