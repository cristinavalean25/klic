import { useEffect, useState } from "react";
import axios from "axios";
import { PropertyDetails } from "../../types/PropertyDetails";
import Navbar from "../../components/Navbar";
import SearchInput from "../../components/SearchInput";
import ListaApartamente from "./ListaApartamente";

const fetchPage = async (
  pageNumber: number,
  pageSize: number,
  totalPages: number
): Promise<PropertyDetails[]> => {
  try {
    const agentId =
      "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
    const agentPassword =
      "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
    const headers = {
      Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
    };

    const reversedPageNumber = totalPages - pageNumber + 1; // Inversăm numărul paginii

    const response = await axios.get("/api/sites/v1/properties", {
      headers,
      params: {
        status: "for_sale",
        page: reversedPageNumber,
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

function Apartamente() {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const pageSize = 9;
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

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
            page: 1,
            per_page: pageSize,
          },
        });

        const totalPages = totalPagesResponse.data.last_page;
        setLastPage(totalPages);

        console.timeEnd("Data loading time");

        const initialData = await fetchPage(currentPage, pageSize, totalPages);
        setProperties(initialData);
        setLoading(false);
      } catch (error) {
        console.error("Error while loading data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !loadingMore &&
        currentPage < lastPage
      ) {
        setLoadingMore(true);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, lastPage, loadingMore]);

  useEffect(() => {
    const fetchMoreData = async () => {
      try {
        const moreData = await fetchPage(currentPage, pageSize, lastPage);
        setProperties((prevProperties) => [...prevProperties, ...moreData]);
        setLoadingMore(false);
      } catch (error) {
        console.error("Error while loading more data:", error);
        setLoadingMore(false);
      }
    };

    if (loadingMore && currentPage <= lastPage) {
      fetchMoreData();
    }
  }, [currentPage, lastPage, loadingMore]);

  return (
    <>
      <Navbar />
      <SearchInput />
      <div className="container-ap-80">
        {properties.map((property, index) => (
          <div key={`${property.idnum}-${index}`}>
            {" "}
            {/* Folosim o combinație între idnum și index pentru a asigura unicitatea cheii */}
            <ListaApartamente propertyDetails={property} />
          </div>
        ))}

        {loading && <div>Loading...</div>}
        {loadingMore && <div>Loading more...</div>}
      </div>
    </>
  );
}

export default Apartamente;
