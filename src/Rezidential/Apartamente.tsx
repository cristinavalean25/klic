import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../CssPages/Apartamente.css";
import ListaApartamente from "./ListaApartamente";
import { PropertyDetails } from "../types/PropertyDetails";
import axios from "axios";
import logo from "../Images/klic-blue.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShower, faBed, faExpand } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "../components/SearchInput";

function Apartamente() {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);

  const [propertiesPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage, 9) : 1;
  });
  const [specialIndex] = useState(4);
  const [, setSpecialContent] = useState<PropertyDetails | null>(null);

  const fetchAllData = async (): Promise<{
    properties: PropertyDetails[];
    firstTenIds: number[];
    lastTenIds: number[];
  }> => {
    try {
      const agentId =
        "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
      const agentPassword =
        "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
      const headers = {
        Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
      };

      console.log("Start fetching all data");
      console.time("Fetching all data");

      let allProperties: PropertyDetails[] = [];
      let currentApiPage = 1;

      while (true) {
        console.log("Fetching data for page:", currentApiPage);

        const response = await axios.get(
          `/api/sites/v1/properties?page=${currentApiPage}&per_page=${propertiesPerPage}&status=for_sale`,
          { headers }
        );

        if (!response.data.data || response.data.data.length === 0) {
          break;
        }

        allProperties = [...allProperties, ...response.data.data];
        currentApiPage++;

        if (!response.data.next_page_url) {
          break;
        }
      }

      console.log("All Properties:", allProperties);

      const apartamenteDeVanzare = allProperties
        .filter((property: PropertyDetails) => {
          return (
            property.tiplocuinta &&
            property.tiplocuinta.toLowerCase() === "apartament" &&
            property.deinchiriat !== 1
          );
        })
        .sort((a: PropertyDetails, b: PropertyDetails) => b.idnum - a.idnum);

      const firstTenIds = apartamenteDeVanzare
        .slice(0, 10)
        .map((property: PropertyDetails) => property.idnum);
      const lastTenIds = apartamenteDeVanzare
        .slice(-10)
        .map((property: PropertyDetails) => property.idnum);

      console.timeEnd("Fetching all data");

      return {
        properties: apartamenteDeVanzare,
        firstTenIds,
        lastTenIds,
      };
    } catch (error) {
      console.error("Error fetching all data:", error);
      return {
        properties: [],
        firstTenIds: [],
        lastTenIds: [],
      };
    }
  };

  useEffect(() => {
    fetchAllData().then(({ properties }) => {
      setProperties(properties);
    });
  }, []);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber.toString());

    const specialIndexForPage = (pageNumber - 1) * propertiesPerPage + 4;
    setSpecialContent(properties[specialIndexForPage]);
  };

  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  return (
    <>
      <Navbar />
      <SearchInput />

      <div className="container-ap">
        <div className="container-ap-80">
          {currentProperties.length > 0 ? (
            currentProperties.map((property, index) => (
              <div
                key={property.idnum}
                className={`property-container-ap ${
                  index === specialIndex ? "custom-width special" : ""
                }`}
              >
                {index === specialIndex ? (
                  <div className="special-content">
                    <div className="text-content">
                      <span>
                        <div className="line-before-title"></div>
                      </span>
                      <p
                        className="title-special"
                        style={{ color: "#fff", textTransform: "uppercase" }}
                      >
                        {property.titlu.ro}
                      </p>
                      <p className="title-zona">{property.zona}</p>

                      <div className="icon-container">
                        <div className="icon-det">
                          <FontAwesomeIcon icon={faShower} className="icon" />
                          <span className="icon-text">{property.nrbai}</span>
                        </div>

                        <div className="icon-det">
                          <FontAwesomeIcon icon={faBed} className="icon" />
                          <span className="icon-text">{property.nrcamere}</span>
                        </div>

                        <div className="icon-det">
                          <FontAwesomeIcon icon={faExpand} className="icon" />
                          <span className="icon-text">
                            {property.suprafatautila}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="image-content">
                      {property.images && property.images.length > 0 && (
                        <img
                          src={property.images[0].src}
                          alt={property.images[0].alt}
                          className="ind-image"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <ListaApartamente propertyDetails={property} />
                )}
              </div>
            ))
          ) : (
            <div>
              <img src={logo} alt="Logo" />
            </div>
          )}
        </div>
      </div>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(properties.length / propertiesPerPage),
        }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Apartamente;
