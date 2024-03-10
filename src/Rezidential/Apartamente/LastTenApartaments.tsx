import { useEffect, useState } from "react";
import { PropertyDetails } from "../../types/PropertyDetails";
import axios from "axios";

function LastTenApartaments() {
  const [lastTenAp, setLastTenAp] = useState<PropertyDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastTenApartments = async () => {
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
        let lastPage = 1;

        if (localStorage.getItem("cachedData")) {
          const cachedData = JSON.parse(
            localStorage.getItem("cachedData") || ""
          );
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

        console.log("lasrt", lastTenAp);

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
        const properties = responses.reduce(
          (acc, response) => acc.concat(response.data.properties),
          []
        );

        setLastTenAp(properties.slice(-10));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching last ten apartments:", error);
        setLoading(false);
      }
    };

    fetchLastTenApartments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {lastTenAp.map((val, index) => (
        <div key={index}>{val.idnum}</div>
      ))}
    </>
  );
}

export default LastTenApartaments;
