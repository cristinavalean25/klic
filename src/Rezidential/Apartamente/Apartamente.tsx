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
  const [pageSize] = useState(9);

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
        console.time("Fetching data");
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
        console.log("Total properties:", flattenedProperties.length);
        setProperties(flattenedProperties);
        console.timeEnd("Fetching data");
      } catch (error) {
        console.error("Error while loading data:", error);
      }
    };

    fetchPages();
  }, [pageSize]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProperties = properties.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <Navbar />
      <SearchInput />
      <div className="container-ap">
        <div className="container-ap-80">
          {paginatedProperties.length > 0 ? (
            paginatedProperties.map((property, index) => (
              <div key={property.idnum}>
                <ListaApartamente propertyDetails={property} key={index} />
              </div>
            ))
          ) : (
            <div>No properties to display.</div>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: lastPage }, (_, index) => (
          <button key={index + 1} onClick={() => onPageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Apartamente;
