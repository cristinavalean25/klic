import React, { useContext, useEffect } from "react";
import {
  PropertyContext,
  PropertyContextType,
} from "../../context/PropertyContext";
import ListaComerciale from "./ListaComerciale";

const Comercial: React.FC = () => {
  const { commercialSpaces, fetchProperties, loading, error } = useContext(
    PropertyContext
  ) as PropertyContextType;

  useEffect(() => {
    if (!commercialSpaces.length) {
      fetchProperties();
    }
  }, [commercialSpaces, fetchProperties]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ListaComerciale
        commercialSpaces={commercialSpaces}
        propertiesPerPage={24}
      />
    </div>
  );
};

export default Comercial;
