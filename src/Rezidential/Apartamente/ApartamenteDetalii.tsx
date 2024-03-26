import React, { useEffect, useState } from "react";
import axios from "axios";
import { PropertyDetails } from "../../types/PropertyDetails";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../CssPages/ApartamenteDetalii.css";

interface ApartamenteDetaliiProps {
  propertyIdnum: number;
}

const ApartamenteDetalii: React.FC<ApartamenteDetaliiProps> = ({}) => {
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const { id } = useParams();
  const idnum = id ? parseInt(id) : 0;

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

        const response = await axios.get(`/api/sites/v1/properties/${idnum}`, {
          headers: headers,
        });
        setProperty(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [idnum]);

  return (
    <>
      <Navbar />
      <div className="apDetails">
        <div className="overlayApDetails">
          {property ? (
            <div className="prop-details">
              <h2 className="title-property">{property.titlu?.ro}</h2>
              <h4>€{property.pretvanzare}</h4>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {property && property.images && property.images.length > 0 && (
          <div className="imageContainer">
            <img
              src={property.images[0].src}
              alt=""
              className="img-responsive ap-det-images"
            />
            {/* Display the first image of the property */}
          </div>
        )}
      </div>
    </>
  );
};

export default ApartamenteDetalii;
