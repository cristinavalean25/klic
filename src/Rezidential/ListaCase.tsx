import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyDetails } from "../types/PropertyDetails";
import "../CssPages/Case.css";

interface ListaCaseProps {
  properties: PropertyDetails[];
  currentPage: number;
  propertiesPerPage: number;
  onPageChange: (page: number) => void;
}

const ListaCase: React.FC<ListaCaseProps> = ({
  properties,
  currentPage,
  propertiesPerPage,
}) => {
  const [validImages, setValidImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadValidImages = async () => {
      const validImagesList: string[] = [];

      for (const property of properties) {
        if (property.images && property.images.length > 0) {
          const isValid = await isValidImage(property.images[0].src);
          if (isValid) {
            validImagesList.push(property.images[0].src);
          }
        }
      }

      setValidImages(validImagesList);
      setLoading(false); // Setăm loading la false când imaginile au fost încărcate
    };

    loadValidImages();
  }, [properties]);

  useEffect(() => {
    // Actualizăm ruta cu numărul paginii curente
    navigate(`?page=${currentPage}`);
  }, [currentPage, history]);

  const isValidImage = async (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  };

  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const propertiesOnCurrentPage = properties.slice(startIndex, endIndex);

  return (
    <div className="lista-case">
      {!loading && (
        <>
          {propertiesOnCurrentPage.map((property, index) => (
            <div
              key={property.idnum}
              className={`property${index === 4 ? " full-width" : ""}`}
            >
              {property.images &&
                property.images.length > 0 &&
                validImages.includes(property.images[0].src) && (
                  <div className="img-container">
                    <img
                      src={property.images[0].src}
                      className="img-casa"
                      alt={property.images[0].alt}
                    />
                  </div>
                )}
              {(!property.images ||
                property.images.length === 0 ||
                !validImages.includes(property.images[0].src)) && (
                <div
                  className="img-container"
                  style={{ height: "400px" }}
                ></div>
              )}
              <p>{property.idnum}</p>
              <p>{property.titlu.ro}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ListaCase;
