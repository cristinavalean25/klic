import React, { useContext } from "react";
import { PropertyContext } from "../../context/PropertyContext";
import ListaTerenuri from "./ListaTerenuri";
import "../Terenuri/ListaTerenuri.css";

const propertiesPerPage = 24;

const Terenuri: React.FC = () => {
  const context = useContext(PropertyContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { lands, loading, error } = context;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <ListaTerenuri lands={lands} propertiesPerPage={propertiesPerPage} />;
};

export default Terenuri;
