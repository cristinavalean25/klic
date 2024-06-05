import React from "react";
import { PropertyDetails } from "../../types/PropertyDetails";
import "../../CssPages/ApartamenteDetalii.css";

interface Props {
  property: PropertyDetails | null;
}

const CaracteristiciAp: React.FC<Props> = ({ property }) => {
  const { dotari, utilitati, general } = property || {};

  const characteristics = property
    ? [
        { label: "Nr. camere", value: property.nrcamere },
        { label: "Suprafață utilă", value: property.suprafatautila },
        { label: "Etaj", value: property.etaj },
        { label: "Compartimentare", value: property.tipcompartimentare },
        { label: "Tip imobil", value: property.tipimobil },
        { label: "Regim înălțime", value: property.regim_inaltime },
        { label: "Nr. băi", value: property.nrbai },
        { label: "S. construită", value: property.suprafataconstruita },
        { label: "Confort", value: property.confort },
        { label: "Nr. bucătării", value: property.nrbucatarii },
        { label: "Nr. balcoane", value: property.nrbalcoane },
        { label: "Nr. parcări", value: property.nrlocuriparcare },
        { label: "An construcție", value: property.anconstructie },
        { label: "An renovare", value: property.anrenovare },
        { label: "Structură", value: property.structurarezistenta },
      ]
    : [];

  const dotariList = dotari
    ? dotari.split(",").map((item) => ({ label: item.trim(), value: "" }))
    : [];
  const utilitatiList = utilitati
    ? utilitati.split(",").map((item) => ({ label: item.trim(), value: "" }))
    : [];

  return (
    <>
      <div className="property-details">
        <div className="details-grid">
          <h3 style={{ color: "#13205E" }}>Caracteristici</h3>
        </div>
        <div className="details-grid">
          {characteristics.map(({ label, value }) => (
            <div key={label} className="detail">
              <span className="label">{label}:</span>
              <span className="value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="property-details">
        <div className="details-grid">
          <h3 style={{ color: "#13205E" }}>Dotări</h3>
        </div>
        {dotari && (
          <div className="details-grid">
            {dotariList.map(({ label }, index) => (
              <div key={index} className="detail">
                <span className="label">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="property-details">
        <div className="details-grid">
          <h3 style={{ color: "#13205E" }}>Utilități</h3>
        </div>
        {utilitati && (
          <div className="details-grid">
            {utilitatiList.map(({ label }, index) => (
              <div key={index} className="detail">
                <span className="label">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {general && (
        <div className="general">
          <h3 style={{ color: "#13205E" }}>General</h3>
          <div className="details-grid">
            {general.map((item, index) => (
              <div key={index} className="detail">
                <span className="label">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CaracteristiciAp;
