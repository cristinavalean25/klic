import { useEffect, useState } from "react";
import "../CssPages/Cifre.css";
import { NumericFormat } from "react-number-format";
import axios from "axios";

function Cifre() {
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const agentId =
          "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
        const agentPassword =
          "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
        const headers = {
          Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
        };

        const response = await axios.get("/api/sites/v1/properties", {
          headers,
        });

        if (response.status === 200) {
          setTotalProperties(response.data.total);
        } else {
          throw new Error("Failed to fetch properties");
        }

        setIsLoading(false);
        console.log(totalProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const businessDetails = [
    {
      numDet: totalProperties,
      businessDet: "proprietati in portofoliul Klic",
    },
    {
      numDet: 54483862,
      businessDet: "valoare vanzari",
    },
    {
      numDet: 150.924,
      businessDet: "pret mediu de vanzare",
    },
    {
      numDet: 2455000,
      businessDet: "cea mai mare vanzare",
    },
    {
      numDet: 5.0,
      businessDet: "evaluarea medie a clientilor",
    },
  ];

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="cifre-container">
          <div className="cifre-second-container">
            <div className="cifre-left">
              <div className="line-cifre" />
              <div className="cifre-text">Dupa Cifre</div>
            </div>
            <div className="cifre-right">
              {businessDetails.map((val, index) => (
                <div className="cifre-details" key={index}>
                  <h5 className="cifre-title-det">
                    <NumericFormat
                      value={val.numDet}
                      thousandSeparator={true}
                      decimalSeparator={"."}
                      decimalScale={3}
                      className="zecimal-number"
                      readOnly
                    />
                  </h5>
                  <p className="cifre-text-det">{val.businessDet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cifre;
