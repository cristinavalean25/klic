import React from "react";
import { PropertyDetails } from "../../types/PropertyDetails";

interface ListaCaseProps {
  propertyDetails: PropertyDetails;
  currentPage: number;
}

const ListaCase: React.FC<ListaCaseProps> = ({ propertyDetails }) => {
  return (
    <div className="case-details">
      <h5>{propertyDetails.titlu.ro}</h5>
      <p>€{propertyDetails.pretvanzare}</p>
      <p>{propertyDetails.nrcamere} camere</p>
      <p>ID: {propertyDetails.idnum}</p>
      {propertyDetails.images && propertyDetails.images.length > 0 && (
        <img
          src={propertyDetails.images[0].src}
          alt={propertyDetails.images[0].alt}
        />
      )}
      {/* Add more property details as needed */}
    </div>
  );
};

export default ListaCase;
