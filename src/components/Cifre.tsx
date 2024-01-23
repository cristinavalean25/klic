import "../CssPages/Cifre.css";
import { NumericFormat } from "react-number-format";

function Cifre() {
  const businessDetails = [
    {
      numDet: 361,
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
      <div></div>
    </>
  );
}

export default Cifre;
