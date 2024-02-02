import React from "react";
import "../CssPages/Apartamente.css";
import { PropertyDetails } from "../types/PropertyDetails";

interface ListaApartamenteProps {
  propertyDetails: PropertyDetails;
}

const ListaApartamente: React.FC<ListaApartamenteProps> = ({
  propertyDetails,
}) => {
  const { idnum, images } = propertyDetails || {};

  return (
    <div>
      <h4>P{idnum}</h4>
      {images && images.length > 0 && (
        <div className="property-image">
          <div className="image-container">
            <img src={images[0].src} alt={images[0].alt} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaApartamente;
