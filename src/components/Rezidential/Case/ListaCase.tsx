import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import SearchInput from "../../SearchInput";
import "./Case.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRulerCombined, faBed } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { PropertyDetails } from "../../../types/PropertyDetails";

type ListaCaseProps = {
  houses: PropertyDetails[];
  propertiesPerPage: number;
};

const specialIndexes = [6, 11, 16, 21]; // The indexes that should span the full width

const ListaCase: React.FC<ListaCaseProps> = React.memo(
  ({ houses, propertiesPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const totalPages = Math.ceil(houses.length / propertiesPerPage);

    const handlePageChange = useCallback(
      (pageNumber: number) => {
        setCurrentPage(pageNumber);
        navigate(`?page=${pageNumber}`);
      },
      [navigate]
    );

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = houses.slice(
      indexOfFirstProperty,
      indexOfLastProperty
    );

    if (!houses || houses.length === 0) {
      return <div>No houses available for sale</div>;
    }

    return (
      <>
        <Navbar />
        <SearchInput />
        <div className="container-case">
          <div className="houses-grid">
            {currentProperties.map((house, index) => {
              const isFullWidth = specialIndexes.includes(index);
              return (
                <div
                  key={`${house.idnum}-${index}`}
                  className={`house-card ${isFullWidth ? "special-index" : ""}`}
                  onClick={() => navigate(`/house/${house.idnum}`)} // Navigate to details page
                >
                  {isFullWidth ? (
                    <div className="special-container-case">
                      <div className="special-container-details">
                        <h3 className="title-case">
                          {house.titlu?.ro || "No title"}
                        </h3>
                        <div className="detail-item-case">
                          <p className="price">€{house.pretvanzare}</p>
                        </div>
                        <div className="extra-infcase">
                          <div className="detail-item-case">
                            <FontAwesomeIcon
                              icon={faRulerCombined as IconProp}
                            />
                            <span>{house.suprafataconstruita} m²</span>
                          </div>
                          <div className="detail-item-case">
                            <FontAwesomeIcon icon={faBed as IconProp} />
                            <span
                              style={{
                                textTransform: "uppercase",
                                marginLeft: 10,
                              }}
                            >
                              {house.nrcamere} camere
                            </span>
                          </div>
                          <p>P{house.idnum}</p>
                        </div>
                      </div>
                      <div className="special-container-image">
                        {house.images && house.images.length > 0 && (
                          <div className="property-image-case">
                            <img
                              src={house.images[0].src}
                              alt={house.images[0].alt}
                              className="img-ap"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="normal-container-case">
                      <div className="property-image-case">
                        {house.images && house.images[0] && (
                          <img
                            src={house.images[0].src}
                            alt={house.images[0].alt}
                            className="img-ap"
                          />
                        )}
                        <div className="overlay-lista-case">
                          <div className="title-propriety-case">
                            {house.titlu?.ro || "No title"}
                          </div>
                          <div className="etc-det">{house.idnum}</div>
                        </div>
                        <div className="details-case">
                          <h5 className="title-case">
                            {house.titlu?.ro || "No title"}
                          </h5>
                          <div className="extra-info-case">
                            <p className="price">€{house.pretvanzare}</p>
                            <div className="detail-item-case">
                              <FontAwesomeIcon
                                icon={faRulerCombined as IconProp}
                              />
                              <span>{house.suprafataconstruita} m²</span>
                            </div>
                            <div className="detail-item-case">
                              <FontAwesomeIcon icon={faBed as IconProp} />
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  marginLeft: 10,
                                }}
                              >
                                {house.nrcamere} camere
                              </span>
                            </div>
                            <p>P{house.idnum}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </>
    );
  }
);

export default ListaCase;
