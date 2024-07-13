import React, { createContext, useEffect, useState, ReactNode } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { PropertyDetails } from "../../types/PropertyDetails";

export type PropertyContextType = {
  properties: PropertyDetails[];
  apartments: PropertyDetails[];
  apartmentsForSale: PropertyDetails[];
  houses: PropertyDetails[];
  lands: PropertyDetails[];
  loading: boolean;
  error: string | null;
  totalProperties: number;
  fetchProperties: () => Promise<void>;
  lastApartment: PropertyDetails | null;
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

const propertiesPerPage = 50; // Reduced number of properties per page for optimization
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
  console.log(`Fetching page ${page}:`, response.data.data);
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
  const [houses, setHouses] = useState<PropertyDetails[]>([]);
  const [lands, setLands] = useState<PropertyDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const [lastApartment, setLastApartment] = useState<PropertyDetails | null>(
    null
  );

  const fetchProperties = async () => {
    const start = performance.now();
    try {
      setLoading(true);
      setError(null);

      const {
        data: { last_page: totalPages, total },
      } = await axios.get(`/api/sites/v1/properties`, config);
      setTotalProperties(total);

      const promises = [];
      for (let page = 1; page <= totalPages; page++) {
        promises.push(fetchPageProperties(page, config));
      }

      const allProperties = (await Promise.all(promises)).flat();

      const sortedProperties = allProperties.sort((a, b) => b.idnum - a.idnum);

      console.log("All fetched properties: ", sortedProperties);

      const filteredApartments = sortedProperties.filter(
        (property) =>
          property.tip?.toLowerCase() === "apartament" &&
          property.devanzare !== 1
      );
      const filteredHouses = sortedProperties.filter(
        (property) =>
          (property.tip?.toLowerCase() === "casa / vila" ||
            property.tip?.toLowerCase() === "vila") &&
          property.devanzare === 1
      );
      const filteredLands = sortedProperties.filter(
        (property) =>
          property.tip?.toLowerCase() === "teren" && property.devanzare === 1
      );

      const lastApartment = sortedProperties.find(
        (property) => property.tip?.toLowerCase() === "apartament"
      );

      setProperties(sortedProperties);
      setApartments(filteredApartments);
      setApartmentsForSale(
        filteredApartments.filter((property) => property.devanzare === 1)
      );
      setHouses(filteredHouses);
      setLands(filteredLands);
      setLastApartment(lastApartment || null);

      console.log("Total Properties:", sortedProperties.length);
      console.log("Filtered Apartments:", filteredApartments.length);
      console.log("Filtered Houses:", filteredHouses.length);
      console.log("Filtered Lands:", filteredLands.length);
    } catch (err) {
      console.error("Error loading properties", err);
      setError("Error loading properties");
    } finally {
      const end = performance.now();
      setLoading(false);
      console.log(
        `Time taken to load properties: ${(end - start) / 1000} seconds`
      );
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
        totalProperties,
        fetchProperties,
        lastApartment,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export { PropertyContext };
