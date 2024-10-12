import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyDetails } from "../../../types/PropertyDetails";
import "../Terenuri/ListaTerenuri.css";
import Navbar from "../../Navbar";
import SearchInput from "../../SearchInput";

interface ListaTerenuriProps {
  lands: PropertyDetails[];
  propertiesPerPage: number;
}

const specialIndexes = [6, 11, 16, 21]; // Indexurile care ar trebui să se întindă pe toată lățimea

const ListaTerenuri: React.FC<ListaTerenuriProps> = ({
  lands,
  propertiesPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const totalPages = Math.ceil(lands.length / propertiesPerPage);

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      setCurrentPage(pageNumber);
      navigate(`?page=${pageNumber}`);
    },
    [navigate]
  );

  const handleLandClick = useCallback(
    (idnum: number) => {
      navigate(`/teren/${idnum}`);
    },
    [navigate]
  );

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = lands.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  if (!lands || lands.length === 0) {
    return <div>No lands available</div>;
  }

  return (
    <>
      <Navbar />
      <SearchInput />
      <div className="container-teren">
        <div className="lands-grid">
          {currentProperties.map((land, index) => {
            const isFullWidth = specialIndexes.includes(index);
            return (
              <div
                key={`${land.idnum}-${index}`}
                className={`land-card ${isFullWidth ? "special-index" : ""}`}
                onClick={() => handleLandClick(land.idnum)}
                style={{ cursor: "pointer" }} // Add cursor pointer for better UX
              >
                {isFullWidth ? (
                  <div className="special-container-teren">
                    <div className="special-container-details">
                      <h3 className="title-teren">
                        {land.titlu?.ro || "No title"}
                      </h3>
                      <div className="detail-item-teren">
                        <p className="price">€{land.pretvanzare}</p>
                      </div>
                      <div className="extra-info-teren">
                        <p>P{land.idnum}</p>
                      </div>
                    </div>
                    <div className="special-container-image">
                      {land.images && land.images.length > 0 && (
                        <div className="property-image-teren">
                          <img
                            src={land.imagine_principala || land.images[0].src}
                            alt={
                              land.imagine_principala
                                ? "Principal"
                                : land.images[0].alt
                            }
                            className="img-teren"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="normal-container-teren">
                    <div className="property-image-teren">
                      {land.images && land.images[0] && (
                        <img
                          src={land.imagine_principala || land.images[0].src}
                          alt={
                            land.imagine_principala
                              ? "Principal"
                              : land.images[0].alt
                          }
                          className="img-teren"
                        />
                      )}
                      <div className="overlay-lista-teren">
                        <div className="title-propriety-teren">
                          {land.titlu?.ro || "No title"}
                        </div>
                        <div className="etc-det">P{land.idnum}</div>
                      </div>
                      <div className="details-teren">
                        <h5 className="title-teren">
                          {land.titlu?.ro || "No title"}
                        </h5>
                        <div className="extra-info-teren">
                          <p className="price">€{land.pretvanzare}</p>
                          <p>P{land.idnum}</p>
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

export default ListaTerenuri;
