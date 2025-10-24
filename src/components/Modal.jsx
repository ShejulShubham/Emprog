import { useEffect, useRef } from "react";
import { useModal } from "../context/modalContext";

const Modal = () => {
  const { isOpen, content, closeModal } = useModal();
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    // Focus the modal when it opens for better accessibility
    if (modalRef.current) {
      modalRef.current.focus();
    }

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 pt-20"
      onClick={closeModal}
    >
      <div
        ref={modalRef}
        className="bg-white relative rounded-lg shadow-lg p-2 max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        tabIndex={-1} // Makes the div focusable
      >
        <div className="absolute right-0 top-0 m-2">
          {" "}
          {/* // Close Icon (X) */}
          <button className="focus:outline-none" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Modal;
