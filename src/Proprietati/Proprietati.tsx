import axios from "axios";
import { useEffect, useState } from "react";

type ProprietiesDetails = {
  id: number;
  nume: string;
};

export default function Proprietati() {
  const [properties, setProperties] = useState<ProprietiesDetails[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user =
          "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
        const key =
          "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";

        const credentials = `${user}:${key}`;
        const apiKey = btoa(credentials);
        const token = `Basic ${apiKey}`;

        const apiUrl = "https://klic.immoflux.ro/api/sites/v1/properties";

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: token,
            "X-Requested-With": "XMLHttpRequest",
          },
        });

        console.log("Răspunsul API complet:", response);
        console.log("Cheile API:", credentials);

        if (response.data && response.data.data) {
          console.log("Numărul de proprietăți:", response.data.data.length);
          setProperties(response.data.data);
        } else {
          setError("Răspunsul API nu conține datele așteptate.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("A intervenit o eroare necunoscută.");
        }

        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>A intervenit o eroare: {error}</p>}
      {properties?.map((property, index) => (
        <div key={`property-${index}`} style={{ height: "300px" }}>
          <p>{property.id}</p>
          <p>{property.nume}</p>
        </div>
      ))}
    </div>
  );
}
