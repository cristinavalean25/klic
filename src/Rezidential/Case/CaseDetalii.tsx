import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { PropertyDetails } from "../../types/PropertyDetails";
import { Agent } from "../../types/Agent";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRulerCombined, faBed } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "../Case/CaseDetalii.css";
import AgentInfo from "../../Agenti/AgentInfo";
import MapComponent from "../../Maps/MapComponent";
import SecondDetailsCase from "./SecondDetailsCase";
import CaracteristiciCase from "./CaracteristiciCase";
import Footer from "../../components/Footer";

const CaseDetalii: React.FC = () => {
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [urianAgent, setUrianAgent] = useState<Agent | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { id } = useParams<{ id: string }>();
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
      <div className="caseDetalii">
        <div className="overlayCaseDetalii">
          {property ? (
            <div className="prop-details-case">
              <p className="category-details-case">{property.tiplocuinta}</p>
              <h2 className="title-property-case">{property.titlu?.ro}</h2>
              <h4>€{property.pretvanzare}</h4>
              <div className="additional-details-case">
                <div className="detail-item-case">
                  <FontAwesomeIcon icon={faRulerCombined as IconProp} />
                  <span>{property.suprafataconstruita} m²</span>
                </div>
                <div className="detail-item-case">
                  <FontAwesomeIcon icon={faBed as IconProp} />
                  <span style={{ textTransform: "uppercase" }}>
                    {property.nrcamere} camere
                  </span>
                </div>
                <div className="detail-item-case">
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
          <div className="imageContainerCaseDetails">
            <img
              src={property.images[0].src}
              alt=""
              className="img-responsive case-det-images"
            />
          </div>
        )}
      </div>

      <SecondDetailsCase
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

      {property && <CaracteristiciCase property={property} />}

      {fullAddress && (
        <div className="map-container">
          <MapComponent address={fullAddress} radius={1000} />
        </div>
      )}

      <Footer />
    </>
  );
};

export default CaseDetalii;
