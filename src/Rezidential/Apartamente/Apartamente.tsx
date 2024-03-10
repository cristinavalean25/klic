import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../CssPages/Apartamente.css";
import ListaApartamente from "./ListaApartamente";
import { PropertyDetails } from "../../types/PropertyDetails";
import axios from "axios";
import logo from "../../Images/klic-blue.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShower, faBed, faExpand } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "../../components/SearchInput";

function Apartamente() {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  const [specialIndex] = useState(4);
  const sortedProperties = properties.slice().sort((a, b) => b.idnum - a.idnum);

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
      let currentPage = 1;
      let lastPage = 1;

      if (localStorage.getItem("cachedData")) {
        const cachedData = JSON.parse(localStorage.getItem("cachedData") || "");
        allProperties = cachedData.properties;
        currentPage = cachedData.currentPage;
        lastPage = cachedData.lastPage;
      } else {
        const firstPageResponse = await axios.get(
          `/api/sites/v1/properties?page=${currentPage}&per_page=25&status=for_sale&tipvanzare=apartament`,
          { headers }
        );

        if (firstPageResponse.data && firstPageResponse.data.last_page) {
          lastPage = firstPageResponse.data.last_page;
        }
      }

      const requests = [];
      for (let page = currentPage; page <= lastPage; page++) {
        if (!localStorage.getItem(`page_${page}`)) {
          requests.push(
            axios.get(
              `/api/sites/v1/properties?page=${page}&per_page=25&status=for_sale&tipvanzare=apartament`,
              { headers }
            )
          );
        }
      }

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        if (response.data && response.data.data) {
          const propertiesOnPage = response.data.data.filter(
            (property: PropertyDetails) => {
              return (
                property.tiplocuinta &&
                property.tiplocuinta.toLowerCase() === "apartament" &&
                property.deinchiriat !== 1
              );
            }
          );
          allProperties = allProperties.concat(propertiesOnPage);

          localStorage.setItem(
            `page_${response.data.current_page}`,
            JSON.stringify(response.data)
          );
        } else {
          console.error(
            "Răspunsul de la server nu conține date valide:",
            response
          );
        }
      });

      console.timeEnd("Fetching all data");

      console.log(
        "Numărul total de apartamente de vânzare:",
        allProperties.length
      );
      console.log(
        "Conținutul din localStorage:",
        localStorage.getItem("cachedData")
      );

      const firstTenIds = allProperties
        .slice(0, 10)
        .map((property: PropertyDetails) => property.idnum);
      const lastTenIds = allProperties
        .slice(-10)
        .map((property: PropertyDetails) => property.idnum);

      localStorage.setItem(
        "cachedData",
        JSON.stringify({
          properties: allProperties,
          currentPage,
          lastPage,
        })
      );

      localStorage.clear();

      return {
        properties: allProperties,
        firstTenIds,
        lastTenIds,
      };
    } catch (error) {
      console.error("Eroare în timpul încărcării datelor:", error);
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

  return (
    <>
      <Navbar />
      <SearchInput />

      <div className="container-ap">
        <div className="container-ap-80">
          {sortedProperties.length > 0 ? (
            sortedProperties.map((property, index) => (
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
    </>
  );
}

export default Apartamente;
