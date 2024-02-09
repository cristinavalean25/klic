import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ListaCase from "./ListaCase";
import axios from "axios";
import { PropertyDetails } from "../types/PropertyDetails";

function Case() {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  const [fetchTime, setFetchTime] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  useEffect(() => {
    const fetchProperties = async () => {
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

        const startTime = performance.now();

        while (true) {
          const response = await axios.get(
            `/api/sites/v1/properties?page=${currentPage}`,
            {
              headers,
            }
          );

          if (response.status === 200) {
            const responseData = response.data;
            const pageProperties: PropertyDetails[] = responseData.data;
            allProperties = [...allProperties, ...pageProperties];

            if (currentPage >= responseData.last_page) {
              break;
            }
          } else {
            throw new Error("Failed to fetch properties");
          }

          currentPage++;
        }

        const endTime = performance.now();
        console.log(
          "Properties fetched in",
          endTime - startTime,
          "milliseconds"
        );
        setFetchTime(endTime - startTime);

        const casaVilaProperties = allProperties.filter(
          (property) =>
            property.tip.toLowerCase().includes("casa") ||
            property.tip.toLowerCase().includes("vila")
        );

        const sortedProperties = casaVilaProperties.sort(
          (a, b) => b.idnum - a.idnum
        );

        setProperties(sortedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />
      <div className="big-container-case">
        <p>Fetching properties took {fetchTime} milliseconds.</p>
        <div className="center-cont">
          <ListaCase
            properties={properties}
            currentPage={currentPage}
            propertiesPerPage={propertiesPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
        <div>
          {Array.from(
            { length: Math.ceil(properties.length / propertiesPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Case;
