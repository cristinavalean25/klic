import { useEffect, useState } from "react";
import axios from "axios";
import { PropertyDetails } from "../../types/PropertyDetails";
import Navbar from "../../components/Navbar";
import SearchInput from "../../components/SearchInput";
import ListaApartamente from "./ListaApartamente";

function Apartamente() {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const pageSize = 9;
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const fetchPage = async (pageNumber: number) => {
      try {
        const agentId =
          "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
        const agentPassword =
          "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
        const headers = {
          Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
        };

        const response = await axios.get("/api/sites/v1/properties", {
          headers,
          params: {
            status: "for_sale",
            page: pageNumber,
            per_page: pageSize,
          },
        });

        return response.data.data.filter(
          (property: PropertyDetails) => property.tiplocuinta === "apartament"
        );
      } catch (error) {
        console.error("Error while loading data:", error);
        return [];
      }
    };

    const fetchPages = async () => {
      try {
        const agentId =
          "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
        const agentPassword =
          "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
        const headers = {
          Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
        };

        const totalPagesResponse = await axios.get("/api/sites/v1/properties", {
          headers,
          params: {
            status: "for_sale",
            page: 1,
            per_page: pageSize,
          },
        });

        const totalPages = totalPagesResponse.data.last_page;
        setLastPage(totalPages);

        const pagesData = await Promise.all(
          Array.from({ length: totalPages }, (_, index) =>
            fetchPage(totalPages - index)
          )
        );

        const flattenedProperties = pagesData.flat();
        setProperties(flattenedProperties);
        setLoading(false); // Setam starea de încărcare ca fiind finalizată
      } catch (error) {
        console.error("Error while loading data:", error);
        setLoading(false); // În caz de eroare, oprim indicatorul de încărcare
      }
    };

    fetchPages();
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goBack = async () => {
    setWaiting(true);
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Așteptăm 10 secunde
    setWaiting(false);
  };

  // Calculăm indexul de început și sfârșit pentru paginare
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, properties.length);

  return (
    <>
      <Navbar />
      <SearchInput />
      <div className="container-ap">
        <div className="container-ap-80">
          {waiting ? (
            <div>Waiting...</div>
          ) : loading ? (
            <div>Loading...</div>
          ) : (
            properties.slice(startIndex, endIndex).map((property, index) => (
              <div key={property.idnum}>
                <ListaApartamente propertyDetails={property} key={index} />
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <button onClick={goBack} disabled={waiting}>
          Go Back
        </button>
        {Array.from({ length: lastPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            disabled={loading}
            style={{
              fontWeight: currentPage === index + 1 ? "bold" : "normal",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Apartamente;
