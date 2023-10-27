const handleLogout = (navigate, setUser) => {
  localStorage.removeItem("user");
  setUser("");
  navigate("/");
};
export default handleLogout;
