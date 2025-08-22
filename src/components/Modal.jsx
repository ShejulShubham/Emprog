import { useModal } from "../context/modalContext";

const Modal = () => {
  const { isOpen, content, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-gray-500 rounded-lg shadow-lg p-2 max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {content}
      </div>
    </div>
  );
};

export default Modal;
