import React, { useContext } from "react";
import { PropertyContext } from "../Apartamente/PropertyContext";
import ListaCase from "./ListaCase";

const propertiesPerPage = 24;

const Case: React.FC = () => {
  const context = useContext(PropertyContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { houses, loading } = context;

  if (loading) {
    return <div>Loading...</div>;
  }

  return <ListaCase houses={houses} propertiesPerPage={propertiesPerPage} />;
};

export default Case;
