import useAuthStore from "../store/useAuthStore";
import { signIn, signUp, logOut, signInWithGoogle } from "../firebase/auth";
import { clearLocalItems } from "./watchlistHandler";

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
  const { setUser } = useAuthStore.getState();
  try {
    const userCredential = await signUp(email, password);
    const user = extractUserData(userCredential);
    setUser(user);
  } catch (err) {
    throw err;
  }
};

export const handleSignIn = async (email, password) => {
  const { setUser } = useAuthStore.getState();
  try {
    const userCredential = await signIn(email, password);
    const user = extractUserData(userCredential);
    setUser(user);
  } catch (err) {
    throw err;
  }
};

export const handleGoogleSignIn = async () => {
  const { setUser } = useAuthStore.getState();
  try {
    const userCredential = await signInWithGoogle();
    const user = extractUserData(userCredential);
    setUser(user);

    return true;
  } catch (err) {
    throw err;
  }
};

// TODO: make this function to clear out every single stored value
export const handleSignOut = async () => {
  try {
    await logOut();
    return true;
  } finally {
    const { logout } = useAuthStore.getState();
    logout();
    clearLocalItems();
  }
};
