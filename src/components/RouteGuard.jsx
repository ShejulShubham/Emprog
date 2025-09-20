import { Navigate } from "react-router-dom";
import { useUserSettings } from "../store/useSettingStore";

export default function RedirectIfNeeded({ children }) {
  const directToDashboard = useUserSettings(
    (state) => state.settings.directToDashboard
  );

  if (directToDashboard) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
