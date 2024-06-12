import React, { useState } from "react";
import { PropertyDetails } from "../../types/PropertyDetails";
import "../../CssPages/CaracteristiciAp.css";
import { valoriDotari, valoriFinisaje, valoriGenerale } from "../../types/Det";

interface Props {
  property: PropertyDetails | null;
}

const CaracteristiciAp: React.FC<Props> = ({ property }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!property) return null;

  const renderItems = (
    values: { [category: string]: { [key: string]: string } },
    selectedValues: string[]
  ) => {
    const result: string[] = [];
    Object.keys(values).forEach((category) => {
      const subValues = values[category];
      selectedValues.forEach((value) => {
        if (subValues[value]) {
          result.push(subValues[value]);
        }
      });
    });
    return result.join(", ");
  };

  const dotari: string[] = [];

  const addDetail = (
    label: string,
    values: { [category: string]: { [key: string]: string } },
    propertyValues: string[] | undefined
  ) => {
    if (propertyValues) {
      const formattedValues = renderItems(values, propertyValues);
      if (formattedValues) {
        dotari.push(`${label}: ${formattedValues}`);
      }
    }
  };

  // Adăugăm detalii pentru fiecare categorie specifică
  addDetail(
    "Bucatarie",
    { bucatarie: valoriDotari.bucatarie },
    property.bucatarie_values
  );
  addDetail(
    "Electrocasnice",
    { electrocasnice: valoriDotari.electrocasnice },
    property.dotari_values
  );
  addDetail(
    "Contorizare",
    { contorizare: valoriDotari.contorizare },
    property.dotari_values
  );
  addDetail(
    "Mobilat",
    { mobilat: valoriDotari.mobilat },
    property.dotari_values
  );
  addDetail("Imobil", { imobil: valoriDotari.imobil }, property.dotari_values);
  addDetail(
    "Diverse",
    { diverse: valoriDotari.diverse },
    property.dotari_values
  );

  addDetail(
    "General",
    { general: valoriGenerale.general },
    property.general_value
  );
  addDetail(
    "Sistem incalzire",
    { sistemIncalzire: valoriGenerale.sistemIncalzire },
    property.sistem_incalzire_values
  );
  addDetail(
    "Climatizare",
    { climatizare: valoriGenerale.climatizare },
    property.climatizare_values
  );
  addDetail("Teren", { teren: valoriGenerale.teren }, property.teren_values);

  // Adăugăm subcategoriile pentru finisaje
  if (property.finisaje_values) {
    const izolatii = renderItems(
      { izolatii: valoriFinisaje.izolatii },
      property.finisaje_values
    );
    if (izolatii) dotari.push(`Izolatii: ${izolatii}`);

    const pereti = renderItems(
      { pereti: valoriFinisaje.pereti },
      property.finisaje_values
    );
    if (pereti) dotari.push(`Pereti: ${pereti}`);

    const podele = renderItems(
      { podele: valoriFinisaje.podele },
      property.finisaje_values
    );
    if (podele) dotari.push(`Podele: ${podele}`);

    const stadiu = renderItems(
      { stadiu: valoriFinisaje.stadiu },
      property.finisaje_values
    );
    if (stadiu) dotari.push(`Stadiu: ${stadiu}`);

    const ferestre = renderItems(
      { ferestre: valoriFinisaje.ferestre },
      property.finisaje_values
    );
    if (ferestre) dotari.push(`Ferestre: ${ferestre}`);

    const jaluzele = renderItems(
      { jaluzele: valoriFinisaje.jaluzele },
      property.finisaje_values
    );
    if (jaluzele) dotari.push(`Jaluzele: ${jaluzele}`);

    const rulouri = renderItems(
      { rulouri: valoriFinisaje.rulouri },
      property.finisaje_values
    );
    if (rulouri) dotari.push(`Rulouri: ${rulouri}`);

    const usaintrare = renderItems(
      { usaintrare: valoriFinisaje.usaintrare },
      property.finisaje_values
    );
    if (usaintrare) dotari.push(`Usa intrare: ${usaintrare}`);

    const usainterior = renderItems(
      { usainterior: valoriFinisaje.usainterior },
      property.finisaje_values
    );
    if (usainterior) dotari.push(`Usa interior: ${usainterior}`);

    const iluminat = renderItems(
      { iluminat: valoriFinisaje.iluminat },
      property.finisaje_values
    );
    if (iluminat) dotari.push(`Iluminat: ${iluminat}`);

    const acoperis = renderItems(
      { acoperis: valoriFinisaje.acoperis },
      property.finisaje_values
    );
    if (acoperis) dotari.push(`Acoperis: ${acoperis}`);
  }

  const characteristics = [
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
  ];

  const otherDetails = dotari.map((item, index) => {
    const [label, value] = item.split(": ");
    return (
      <div key={index} className="dotari-item">
        <span className="label">{label}:</span>
        <span className="value">{value}</span>
      </div>
    );
  });

  return (
    <>
      <div className="property-details">
        <div className="details-header"></div>
        <div className="details-grid">
          <h3 style={{ color: "#13205E" }}>Caracteristici</h3>
          {characteristics.map(({ label, value }) => (
            <div key={label} className="detail">
              <span className="label" style={{ color: "#13205E" }}>
                {label}:
              </span>
              <span className="value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`property-details ${showDetails ? "show-details" : ""}`}>
        <div className="details-grid">
          <button
            className="toggle-details"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Ascunde detalii" : "Alte detalii"}
          </button>
        </div>
        <div className="other-details">{otherDetails}</div>
      </div>
    </>
  );
};

export default CaracteristiciAp;
