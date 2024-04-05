import { useEffect, useState } from "react";
import axios from "axios";
import { PropertyDetails } from "../../types/PropertyDetails";
import Navbar from "../../components/Navbar";
import SearchInput from "../../components/SearchInput";
import ListaApartamente from "./ListaApartamente";

function Apartamente() {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0); // indexul de start al proprietăților afișate
  const [currentPage, setCurrentPage] = useState(1); // pagina curentă

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

        console.time("Data loading time");

        const totalPagesResponse = await axios.get("/api/sites/v1/properties", {
          headers,
          params: {
            status: "for_sale",
          },
        });

        const totalPages = totalPagesResponse.data.last_page;
        console.log("Total pages:", totalPages);

        let allProperties: PropertyDetails[] = [];
        for (let i = totalPages; i >= 1; i--) {
          const propertiesOnPage = await fetchPropertiesForPage(i, headers);
          allProperties = [...allProperties, ...propertiesOnPage];
          setProperties(allProperties);
        }

        setLoading(false);

        console.timeEnd("Data loading time");
      } catch (error) {
        console.error("Error while loading data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchPropertiesForPage = async (page: number, headers: any) => {
    try {
      const response = await axios.get("/api/sites/v1/properties", {
        headers,
        params: {
          status: "for_sale",
          page,
        },
      });

      const propertiesOnPage = response.data.data.filter(
        (property: PropertyDetails) => property.tiplocuinta === "apartament"
      );

      console.log(
        "Properties fetched for page",
        page,
        ":",
        propertiesOnPage.length
      );
      return propertiesOnPage;
    } catch (error) {
      console.error(
        "Error while fetching properties for page",
        page,
        ":",
        error
      );
      return [];
    }
  };

  const changePage = (page: number) => {
    setStartIndex(16 * (page - 1));
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <SearchInput />
      <div className="container-ap-80">
        {properties
          .slice(startIndex, startIndex + 16)
          .map((property, index) => (
            <div key={`${property.idnum}-${index}`}>
              <ListaApartamente propertyDetails={property} />
            </div>
          ))}
      </div>
      {loading && <div>Loading...</div>}
      <div className="pagination">
        {Array.from({ length: Math.ceil(properties.length / 16) }, (_, i) => (
          <button
            key={i}
            onClick={() => changePage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Apartamente;
