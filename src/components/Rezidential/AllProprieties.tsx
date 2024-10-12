import { useEffect, useState } from "react";
import axios from "axios";
import { PropertyDetails } from "../../types/PropertyDetails";

function AllProprieties() {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const pageSize = 25; // Numărul de apartamente pe pagină în interfața de utilizator

  const fetchAllData = async (page: number) => {
    try {
      console.time("Fetching data");

      const agentId =
        "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
      const agentPassword =
        "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
      const headers = {
        Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
      };

      const params = {
        status: "for_sale", // Doar apartamentele de vânzare
        tipvanzare: "apartament",
        page: page,
        per_page: pageSize, // Numărul fix de apartamente pe pagină
      };

      const response = await axios.get("/api/sites/v1/properties", {
        headers,
        params,
      });

      console.log("Numărul total de apartamente:", response.data.total);

      setProperties(response.data.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);

      console.timeEnd("Fetching data");
    } catch (error) {
      console.error("Eroare în timpul încărcării datelor:", error);
    }
  };

  const onPageChange = (page: number) => {
    fetchAllData(page);
  };

  useEffect(() => {
    fetchAllData(currentPage);
  }, []);

  return <div>AllProprieties</div>;
}

export default AllProprieties;
