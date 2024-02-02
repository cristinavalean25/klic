import axios from "axios";
import { useEffect, useState } from "react";
import Proprietate from "./Proprietate";
import { PropertyDetails } from "../types/PropertyDetails";

export default function Properties() {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);

  // useEffect(() => {
  //   const fetchProperties = async () => {
  //     const agentId =
  //       "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
  //     const agentPassword =
  //       "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
  //     const headers = {
  //       Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
  //     };

  //     let allProperties: PropertyDetails[] = [];
  //     let currentPage = 1;
  //     let hasMoreProperties = true;

  //     while (hasMoreProperties) {
  //       try {
  //         console.log("Headers:", headers);
  //         const response = await axios.get(
  //           `/api/sites/v1/properties?page=${currentPage}`,
  //           { headers }
  //         );
  //         const propertiesData = Array.isArray(response.data.data)
  //           ? response.data.data
  //           : [];
  //         allProperties = allProperties.concat(propertiesData);
  //         hasMoreProperties =
  //           response.data.current_page < response.data.last_page;
  //         currentPage++;
  //       } catch (error) {
  //         console.error("Error fetching properties:", error);
  //         setProperties([]);
  //         return;
  //       }
  //     }

  //     const sortedProperties = allProperties
  //       .slice()
  //       .sort((a: any, b: any) => a.dataadaugare - b.dataadaugare);
  //     setProperties(sortedProperties);
  //   };
  //   fetchProperties();
  // }, []);

  return (
    <div>
      {properties.map((propriety) => (
        <Proprietate key={propriety.idnum} {...propriety} />
      ))}
    </div>
  );
}
