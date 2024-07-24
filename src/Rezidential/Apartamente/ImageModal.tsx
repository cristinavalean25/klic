import React, { useEffect } from "react";
import "../../CssPages/ImageModal.css";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  imageUrl,
  onClose,
  onNext,
  onPrev,
}) => {
  // Add event listener for the ESC key to close the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="Property" className="modal-image" />
        <button className="prev-button" onClick={onPrev}>
          &#10094;
        </button>
        <button className="next-button" onClick={onNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
