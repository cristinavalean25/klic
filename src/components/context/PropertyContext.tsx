import React, { createContext, useEffect, useState, ReactNode } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { PropertyDetails } from "../../types/PropertyDetails";

export type PropertyContextType = {
  properties: PropertyDetails[];
  apartments: PropertyDetails[];
  apartmentsForSale: PropertyDetails[];
  houses: PropertyDetails[];
  lands: PropertyDetails[];
  commercialSpaces: PropertyDetails[];
  industrialSpaces: PropertyDetails[];
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

const LOCAL_STORAGE_KEY = "propertyData";
const TIMESTAMP_KEY = "propertyDataTimestamp";

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
  const [commercialSpaces, setCommercialSpaces] = useState<PropertyDetails[]>(
    []
  );
  const [industrialSpaces, setIndustrialSpaces] = useState<PropertyDetails[]>(
    []
  ); // Ensure default empty array
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

      const filteredCommercialSpaces = sortedProperties.filter(
        (property) =>
          property.tip?.toLowerCase() === "spatiu comercial" &&
          property.devanzare === 1
      );

      const filteredIndustrialSpaces = sortedProperties.filter(
        (property) =>
          property.tip?.toLowerCase() === "spatiu industrial" &&
          property.devanzare === 1
      );

      console.log(
        "Filtered Commercial Spaces:",
        filteredCommercialSpaces.length
      );

      console.log(
        "Filtered Industrial Spaces:",
        filteredIndustrialSpaces.length
      );

      const lastApartment = sortedProperties.find(
        (property) => property.tip?.toLowerCase() === "apartament"
      );

      // Save data to local storage
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          properties: sortedProperties,
          apartments: filteredApartments,
          apartmentsForSale: filteredApartments.filter(
            (property) => property.devanzare === 1
          ),
          houses: filteredHouses,
          lands: filteredLands,
          commercialSpaces: filteredCommercialSpaces,
          industrialSpaces: filteredIndustrialSpaces,
          lastApartment: lastApartment || null,
          totalProperties: sortedProperties.length,
        })
      );
      // Save timestamp to local storage
      localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());

      setProperties(sortedProperties);
      setApartments(filteredApartments);
      setApartmentsForSale(
        filteredApartments.filter((property) => property.devanzare === 1)
      );
      setHouses(filteredHouses);
      setLands(filteredLands);
      setCommercialSpaces(filteredCommercialSpaces);
      setIndustrialSpaces(filteredIndustrialSpaces);
      setLastApartment(lastApartment || null);

      // console.log("Total Properties:", sortedProperties.length);
      // console.log("Filtered Apartments:", filteredApartments.length);
      // console.log("Filtered Houses:", filteredHouses.length);
      // console.log("Filtered Lands:", filteredLands.length);
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
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedTimestamp = localStorage.getItem(TIMESTAMP_KEY);
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

    if (storedData && storedTimestamp) {
      const timestamp = parseInt(storedTimestamp, 10);
      const now = Date.now();

      if (now - timestamp < oneDay) {
        const {
          properties,
          apartments,
          apartmentsForSale,
          houses,
          lands,
          commercialSpaces,
          industrialSpaces,
          lastApartment,
          totalProperties,
        } = JSON.parse(storedData);

        setProperties(properties);
        setApartments(apartments);
        setApartmentsForSale(apartmentsForSale);
        setHouses(houses);
        setLands(lands);
        setCommercialSpaces(commercialSpaces);
        setIndustrialSpaces(industrialSpaces);
        setLastApartment(lastApartment);
        setTotalProperties(totalProperties);
      } else {
        fetchProperties();
      }
    } else {
      fetchProperties();
    }
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        apartments,
        apartmentsForSale,
        houses,
        lands,
        commercialSpaces,
        industrialSpaces, // Add industrial spaces to context provider
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
