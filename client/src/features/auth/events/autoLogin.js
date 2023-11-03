import { checkAdmin } from "../../../utils/api";
const autoLogin = async (setUser) => {
  const currentUser = localStorage.getItem("user") ?? "";
  if (currentUser !== "test") setUser(currentUser);
  else if (await checkAdmin()) setUser(currentUser);
};
export default autoLogin;
