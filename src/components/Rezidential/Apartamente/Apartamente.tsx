import React, { useState } from "react";
import Navbar from "../../Navbar";
import SearchInput from "../../SearchInput";
import ListaApartamente from "./ListaApartamente";
import "../../../CssPages/Apartamente.css";
import "../../../CssPages/ApartamenteDetalii.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRulerCombined, faBed } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { PropertyDetails } from "../../../types/PropertyDetails";
import { usePropertyContext } from "../../context/usePropertyContext";

const Apartamente: React.FC = () => {
  const navigate = useNavigate();
  const { properties, loading, error } = usePropertyContext();

  const [currentPage, setCurrentPage] = useState<number>(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const changePage = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (properties.length === 0) {
    return <div>No properties available</div>;
  }

  const apartments = properties.filter(
    (property: PropertyDetails) => property.tiplocuinta === "apartament"
  );

  // Sort properties in descending order by ID
  const sortedProperties = [...apartments].sort((a, b) => b.idnum - a.idnum);

  // Update the number of properties per page to 24
  const propertiesPerPage = 24;
  const totalPages = Math.ceil(sortedProperties.length / propertiesPerPage);

  const specialIndexes = [6, 11, 16, 21];

  return (
    <>
      <Navbar />
      <SearchInput />
      <div className="container">
        {sortedProperties
          .slice(
            (currentPage - 1) * propertiesPerPage,
            currentPage * propertiesPerPage
          )
          .map((property, index) => {
            const isFullWidth = specialIndexes.includes(index);
            return (
              <div
                key={`${property.idnum}-${index}`}
                className={`lista-apartamente-item ${
                  isFullWidth ? "special-index" : ""
                }`}
                onClick={
                  () => navigate(`/apartament/${property.idnum}`) // Ensure this path is consistent
                } // Add click event for redirection
              >
                {isFullWidth ? (
                  <div className="special-container">
                    <div className="details">
                      <h5 className="title">{property.titlu.ro}</h5>

                      <div className="detail-item">
                        <p className="price">€{property.pretvanzare}</p>
                      </div>
                      <div className="extra-info">
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faRulerCombined as IconProp} />
                          <span>{property.suprafataconstruita} m²</span>
                        </div>

                        <div className="detail-item">
                          <FontAwesomeIcon icon={faBed as IconProp} />
                          <span
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 10,
                            }}
                          >
                            {property.nrcamere} camere
                          </span>
                        </div>

                        <p>P {property.idnum}</p>

                        <div className="detail-item"></div>
                      </div>
                    </div>
                    <div className="image-container">
                      {property.images && property.images.length > 0 && (
                        <div className="property-image">
                          <img
                            src={property.images[0].src}
                            alt={property.images[0].alt}
                            className="img-ap"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <ListaApartamente
                    propertyDetails={property}
                    currentPage={currentPage}
                  />
                )}
              </div>
            );
          })}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => changePage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Apartamente;
