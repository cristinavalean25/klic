import React from "react";
import { PropertyDetails } from "../../../types/PropertyDetails";
import "../Case/SecondDetailsCase.css";

interface Props {
  property: PropertyDetails | null;
  caracteristiciRef: React.RefObject<HTMLDivElement>;
}

const SecondDetailsCase: React.FC<Props> = ({
  property,
  caracteristiciRef,
}) => {
  return (
    <div className="second-details-case" style={{ backgroundColor: "#EFEFEF" }}>
      <div className="property-actions-case">
        <div className="action-buttons-case">
          <div className="actions-div-case">
            <div className="line-gallery-case"></div>
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

          <div className="actions-div-case">
            <div className="line-gallery-case"></div>
            <h5>Schita</h5>
          </div>

          <div className="actions-div-case">
            <div className="line-gallery-case"></div>
            <h5>Intreaba</h5>
          </div>
        </div>
        <div className="image-slider-case">
          {property?.images?.map((image, index) => (
            <div className="slide-case" key={index}>
              <img
                src={image.src}
                alt=""
                className="img-responsive slide-image-case"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondDetailsCase;
