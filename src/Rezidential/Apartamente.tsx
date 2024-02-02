import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../CssPages/Apartamente.css";
import ListaApartamente from "./ListaApartamente";
import { PropertyDetails } from "../types/PropertyDetails";
import axios from "axios";
import logo from "../Images/klic-blue.jpg";

function Apartamente() {
  const onlyDigitsRegex = /^[0-9]*$/;
  const errorMessage = "Introduceți doar cifre.";

  function validateInput(inputValue: string): boolean {
    return onlyDigitsRegex.test(inputValue);
  }

  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  // const [currentPage, setCurrentPage] = useState(0);
  const propertiesPerPage = 10;

  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage, 10) : 1;
  });

  const fetchData = async () => {
    try {
      const agentId =
        "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
      const agentPassword =
        "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
      const headers = {
        Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
      };

      console.log("Start fetching data...");
      console.time("Fetching data");

      let allProperties: PropertyDetails[] = [];

      let currentApiPage = 1;

      while (true) {
        console.log("Fetching data for page:", currentApiPage);

        const response = await axios.get(
          `/api/sites/v1/properties?page=${currentApiPage}`,
          { headers }
        );

        if (!response.data.data || response.data.data.length === 0) {
          break;
        }

        allProperties = [...allProperties, ...response.data.data];
        currentApiPage++;

        if (!response.data.next_page_url) {
          break;
        }
      }

      console.log("All Properties:", allProperties);

      const apartamenteDeVanzare = allProperties
        .filter((property: PropertyDetails) => {
          return (
            property.tiplocuinta &&
            property.tiplocuinta.toLowerCase() === "apartament"
          );
        })
        .sort((a: PropertyDetails, b: PropertyDetails) => b.idnum - a.idnum);

      setProperties(apartamenteDeVanzare);
      console.log("Data fetched successfully!");
      console.timeEnd("Fetching data");
    } catch (error) {
      console.error("Error fetching data:", error);
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber.toString());
  };

  return (
    <>
      <Navbar />
      <div className="container-ap-1">
        <div className="input-ap">
          <div className="select-container-ap">
            <select className="select-button-ap">
              <option value="cumpara" className="custom-botton">
                Cumpara
              </option>
              <option value="inchiriaza">Inchiriaza</option>
            </select>
          </div>
          <input
            className="first-input"
            type="text"
            placeholder="CAUTA DUPA DENUMIRE"
          />
        </div>

        <div className="input-container spaced-inputs">
          <input
            type="text"
            placeholder="PRET MINIM"
            className="additional-input text-white"
            onInput={(e) => {
              if (!validateInput((e.target as HTMLInputElement).value)) {
                alert(errorMessage);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <input
            type="text"
            placeholder="PRET MAXIM"
            className="additional-input"
            onInput={(e) => {
              if (!validateInput((e.target as HTMLInputElement).value)) {
                alert(errorMessage);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <input
            type="text"
            placeholder="CAMERE"
            className="additional-input"
            onInput={(e) => {
              if (!validateInput((e.target as HTMLInputElement).value)) {
                alert(errorMessage);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <input
            type="text"
            placeholder="BAIE"
            className="additional-input"
            onInput={(e) => {
              if (!validateInput((e.target as HTMLInputElement).value)) {
                alert(errorMessage);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <input
            type="text"
            placeholder="LOC  PARCARE"
            className="additional-input"
            onInput={(e) => {
              if (!validateInput((e.target as HTMLInputElement).value)) {
                alert(errorMessage);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
        </div>
      </div>

      <div className="container-ap">
        <div className="container-ap-80">
          {currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <ListaApartamente
                key={property.idnum}
                propertyDetails={property}
              />
            ))
          ) : (
            <div>
              <img src={logo} />
            </div>
          )}
        </div>
      </div>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(properties.length / propertiesPerPage),
        }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Apartamente;
