import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyDetails } from "../../../types/PropertyDetails";
import ImageModal from "./ImageModal";
import "../../../CssPages/ApartamenteDetalii.css";

interface Props {
  property: PropertyDetails | null;
  caracteristiciRef: React.RefObject<HTMLDivElement>;
}

const SecondDetails: React.FC<Props> = ({ property, caracteristiciRef }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  if (!property) return null;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && property.images) {
      setSelectedImageIndex((selectedImageIndex + 1) % property.images.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null && property.images) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + property.images.length) %
          property.images.length
      );
    }
  };

  return (
    <div className="second-details" style={{ backgroundColor: "#EFEFEF" }}>
      <div className="property-actions">
        <div className="action-buttons">
          <div className="actions-div">
            <div className="line-gallery"></div>
            <h5
              style={{ cursor: "pointer" }}
              onClick={() =>
                caracteristiciRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              Caracteristici
            </h5>
          </div>

          <div className="actions-div">
            <div className="line-gallery"></div>
            <h5>Schita</h5>
          </div>

          <div className="actions-div">
            <div className="line-gallery"></div>
            <h5 onClick={() => navigate("/contact")}>Intreaba</h5>{" "}
            {/* Navigate to contact page */}
          </div>
        </div>
        <div className="image-slider">
          {property?.images?.slice(1).map((image, index) => (
            <div className="slide" key={index}>
              <img
                src={image.src}
                alt={image.alt}
                className="img-responsive slide-image"
                onClick={() => handleImageClick(index + 1)} // Adjust index to match sliced array
              />
            </div>
          ))}
        </div>
      </div>
      {modalVisible && selectedImageIndex !== null && property.images && (
        <ImageModal
          imageUrl={property.images[selectedImageIndex].src}
          onClose={() => setModalVisible(false)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};

export default SecondDetails;
