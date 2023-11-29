import { checkAdmin } from "../../../utils/api";
import { login } from "../../../state/userSlice";
const autoLogin = async (setUser, navigate, dispatch) => {
  const currentUser = localStorage.getItem("user") ?? "";
  if (
    currentUser !== "test" ||
    (currentUser === "test" && (await checkAdmin()))
  ) {
    setUser(currentUser);
    dispatch(login(currentUser));
    if (navigate !== undefined) navigate("/app");
  }
};
export default autoLogin;
