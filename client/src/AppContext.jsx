import React from "react";
import ModalProvider from "./context/modalContext";
import LoadingProvider from "./context/loadingContext";
import UserSettingsProvider from "./context/userSettingContext";

export const AppProvider = ({ children }) => {
  return (
    <UserSettingsProvider >
      <LoadingProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </LoadingProvider>
    </UserSettingsProvider>
  );
};
