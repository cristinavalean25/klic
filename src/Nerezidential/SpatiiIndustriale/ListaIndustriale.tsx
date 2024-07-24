import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyDetails } from "../../types/PropertyDetails";
import "./Industrial.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type ListaIndustrialeProps = {
  industrialSpaces: PropertyDetails[];
  propertiesPerPage: number;
};

const specialIndexes = [6, 11, 16, 21]; // Indexes for full-width items

const ListaIndustriale: React.FC<ListaIndustrialeProps> = ({
  industrialSpaces,
  propertiesPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const totalPages = Math.ceil(industrialSpaces.length / propertiesPerPage);

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      setCurrentPage(pageNumber);
      navigate(`?page=${pageNumber}`);
    },
    [navigate]
  );

  const handleIndustrialClick = useCallback(
    (idnum: number) => {
      navigate(`/industrial/${idnum}`);
    },
    [navigate]
  );

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = industrialSpaces.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  if (!industrialSpaces || industrialSpaces.length === 0) {
    return <div>No industrial spaces available</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container-industrial">
        <div className="industrial-grid">
          {currentProperties.map((property, index) => {
            const isFullWidth = specialIndexes.includes(index);
            return (
              <div
                key={`${property.idnum}-${index}`}
                className={`industrial-card ${
                  isFullWidth ? "special-index" : ""
                }`}
                onClick={() => handleIndustrialClick(property.idnum)}
                style={{ cursor: "pointer" }} // Add cursor pointer for better UX
              >
                {isFullWidth ? (
                  <div className="special-container-industrial">
                    <div className="special-container-details">
                      <h3 className="title-industrial">
                        {property.titlu?.ro || "No title"}
                      </h3>
                      <div className="detail-item-industrial">
                        <p className="price">€{property.pretvanzare}</p>
                      </div>
                      <div className="extra-info-industrial">
                        <p>P{property.idnum}</p>
                      </div>
                    </div>
                    <div className="special-container-image">
                      {property.images && property.images.length > 0 && (
                        <div className="property-image-industrial">
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
                            className="img-industrial"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="normal-container-industrial">
                    <div className="property-image-industrial">
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
                          className="img-industrial"
                        />
                      )}
                      <div className="overlay-lista-industrial">
                        <div className="title-propriety-industrial">
                          {property.titlu?.ro || "No title"}
                        </div>
                        <div className="etc-det">P{property.idnum}</div>
                      </div>
                      <div className="details-industrial">
                        <h5 className="title-industrial">
                          {property.titlu?.ro || "No title"}
                        </h5>
                        <div className="extra-info-industrial">
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
      <Footer />
    </>
  );
};

export default ListaIndustriale;
