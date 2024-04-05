import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ListaCase from "./ListaCase";
import axios from "axios";
import { PropertyDetails } from "../../types/PropertyDetails";

function Case() {
  const [cases, setCases] = useState<PropertyDetails[]>([]);
  const [fetchTime, setFetchTime] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 9;
  const [loading, setLoading] = useState(true);

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

        const startTime = performance.now(); // Începeți să măsurați timpul de încărcare

        const response = await axios.get("/api/sites/v1/properties", {
          headers,
          params: {
            status: "for_sale",
            page: 1, // Fetch only the first page
            per_page: casesPerPage,
          },
        });

        const endTime = performance.now(); // Terminați măsurarea timpului de încărcare
        setFetchTime(endTime - startTime); // Actualizați starea cu timpul de încărcare

        console.timeEnd("Data loading time");

        const filteredCases = response.data.data.filter(
          (property: PropertyDetails) =>
            property.tip &&
            (property.tip.toLowerCase().includes("casa") ||
              property.tip.toLowerCase().includes("vila"))
        );

        setCases(filteredCases); // Setăm datele filtrate
        setLoading(false); // Oprim indicatorul de încărcare
      } catch (error) {
        console.error("Error while loading data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="big-container-case">
        <p>Fetching cases took {fetchTime} milliseconds.</p>
        <div className="center-cont">
          <ListaCase
            cases={cases}
            currentPage={currentPage}
            casesPerPage={casesPerPage}
            onPageChange={setCurrentPage}
            loading={loading} // Adăugați proprietatea loading aici
          />
        </div>
        <div>
          {Array.from(
            { length: Math.ceil(cases.length / casesPerPage) },
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
