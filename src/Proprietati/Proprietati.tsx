import axios from "axios";
import { useEffect, useState } from "react";
import Proprietate from "./Proprietate";

export interface PropertyDetails {
  idnum: number;
  idstr: string;
  agent: number;
  dataadaugare: number;
  datamodificare: number;
  adresa: string;
  ansambluid: number;
  titlu: { ro: string; en: string };
  descriere: { ro: string; en: string };
  latitudine: number;
  longitudine: number;
}

export default function Properties() {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const agentId =
        "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
      const agentPassword =
        "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
      // const encodedAuth = btoa(`${agentId}:${agentPassword}`);
      const headers = {
        Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
      };

      try {
        console.log("Headers:", headers);
        const response = await axios.get(
          "https://klic.immoflux.ro/api/sites/v1/properties",
          { headers }
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      {properties.map((propriety) => (
        <Proprietate key={propriety.idnum} {...propriety} />
      ))}
    </div>
  );
}
