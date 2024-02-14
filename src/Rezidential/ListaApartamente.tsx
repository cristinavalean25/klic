import React from "react";
import "../CssPages/Apartamente.css";
import { PropertyDetails } from "../types/PropertyDetails";

interface ListaApartamenteProps {
  propertyDetails: PropertyDetails;
}

const ListaApartamente: React.FC<ListaApartamenteProps> = ({
  propertyDetails,
}) => {
  const { images, pretvanzare, zona, titlu, idnum } = propertyDetails || {};

  return (
    <div className="lista-apartamente-item">
      {images && images.length > 0 && (
        <div className="property-image">
          <div className="image-container-ap">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="img-responsive img-ap"
            />
            <div className="overlay-lista-ap">
              <div className="detalii-zona">
                <h5 className="title-propriety">{titlu.ro}</h5>
              </div>

              <div className="etc-det">
                <p> €{pretvanzare}</p>
                <p>{idnum}</p>
                <p>{zona}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaApartamente;
