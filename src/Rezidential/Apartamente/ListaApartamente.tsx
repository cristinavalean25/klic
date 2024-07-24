import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath } from "@fortawesome/free-solid-svg-icons";
import "../../CssPages/ApartamenteDetalii.css";
import { PropertyDetails } from "../../types/PropertyDetails";

interface ListaApartamenteProps {
  propertyDetails: PropertyDetails;
  currentPage: number;
}

const ListaApartamente: React.FC<ListaApartamenteProps> = ({
  propertyDetails,
  currentPage,
}) => {
  const navigate = useNavigate();

  const { images, titlu, idnum, nrcamere, nrbai } = propertyDetails || {};

  const handleClick = () => {
    if (idnum) {
      localStorage.setItem("currentPage", currentPage.toString());
      navigate(`/apartament/${idnum}`); // Ensure this path is consistent
    }
  };

  return (
    <div className="lista-apartamente-item" onClick={handleClick}>
      {images && images.length > 0 && (
        <div className="property-image">
          <div className="image-container-ap">
            <img src={images[0].src} alt={images[0].alt} className="img-ap" />
            <div className="overlay-lista-ap-list always-visible">
              <div className="detalii-zona">
                <h5 className="title-propriety">{titlu.ro}</h5>
              </div>
              <div className="etc-det">
                <div className="icon-details">
                  <FontAwesomeIcon icon={faBed} /> {nrcamere} Camere
                </div>
                <div className="icon-details">
                  <FontAwesomeIcon icon={faBath} /> {nrbai} Bai
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaApartamente;
