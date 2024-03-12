import { useSelector } from "react-redux";

const useAuth = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.role);

  return { isLoggedIn, user, role };
};

export default useAuth;
