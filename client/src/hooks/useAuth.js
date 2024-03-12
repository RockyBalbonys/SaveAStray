import { useSelector } from 'react-redux';

const useAuth = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const user = useSelector(state => state.user);

  return { isLoggedIn, user };
};

export default useAuth;
