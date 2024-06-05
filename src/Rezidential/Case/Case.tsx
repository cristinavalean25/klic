import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

import { ApiResponse } from "../../types/ApiResponse";
import { PropertyDetails } from "../../types/PropertyDetails";
import Navbar from "../../components/Navbar";

interface AxiosRequestConfigWithPage extends AxiosRequestConfig {
  params: {
    per_page: number;
    page?: number;
  };
}

const Case: React.FC = () => {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const propertiesPerPage = 14;
  const wsUrl = "ws://your-websocket-url"; // Replace with your WebSocket URL

  const fetchAllProperties = async () => {
    const agentId =
      "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
    const agentPassword =
      "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
    const authToken = btoa(`${agentId}:${agentPassword}`);
    const config: AxiosRequestConfigWithPage = {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
      params: {
        per_page: 500,
      },
    };

    const startTime = performance.now();
    const allProperties: PropertyDetails[] = [];

    try {
      setIsLoading(true);

      // Fetch the first page to get the total number of pages
      const initialResponse = await axios.get<ApiResponse>(
        "/api/sites/v1/properties",
        config
      );
      const totalPages = initialResponse.data.last_page;

      // Create an array of promises to fetch all pages in reverse order
      const promises = [];
      for (let page = totalPages; page >= 1; page--) {
        promises.push(
          axios
            .get<ApiResponse>("/api/sites/v1/properties", {
              ...config,
              params: { ...config.params, page },
            })
            .then((response) =>
              response.data.data.filter(
                (property) => property.tip === "casa / vila"
              )
            )
        );
      }

      // Wait for all promises to resolve
      const results = await Promise.all(promises);
      results.forEach((result) => allProperties.push(...result));

      // Sort properties by idnum in descending order
      allProperties.sort((a, b) => b.idnum - a.idnum);

      // Save properties to local storage
      localStorage.setItem("properties", JSON.stringify(allProperties));

      setProperties(allProperties);

      const endTime = performance.now();
      console.log(
        `All properties loaded in ${(endTime - startTime) / 1000} seconds`
      );
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedProperties = localStorage.getItem("properties");
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
      setIsLoading(false);
    } else {
      fetchAllProperties();
    }

    // Set up WebSocket connection
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      const newProperty: PropertyDetails = JSON.parse(event.data);
      setProperties((prevProperties) => {
        const updatedProperties = [newProperty, ...prevProperties];
        updatedProperties.sort((a, b) => b.idnum - a.idnum);
        localStorage.setItem("properties", JSON.stringify(updatedProperties));
        return updatedProperties;
      });
    };

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  // Calculate properties for the current page
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div>
        {currentProperties.map((property) => (
          <div key={property.idnum}>
            <h3>{property.titlu.ro}</h3>
            <p>{property.idnum}</p>
            {/* Render more property details as needed */}
          </div>
        ))}
        <div>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                disabled={pageNumber === currentPage}
              >
                Page {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Case;
