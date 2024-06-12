import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { PropertyDetails } from "../../types/PropertyDetails";
import { Agent } from "../../types/Agent";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import SecondDetails from "./SecondDetails";
import "../../CssPages/ApartamenteDetalii.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRulerCombined, faBed } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import CaracteristiciAp from "./CaracteristiciAp";
import MapComponent from "../../Maps/MapComponent";
import LastApartament from "./LastApartament";

const AgentInfo: React.FC<{ agent: Agent; title: string }> = ({
  agent,
  title,
}) => (
  <div className="agent-info">
    <img src={agent.src} alt="Poza agentului" className="poza-agent" />
    <div style={{ width: "200px", gap: 20 }}>
      <h3 style={{ color: "#13205E", fontWeight: "bold" }}>{title}</h3>
      <p className="agent-info-name">Nume: {agent.nume}</p>
      <p className="agent-info-name">
        Email:{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => window.open(`mailto:${agent.email}`)}
        >
          {agent.email}
        </span>
      </p>
      <p className="agent-info-name">
        Telefon:{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => window.open(`tel:${agent.phone}`)}
        >
          {agent.phone}
        </span>
      </p>
    </div>
  </div>
);

const ApartamenteDetalii: React.FC = () => {
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

  return (
    <>
      <Navbar />
      <div className="apDetails">
        <div className="overlayApDetails">
          <div className="line-ap"></div>
          {property ? (
            <div className="prop-details">
              <p className="category-details">{property.tiplocuinta}</p>
              <h2 className="title-property">{property.titlu?.ro}</h2>
              <h4>€{property.pretvanzare}</h4>
              <div className="additional-details">
                <div className="detail-item">
                  <FontAwesomeIcon icon={faRulerCombined as IconProp} />
                  <span>{property.suprafataconstruita} m²</span>
                </div>
                <div className="detail-item">
                  <FontAwesomeIcon icon={faBed as IconProp} />
                  <span style={{ textTransform: "uppercase" }}>
                    {property.nrcamere} camere
                  </span>
                </div>
                <div className="detail-item">
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
          <div className="imageContainerApDetails">
            <img
              src={property.images[0].src}
              alt=""
              className="img-responsive ap-det-images"
            />
          </div>
        )}
      </div>

      <SecondDetails
        property={property}
        caracteristiciRef={caracteristiciRef}
      />

      <div className="descriere-proprietate">
        <div className="container-gol"></div>
        <div className="descriere-text">
          {descriptionParagraphs
            .slice(0, showFullDescription ? descriptionParagraphs.length : 10) // Show 10 paragraphs initially
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          {descriptionParagraphs.length > 10 && ( // Show button if there are more than 10 paragraphs
            <button
              className="show-more-button"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
        <div className="det-agent">
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

      <div className="map-container">
        {property && property.zona ? (
          <MapComponent
            zona={property.zona}
            radius={1000} // Setează raza dorită pentru zonă, de exemplu 1000 metri
          />
        ) : (
          <div>Loading map...</div>
        )}
      </div>

      <div>
        <LastApartament />
      </div>
    </>
  );
};

export default ApartamenteDetalii;
