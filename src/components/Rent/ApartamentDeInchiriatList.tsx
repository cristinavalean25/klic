import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../Rent/ApartamenteDeInchiriat.css";
import { PropertyDetails } from "../../types/PropertyDetails";
import Navbar from "../Navbar";
import SearchInput from "../SearchInput";

interface ListaApartamenteDeInchiriatProps {
  apartments: PropertyDetails[];
  propertiesPerPage: number;
}

const specialIndexes = [6, 11, 16, 21]; // Indexes for special full-width items

const ListaApartamenteDeInchiriat: React.FC<
  ListaApartamenteDeInchiriatProps
> = ({ apartments, propertiesPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const totalPages = Math.ceil(apartments.length / propertiesPerPage);

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      setCurrentPage(pageNumber);
      navigate(`?page=${pageNumber}`);
    },
    [navigate]
  );

  const handleApartmentClick = useCallback(
    (idnum: number) => {
      navigate(`/apartament/${idnum}`);
    },
    [navigate]
  );

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = apartments.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  if (!apartments || apartments.length === 0) {
    return <div>No apartments available</div>;
  }

  return (
    <>
      <Navbar />
      <SearchInput />
      <div className="container-ap-inchiriat">
        <div className="apartments-grid">
          {currentProperties.map((apartment, index) => {
            const isFullWidth = specialIndexes.includes(index);
            return (
              <div
                key={`${apartment.idnum}-${index}`}
                className={`apartment-card ${
                  isFullWidth ? "special-index" : ""
                }`}
                onClick={() => handleApartmentClick(apartment.idnum)}
                style={{ cursor: "pointer" }} // Add cursor pointer for better UX
              >
                {isFullWidth ? (
                  <div className="special-container-ap-inchiriat">
                    <div className="special-container-details-ap-inchiriat">
                      <h3 className="title-ap-inchiriat">
                        {apartment.titlu?.ro || "No title"}
                      </h3>
                      <div className="detail-item-ap-inchiriat">
                        <p className="price">€{apartment.pretinchiriere}</p>
                      </div>
                      <div className="extra-info-ap-inchiriat">
                        <p>P{apartment.idnum}</p>
                      </div>
                    </div>
                    <div className="special-container-image-ap-inchiriat">
                      {apartment.images && apartment.images.length > 0 && (
                        <div className="property-image-ap-inchiriat">
                          <img
                            src={
                              apartment.imagine_principala ||
                              apartment.images[0].src
                            }
                            alt={
                              apartment.imagine_principala
                                ? "Principal"
                                : apartment.images[0].alt
                            }
                            className="img-ap-inchiriat"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="normal-container-ap-inchiriat">
                    <div className="property-image-ap-inchiriat">
                      {apartment.images && apartment.images[0] && (
                        <img
                          src={
                            apartment.imagine_principala ||
                            apartment.images[0].src
                          }
                          alt={
                            apartment.imagine_principala
                              ? "Principal"
                              : apartment.images[0].alt
                          }
                          className="img-ap-inchiriat"
                        />
                      )}
                      <div className="overlay-lista-ap-inchiriat">
                        <div className="title-propriety-ap-inchiriat">
                          {apartment.titlu?.ro || "No title"}
                        </div>
                        <div className="etc-det-ap-inchiriat">
                          P{apartment.idnum}
                        </div>
                      </div>
                      <div className="details-ap-inchiriat">
                        <h5 className="title-ap-inchiriat">
                          {apartment.titlu?.ro || "No title"}
                        </h5>
                        <div className="extra-info-ap-inchiriat">
                          <p className="price">€{apartment.pretinchiriere}</p>
                          <p>P{apartment.idnum}</p>
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

export default ListaApartamenteDeInchiriat;
