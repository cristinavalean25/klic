import { useEffect, useState } from "react";
import axios from "axios";
import { PropertyDetails } from "../../types/PropertyDetails";

function AllProprieties() {
  const [properties, setProperties] = useState<PropertyDetails[]>([]); // Lista proprietăților
  const [currentPage, setCurrentPage] = useState(1); // Pagina curentă
  const [lastPage, setLastPage] = useState(1); // Ultima pagină disponibilă
  const pageSize = 25; // Numărul de proprietăți per pagină

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
        status: "for_sale",
        tipvanzare: "apartament",
        page: page,
        per_page: pageSize,
      };

      const response = await axios.get("/api/sites/v1/properties", {
        headers,
        params,
      });

      console.log("Numărul total de apartamente:", response.data.total);

      setProperties(response.data.data); // Setează lista de proprietăți
      setLastPage(response.data.last_page); // Setează ultima pagină

      console.timeEnd("Fetching data");
    } catch (error) {
      console.error("Eroare în timpul încărcării datelor:", error);
    }
  };

  useEffect(() => {
    fetchAllData(currentPage); // Încarcă datele pentru pagina curentă
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1); // Trecerea la pagina următoare
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Revenirea la pagina anterioară
    }
  };

  return (
    <div>
      <h1>All Properties</h1>

      {/* Afișarea listei de proprietăți */}
      <ul>
        {properties.map((property, index) => (
          <li key={index}>
            {property.titlu?.ro || "No Title"} - {property.pretvanzare || "N/A"}{" "}
            EUR
          </li>
        ))}
      </ul>

      {/* Navigare între pagini */}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Pagina Anterioară
        </button>
        <span>
          Pagina {currentPage} din {lastPage}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === lastPage}>
          Pagina Următoare
        </button>
      </div>
    </div>
  );
}

export default AllProprieties;
