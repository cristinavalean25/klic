import React, { useContext } from "react";
import ApartamentDeInchiriatList from "./ApartamentDeInchiriatList"; // Ensure this import is correct
import { PropertyContext } from "../context/PropertyContext";

const ApartamenteDeInchiriat: React.FC = () => {
  const propertyContext = useContext(PropertyContext);

  if (!propertyContext) {
    return <div>Error: PropertyContext is not available.</div>;
  }

  const { apartments, loading, error } = propertyContext;

  const propertiesPerPage = 10; // Define the number of properties to display per page

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ApartamentDeInchiriatList
        apartments={apartments}
        propertiesPerPage={propertiesPerPage}
      />
    </div>
  );
};

export default ApartamenteDeInchiriat;
