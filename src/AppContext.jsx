import React from "react";
import { ModalProvider } from "./context/modalContext";
import { LoadingProvider } from "./context/loadingContext";

export const AppProvider = ({ children }) => {
  return (
    <LoadingProvider>
      <ModalProvider>{children}</ModalProvider>
    </LoadingProvider>
  );
};
