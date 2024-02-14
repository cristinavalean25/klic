import { useState, useEffect } from "react";
import axios from "axios";
import { PropertyDetails } from "../types/PropertyDetails";
import "../CssPages/Rezidential.css";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShower, faBed, faExpand } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Rezidential() {
  const [apartamente, setApartamente] = useState<PropertyDetails[]>([]);
  const [caseDeVanzare, setCaseDeVanzare] = useState<PropertyDetails[]>([]);
  const [apartamenteInchiriat, setApartamenteInchiriat] = useState<
    PropertyDetails[]
  >([]);
  const [loadingTime, setLoadingTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const agentId =
          "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
        const agentPassword =
          "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
        const headers = {
          Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
        };

        let allProperties: PropertyDetails[] = [];
        let currentPage = 1;
        let totalPages = 1;
        const targetProperties = 37;

        const startTime = performance.now();

        const responseFirstPage = await axios.get("/api/sites/v1/properties", {
          params: {
            page: currentPage,
          },
          headers,
        });

        if (responseFirstPage.status === 200) {
          totalPages = responseFirstPage.data.last_page;
        } else {
          throw new Error("Failed to fetch properties");
        }

        currentPage = totalPages - 1;

        while (allProperties.length < targetProperties && currentPage >= 1) {
          const response = await axios.get("/api/sites/v1/properties", {
            params: {
              page: currentPage,
            },
            headers,
          });

          if (response.status === 200) {
            const currentPageProperties: PropertyDetails[] = response.data.data;
            allProperties = allProperties.concat(currentPageProperties);

            if (allProperties.length >= targetProperties) {
              break;
            }
          } else {
            throw new Error("Failed to fetch properties");
          }

          currentPage--;
        }

        const endTime = performance.now();

        const loadingTimeInMilliseconds = endTime - startTime;
        setLoadingTime(loadingTimeInMilliseconds);

        const lastApartamente = allProperties
          .filter((property: PropertyDetails) => {
            return (
              property.tiplocuinta &&
              property.tiplocuinta.toLowerCase() === "apartament" &&
              property.devanzare === 1
            );
          })
          .slice(-9);

        const lastCasaVilaProperties = allProperties
          .filter(
            (property) =>
              property.tip.toLowerCase().includes("casa") ||
              property.tip.toLowerCase().includes("vila")
          )
          .slice(-9);

        const lastApartamenteInchiriat = allProperties
          .filter((property: PropertyDetails) => {
            return (
              property.tiplocuinta &&
              property.tiplocuinta.toLowerCase() === "apartament" &&
              property.deinchiriat === 1
            );
          })
          .slice(-9);

        console.log(
          "Number of properties after page",
          currentPage,
          ":",
          allProperties.length
        );
        console.log("Filtered apartments for sale:", lastApartamente);

        setApartamente(lastApartamente);
        setCaseDeVanzare(lastCasaVilaProperties);
        setApartamenteInchiriat(lastApartamenteInchiriat);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="rezidential-container">
        <div className="rez-2">
          {/*Ultimele 10 apartamente de vanzare*/}
          <Link to="/Apartamente">
            <h2>Ultimele apartamente: </h2>
          </Link>
          <div className="property-container">
            {apartamente.map((apartament, index) => (
              <div
                key={apartament.idnum}
                className={`property-item ${
                  index === 4 ? "property-item-full" : ""
                }`}
              >
                <div className="property-details">
                  <div
                    className={
                      index === 4
                        ? "overlay-rezidential overlay-rezidential-row"
                        : "overlay-rezidential"
                    }
                  >
                    <div
                      className={`property-title ${
                        index === 4 ? "large-title" : ""
                      }`}
                    >
                      <h4 className="title-5-idnum">
                        {" "}
                        {apartament.titlu && apartament.titlu.ro}
                      </h4>
                    </div>
                  </div>
                  <img
                    src={
                      apartament.images && apartament.images.length > 0
                        ? apartament.images[0].src
                        : ""
                    }
                    alt={
                      apartament.images && apartament.images.length > 0
                        ? apartament.images[0].alt
                        : ""
                    }
                    className="rezidential-img"
                  />
                </div>
                {index === 4 && (
                  <div className="additional-div">
                    <h3>{apartament.titlu && apartament.titlu.ro}</h3>
                    <div className="aditional-div-2">
                      <div className="column-div">
                        <FontAwesomeIcon icon={faBed} />
                        <p>{apartament.nrcamere}</p>
                      </div>

                      <div className="column-div">
                        <FontAwesomeIcon icon={faShower} />
                        <p>{apartament.nrbai}</p>
                      </div>

                      <div className="column-div">
                        <FontAwesomeIcon icon={faExpand} />
                        <p>{apartament.suprafatautila}mp</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-between-properties"></div>

          {/*Ultimele 10 case de vanzare*/}

          <Link to="/Case">
            <h2>Ultimele case de vânzare:</h2>
          </Link>
          <div className="property-container">
            {caseDeVanzare.map((casa, index) => (
              <div
                key={casa.idnum}
                className={`property-item ${
                  index === 4 ? "property-item-full" : ""
                }`}
              >
                <div className="property-details">
                  <div
                    className={
                      index === 4
                        ? "overlay-rezidential overlay-rezidential-row"
                        : "overlay-rezidential"
                    }
                  >
                    <div
                      className={`property-title ${
                        index === 4 ? "large-title" : ""
                      }`}
                    >
                      <h4 className="title-5-idnum">
                        {" "}
                        {casa.titlu && casa.titlu.ro}
                      </h4>
                    </div>
                    <div className="icon-container">
                      <FontAwesomeIcon icon={faBed} className="overlay-icon" />
                    </div>
                  </div>
                  <img
                    src={
                      casa.images && casa.images.length > 0
                        ? casa.images[0].src
                        : ""
                    }
                    alt={
                      casa.images && casa.images.length > 0
                        ? casa.images[0].alt
                        : ""
                    }
                    className="rezidential-img"
                  />
                </div>
                {index === 4 && (
                  <div className="additional-div">
                    <h3>{casa.titlu && casa.titlu.ro}</h3>
                    <div className="aditional-div-2">
                      <div className="column-div">
                        <FontAwesomeIcon icon={faBed} />
                        <p>{casa.nrcamere}</p>
                      </div>

                      <div className="column-div">
                        <FontAwesomeIcon icon={faShower} />
                        <p>{casa.nrbai}</p>
                      </div>

                      <div className="column-div">
                        <FontAwesomeIcon icon={faExpand} />
                        <p>{casa.suprafatautila}mp</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-between-properties"></div>

          {/*Ultimele 10 apartamente de inchiriat */}

          <div className="property-container">
            {apartamenteInchiriat.map((apInchiriat, index) => (
              <div key={index} className="property-details">
                <img
                  src={
                    apInchiriat.images && apInchiriat.images.length > 0
                      ? apInchiriat.images[0].src
                      : ""
                  }
                  alt="img-inch"
                  className="rezidential-img"
                />
              </div>
            ))}
          </div>

          {loadingTime !== null && (
            <p>Timpul de încărcare: {loadingTime.toFixed(2)} milisecunde</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Rezidential;
