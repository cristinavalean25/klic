import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyDetails } from "../../../types/PropertyDetails";
import "../SpatiiComerciale/ListaComerciale.css";
import Navbar from "../../Navbar";
import SearchInput from "../../SearchInput";

interface ListaComercialeProps {
  commercialSpaces: PropertyDetails[];
  propertiesPerPage: number;
}

const specialIndexes = [6, 11, 16, 21]; // Indexes for full-width items

const ListaComerciale: React.FC<ListaComercialeProps> = ({
  commercialSpaces,
  propertiesPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const totalPages = Math.ceil(commercialSpaces.length / propertiesPerPage);

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      setCurrentPage(pageNumber);
      navigate(`?page=${pageNumber}`);
    },
    [navigate]
  );

  const handleCommercialClick = useCallback(
    (idnum: number) => {
      navigate(`/comercial/${idnum}`);
    },
    [navigate]
  );

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = commercialSpaces.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  if (!commercialSpaces || commercialSpaces.length === 0) {
    return <div>No commercial spaces available</div>;
  }

  return (
    <>
      <Navbar />
      <SearchInput />
      <div className="container-comercial">
        <div className="comercial-grid">
          {currentProperties.map((property, index) => {
            const isFullWidth = specialIndexes.includes(index);
            return (
              <div
                key={`${property.idnum}-${index}`}
                className={`comercial-card ${
                  isFullWidth ? "special-index" : ""
                }`}
                onClick={() => handleCommercialClick(property.idnum)}
                style={{ cursor: "pointer" }} // Add cursor pointer for better UX
              >
                {isFullWidth ? (
                  <div className="special-container-comercial">
                    <div className="special-container-details">
                      <h3 className="title-comercial">
                        {property.titlu?.ro || "No title"}
                      </h3>
                      <div className="detail-item-comercial">
                        <p className="price">€{property.pretvanzare}</p>
                      </div>
                      <div className="extra-info-comercial">
                        <p>P{property.idnum}</p>
                      </div>
                    </div>
                    <div className="special-container-image">
                      {property.images && property.images.length > 0 && (
                        <div className="property-image-comercial">
                          <img
                            src={
                              property.imagine_principala ||
                              property.images[0].src
                            }
                            alt={
                              property.imagine_principala
                                ? "Principal"
                                : property.images[0].alt
                            }
                            className="img-comercial"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="normal-container-comercial">
                    <div className="property-image-comercial">
                      {property.images && property.images[0] && (
                        <img
                          src={
                            property.imagine_principala ||
                            property.images[0].src
                          }
                          alt={
                            property.imagine_principala
                              ? "Principal"
                              : property.images[0].alt
                          }
                          className="img-comercial"
                        />
                      )}
                      <div className="overlay-lista-comercial">
                        <div className="title-propriety-comercial">
                          {property.titlu?.ro || "No title"}
                        </div>
                        <div className="etc-det">P{property.idnum}</div>
                      </div>
                      <div className="details-comercial">
                        <h5 className="title-comercial">
                          {property.titlu?.ro || "No title"}
                        </h5>
                        <div className="extra-info-comercial">
                          <p className="price">€{property.pretvanzare}</p>
                          <p>P{property.idnum}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
      </div>
    </>
  );
};

export default ListaComerciale;
