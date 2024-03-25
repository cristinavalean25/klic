import { useEffect, useState } from "react";
import axios from "axios";
import { PropertyDetails } from "../types/PropertyDetails";
import Navbar from "../components/Navbar";
import SearchInput from "../components/SearchInput";
import ListaApartamente from "./Apartamente/ListaApartamente";

function Apartamente() {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [pageSize] = useState(9);

  useEffect(() => {
    const fetchAllApartments = async () => {
      try {
        console.time("Fetching data");

        const agentId =
          "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
        const agentPassword =
          "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
        const headers = {
          Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
        };

        let allApartments: PropertyDetails[] = [];

        // Obținem numărul total de pagini disponibile
        const totalPagesResponse = await axios.get("/api/sites/v1/properties", {
          headers,
          params: {
            status: "for_sale",
            page: 1,
            per_page: 1, // Vom obține doar informații despre paginare, astfel încât să folosim doar o singură proprietate pe pagină
          },
        });

        const totalPages = totalPagesResponse.data.last_page;
        setLastPage(totalPages);

        // Iterăm prin fiecare pagină și obținem doar apartamentele
        for (let page = 1; page <= totalPages; page++) {
          const pageResponse = await axios.get("/api/sites/v1/properties", {
            headers,
            params: {
              status: "for_sale",
              page: page,
              per_page: pageSize,
            },
          });

          // Filtrăm doar apartamentele și le adăugăm la lista totală
          const apartmentsFromPage = pageResponse.data.data.filter(
            (property: PropertyDetails) => property.tiplocuinta === "apartament"
          );
          allApartments = [...allApartments, ...apartmentsFromPage];

          // Dacă am obținut suficiente apartamente, putem ieși din buclă
          if (allApartments.length >= pageSize * currentPage) {
            break;
          }
        }

        // Extragem numărul dorit de apartamente pentru pagina curentă
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pageApartments = allApartments.slice(startIndex, endIndex);

        setProperties(pageApartments);

        console.timeEnd("Fetching data");
      } catch (error) {
        console.error("Error while loading data:", error);
      }
    };

    fetchAllApartments();
  }, [currentPage, pageSize]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <SearchInput />
      <div className="container-ap">
        <div className="container-ap-80">
          {properties.length > 0 ? (
            properties.map((property, index) => (
              <div key={property.idnum}>
                <ListaApartamente propertyDetails={property} key={index} />
              </div>
            ))
          ) : (
            <div>{/* Afisează un mesaj sau o animație de încărcare */}</div>
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
