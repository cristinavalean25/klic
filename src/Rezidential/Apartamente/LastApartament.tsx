import React, { useContext } from "react";
import { PropertyContext } from "./PropertyContext";
import "../../CssPages/LastApartament.css";

const LastApartament: React.FC = () => {
  const context = useContext(PropertyContext);

  if (!context) {
    return <p>Loading...</p>;
  }

  const { lastApartment, loading, error } = context;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!lastApartment) {
    return <p>No last apartment available</p>;
  }

  return (
    <div className="last-apartament">
      <h2>Last Apartment Details</h2>
      <h3>ID: {lastApartment.idnum}</h3>
      <p>Type: {lastApartment.tiplocuinta}</p>
      {/* Render other apartment details as needed */}
    </div>
  );
};

export default LastApartament;
