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
      className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-40 pt-20 transition-all"
      onClick={closeModal}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-slate-900 relative rounded-lg shadow-2xl p-2 max-w-md w-full border border-transparent dark:border-slate-800"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        tabIndex={-1} // Makes the div focusable
      >
        <div className="absolute right-0 top-0 m-2">
          {/* Close Icon (X) */}
          <button
            className="focus:outline-none text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
            onClick={closeModal}
          >
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

        {/* This ensures any content injected into the modal respects dark mode text colors */}
        <div className="text-gray-900 dark:text-white">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
