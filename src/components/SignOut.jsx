import useSignOut from "../hooks/useSignOut";

const SignOut = () => {
  const signOut = useSignOut();
  signOut();
  return null;
};

export default SignOut;