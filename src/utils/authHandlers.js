import useAuthStore from "../store/useAuthStore";
import { signIn, signUp, logOut } from "../firebase/auth";
import { clearLocalItems } from "./itemHandlers";

const extractUserData = (firebaseUser) => {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,         // ✅ User ID saved
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || "",
    photoURL: firebaseUser.photoURL || "",
  };
};

export const handleSignUp = async (email, password) => {
  const { setUser } = useAuthStore.getState();
  try {
    const userCredential = await signUp(email, password);
    const user = extractUserData(userCredential); // ✅ Ensure .user is used
    setUser(user);
  } catch (err) {
    throw err;
  }
};

export const handleSignIn = async (email, password) => {
  const { setUser } = useAuthStore.getState();
  try {
    const userCredential = await signIn(email, password);
    const user = extractUserData(userCredential); // ✅ Ensure .user is used
    setUser(user);
  } catch (err) {
    throw err;
  }
};

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

