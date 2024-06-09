import React from "react";
import { useNavigate } from "react-router-dom";
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

  const { images, titlu, idnum } = propertyDetails || {};

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
            <img src={images[0].src} alt={images[0].alt} className=" img-ap" />
            <div className="overlay-lista-ap always-visible">
              <div className="detalii-zona">
                <h5 className="title-propriety">{titlu.ro}</h5>
              </div>
              <div className="etc-det">
                {/* <div className="basic-info">
                  <p>€{pretvanzare}</p>
                  <p>{zona}</p>
                </div> */}
                {/* <div className="hover-info">
                  <p>{propertyDetails.nrcamere} camere</p>
                  <p>P{idnum}</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaApartamente;
