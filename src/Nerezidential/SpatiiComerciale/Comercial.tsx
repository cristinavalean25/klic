import React, { useContext } from "react";
import { PropertyDetails } from "../../types/PropertyDetails";
import { PropertyContext } from "../../Rezidential/Apartamente/PropertyContext";

const Comercial: React.FC = () => {
  const propertyContext = useContext(PropertyContext);

  if (!propertyContext) {
    console.log("PropertyContext is not available");
    return <div>Loading...</div>;
  }

  const { commercialSpaces, loading, error } = propertyContext;

  if (loading) {
    console.log("Loading commercial spaces...");
    return <div>Loading commercial spaces...</div>;
  }

  if (error) {
    console.error("Error loading commercial spaces:", error);
    return <div>Error loading commercial spaces: {error}</div>;
  }

  console.log("Commercial spaces:", commercialSpaces);

  if (!commercialSpaces || commercialSpaces.length === 0) {
    return <div>No commercial spaces available.</div>;
  }

  return (
    <div>
      <h1>Commercial Spaces</h1>
      <ul>
        {commercialSpaces.map((property: PropertyDetails) => (
          <li key={property.idnum}>
            <h2>{property.titlu.ro}</h2>
            <p>{property.descriere.ro}</p>
            <p>
              Price: {property.pretvanzare} {property.monedavanzare}
            </p>
            <p>
              Location: {property.adresa}, {property.localitate},{" "}
              {property.judet}
            </p>
            <p>Surface Area: {property.suprafatautila} m²</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comercial;
