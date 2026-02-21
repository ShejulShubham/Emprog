import { createContext, useContext, useRef, useState } from "react";

const ModalContext = createContext();

export default function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const showCrossRef = useRef(true);

  const openModal = (childrenContent, setShowCross=true) => {
    setContent(childrenContent);
    showCrossRef.current = setShowCross;
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal, showCrossRef }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
