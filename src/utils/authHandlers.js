import useAuthStore from "../store/useAuthStore";
import { signIn, signUp, logOut } from "../firebase/auth";

const extractUserData = (firebaseUser) => {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || "",
    photoURL: firebaseUser.photoURL || "",
  };
};

export const handleSignUp = async (email, password) => {
  const { setUser, setLoading, setError } = useAuthStore.getState();
  setLoading(true);
  try {
    const userCredential = await signUp(email, password);
    const user = extractUserData(userCredential);
    setUser(user);
    setError(null);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

export const handleSignIn = async (email, password) => {
  const { setUser, setLoading, setError } = useAuthStore.getState();
  setLoading(true);
  try {
    const userCredential = await signIn(email, password);
    const user = extractUserData(userCredential);
    setUser(user);
    setError(null);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

export const handleSignOut = async () => {
  const { logout } = useAuthStore.getState();
  await logOut();
  logout();
};
