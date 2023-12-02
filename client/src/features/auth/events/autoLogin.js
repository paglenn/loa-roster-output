import { checkAdmin } from "../../../utils/api";
import { login } from "../../../state/userSlice";
const autoLogin = async (navigate, dispatch) => {
  const currentUser = localStorage.getItem("user") ?? null;
  const isNonTestUser = currentUser && currentUser !== "test";
  const isAdminUser = currentUser === "test" && (await checkAdmin());
  if (isNonTestUser || isAdminUser) {
    dispatch(login(currentUser));
    if (navigate !== undefined) navigate("/app");
  }
};
export default autoLogin;
