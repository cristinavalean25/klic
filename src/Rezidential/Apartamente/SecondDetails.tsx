import React from "react";
import { PropertyDetails } from "../../types/PropertyDetails";

interface Props {
  property: PropertyDetails | null;
  caracteristiciRef: React.RefObject<HTMLDivElement>;
}

const SecondDetails: React.FC<Props> = ({ property, caracteristiciRef }) => {
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
            <h5>Intreaba</h5>
          </div>
        </div>
        <div className="image-slider">
          {property?.images?.slice(1).map((image, index) => (
            <div className="slide" key={index}>
              <img
                src={image.src}
                alt=""
                className="img-responsive slide-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondDetails;
