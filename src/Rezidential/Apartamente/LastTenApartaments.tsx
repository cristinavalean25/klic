import { useEffect, useState } from "react";
import { PropertyDetails } from "../../types/PropertyDetails";
import axios from "axios";

function LastTenApartaments() {
  const [lastTenAp, setLastTenAp] = useState<PropertyDetails[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <>
      {lastTenAp.map((val, index) => (
        <div key={index}>{val.idnum}</div>
      ))}
    </>
  );
}

export default LastTenApartaments;
