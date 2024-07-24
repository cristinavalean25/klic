import React, { useContext, useEffect } from "react";
import {
  PropertyContext,
  PropertyContextType,
} from "../../context/PropertyContext";
import ListaIndustriale from "./ListaIndustriale";

const Industrial: React.FC = () => {
  const { industrialSpaces, fetchProperties, loading, error } = useContext(
    PropertyContext
  ) as PropertyContextType;

  useEffect(() => {
    if (!industrialSpaces.length) {
      fetchProperties();
    }
  }, [industrialSpaces, fetchProperties]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ListaIndustriale
        industrialSpaces={industrialSpaces}
        propertiesPerPage={24}
      />
    </div>
  );
};

export default Industrial;
