import { checkAdmin } from "../../../utils/api";
import { login } from "../../../state/userSlice";
const autoLogin = async (navigate, dispatch) => {
  const currentUser = localStorage.getItem("user") ?? null;
  if (
    (currentUser && currentUser !== "test") ||
    (currentUser === "test" && (await checkAdmin()))
  ) {
    dispatch(login(currentUser));
    if (navigate !== undefined) navigate("/app");
  }
};
export default autoLogin;
