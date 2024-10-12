import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRulerCombined, faBed } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { PropertyDetails } from "../../types/PropertyDetails";
import { Agent } from "../../types/Agent";
import Navbar from "../Navbar";
import SecondDetails from "../Rezidential/Apartamente/SecondDetails";
import AgentInfo from "../Agenti/AgentInfo";
import MapComponent from "../../Maps/MapComponent";
import CaracteristiciAp from "../Rezidential/Apartamente/CaracteristiciAp";
import Footer from "../Footer";

const ApartamenteDeInchiriatDetails: React.FC = () => {
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [urianAgent, setUrianAgent] = useState<Agent | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { id } = useParams();
  const idnum = id ? parseInt(id) : 0;
  const caracteristiciRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const agentId =
          "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
        const agentPassword =
          "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
        const headers = {
          Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
        };

        const propertyResponse = await axios.get(
          `/api/sites/v1/properties/${idnum}`,
          { headers }
        );
        setProperty(propertyResponse.data);

        const agentsResponse = await axios.get("/api/sites/v1/agents", {
          headers,
        });
        const urianAgentData = agentsResponse.data.data.find(
          (agent: Agent) => agent.agentid === 50
        );
        setUrianAgent(urianAgentData);

        console.log("Property:", propertyResponse.data);
        console.log("Urian Agent:", urianAgentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPropertyDetails();
  }, [idnum]);

  const descriptionParagraphs = property?.descriere.ro?.split("\n") || [];

  useEffect(() => {
    console.log("Property zona:", property?.zona);
  }, [property]);

  const buildAddress = (property: PropertyDetails) => {
    const addressParts = [];
    if (property.adresa) addressParts.push(property.adresa);
    if (property.localitate) addressParts.push(property.localitate);
    if (property.judet) addressParts.push(property.judet);
    return addressParts.join(", ");
  };

  const fullAddress = property ? buildAddress(property) : "";

  return (
    <>
      <Navbar />
      <div
        className="apDetails inchiriat"
        style={{
          backgroundImage: `url(${property?.images?.[0]?.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="overlayApDetails inchiriat">
          <div className="line-ap inchiriat"></div>
          {property ? (
            <div className="prop-details inchiriat">
              <p className="category-details inchiriat">
                {property.tiplocuinta}
              </p>
              <h2 className="title-property inchiriat">{property.titlu?.ro}</h2>
              <h4>€{property.pretinchiriere}</h4>
              <div className="additional-details inchiriat">
                <div className="detail-item inchiriat">
                  <FontAwesomeIcon icon={faRulerCombined as IconProp} />
                  <span>{property.suprafataconstruita} m²</span>
                </div>
                <div className="detail-item inchiriat">
                  <FontAwesomeIcon icon={faBed as IconProp} />
                  <span style={{ textTransform: "uppercase" }}>
                    {property.nrcamere} camere
                  </span>
                </div>
                <div className="detail-item inchiriat">
                  <span style={{ textTransform: "uppercase" }}>
                    P{property.idnum}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {property && property.images && property.images.length > 0 && (
          <div className="imageContainerApDetails inchiriat">
            <img
              src={property.images[0].src}
              alt=""
              className="img-responsive ap-det-images inchiriat"
            />
          </div>
        )}
      </div>

      <SecondDetails
        property={property}
        caracteristiciRef={caracteristiciRef}
      />

      <div className="descriere-proprietate inchiriat">
        <div className="container-gol inchiriat"></div>
        <div className="descriere-text inchiriat">
          {descriptionParagraphs
            .slice(0, showFullDescription ? descriptionParagraphs.length : 10)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          {descriptionParagraphs.length > 10 && (
            <button
              className="show-more-button inchiriat"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
        <div className="det-agent inchiriat">
          {urianAgent && (
            <AgentInfo agent={urianAgent} title="Director agenție" />
          )}
          {property?.agent_info && (
            <AgentInfo
              agent={property.agent_info}
              title={property.agent_info.functie.ro}
            />
          )}
        </div>
      </div>

      <div id="caracteristici" ref={caracteristiciRef}>
        <CaracteristiciAp property={property} />
      </div>

      <div className="map-container inchiriat">
        {fullAddress ? (
          <MapComponent address={fullAddress} radius={1000} />
        ) : (
          <div>Loading map...</div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ApartamenteDeInchiriatDetails;
