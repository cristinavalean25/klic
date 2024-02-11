import { useState, useEffect } from "react";
import axios from "axios";
import { PropertyDetails } from "../types/PropertyDetails";

function Rezidential() {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);

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
        const targetProperties = 12; // Numărul de proprietăți dorite

        // Obținem numărul total de pagini
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

        // Parcurgem paginile de la ultima la prima
        currentPage = totalPages;
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
          } else {
            throw new Error("Failed to fetch properties");
          }

          currentPage--;
        }

        // Selecția ultimilor id-uri
        const lastProperties = allProperties.slice(-targetProperties);
        console.log("Last Properties:", lastProperties);

        setProperties(lastProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Ultimele proprietăți:</h2>
      <ul>
        {properties.map((property) => (
          <li key={property.idnum}>{property.idnum}</li>
        ))}
      </ul>
    </div>
  );
}

export default Rezidential;
