import React, { createContext, useEffect, useState, ReactNode } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { PropertyDetails } from "../../types/PropertyDetails";
import { Vila } from "../../types/Vila";

export type PropertyContextType = {
  properties: PropertyDetails[];
  apartments: PropertyDetails[];
  apartmentsForSale: PropertyDetails[];
  houses: Vila[];
  lands: PropertyDetails[];
  loading: boolean;
  error: string | null;
  fetchProperties: () => Promise<void>;
};

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

const agentId = "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
const agentPassword =
  "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
const headers = {
  Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
};

const propertiesPerPage = 500;
const config: AxiosRequestConfig = {
  headers,
  params: { per_page: propertiesPerPage },
};

const fetchPageProperties = async (
  page: number,
  config: AxiosRequestConfig
): Promise<PropertyDetails[]> => {
  const response = await axios.get(`/api/sites/v1/properties`, {
    ...config,
    params: { ...config.params, page },
  });
  return response.data.data;
};

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  const [apartments, setApartments] = useState<PropertyDetails[]>([]);
  const [apartmentsForSale, setApartmentsForSale] = useState<PropertyDetails[]>(
    []
  );
  const [houses, setHouses] = useState<Vila[]>([]);
  const [lands, setLands] = useState<PropertyDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const start = performance.now(); // Start timing

      const {
        data: { last_page: totalPages },
      } = await axios.get(`/api/sites/v1/properties`, config);

      const fetchPromises = Array.from({ length: totalPages }, (_, i) =>
        fetchPageProperties(i + 1, config)
      );
      const results = await Promise.all(fetchPromises);
      const allProperties = results.flat();

      // Log property types to debug filtering
      console.log(
        "Property types:",
        allProperties.map((property) => property.tiplocuinta)
      );

      // Sort properties by idnum in descending order
      allProperties.sort((a, b) => b.idnum - a.idnum);

      setProperties(allProperties);

      // Filter properties by type
      const apartments = allProperties.filter(
        (property) => property.tiplocuinta === "apartament"
      );
      const apartmentsForSale = apartments.filter(
        (property) => property.devanzare === 1
      );
      const houses = allProperties.filter(
        (property) =>
          property.tiplocuinta === "casa" || property.tiplocuinta === "vila"
      );
      const lands = allProperties.filter(
        (property) => property.tiplocuinta === "teren"
      );

      setApartments(apartments);
      setApartmentsForSale(apartmentsForSale);
      setHouses(houses);
      setLands(lands);

      const end = performance.now(); // End timing
      console.log(
        `Time taken to load properties: ${(end - start) / 1000} seconds`
      );
      console.log("All properties: ", allProperties); // Add this log
      console.log("Filtered apartments: ", apartments); // Add this log
      console.log("Filtered apartments for sale: ", apartmentsForSale); // Add this log
      console.log("Filtered houses: ", houses); // Add this log
      console.log("Filtered lands: ", lands); // Add this log
    } catch (err) {
      console.error("Error loading properties", err);
      setError("Error loading properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        apartments,
        apartmentsForSale,
        houses,
        lands,
        loading,
        error,
        fetchProperties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export { PropertyContext };