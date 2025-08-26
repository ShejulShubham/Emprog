import { useModal } from "../context/modalContext";

const Modal = () => {
  const { isOpen, content, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pt-20"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-2 max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="justify-self-end">
          {" "}
          {/* // Close Icon (X) */}
          <button className="focus:outline-none" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
