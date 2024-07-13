import "../CssPages/Evaluare.css";
import backgroundImg from "../Zone/zoneImg/treistejari.jpg";
import rightImg from "../Images/m.png";
import Navbar from "./Navbar";
import News from "./News";

function Evaluare() {
  return (
    <>
      <Navbar />
      <div className="evaluare-container">
        <header className="evaluare-header">
          <div
            className="evaluare-banner"
            style={{ backgroundImage: `url(${backgroundImg})` }}
          >
            <div className="banner-overlay"></div>
            <div className="banner-content">
              <h1 className="evaluare-title">EVALUARE</h1>
              <p>ÎNTELEGETI ADEVĂRATA VALOARE A BUNULUI DVS. DE PROPRIETATE</p>
            </div>
            <div className="right-image">
              <img src={rightImg} alt="Right Image" />
            </div>
          </div>
        </header>
      </div>

      <div className="contact-container">
        <div className="left-container-contact">
          <div className="line-contact"></div>
          <div className="contact">CONTACTAȚI-NE</div>
        </div>

        <div className="form-container">
          <div className="contact-form">
            <div
              style={{
                width: "50%",
                paddingBottom: 10,
                fontFamily: "georgia, serif",
              }}
            >
              <h2 style={{ color: "#13203c", fontWeight: 600 }}>
                SOLICITAȚI O EVALUARE
              </h2>
              <p>
                Primiți o estimare de evaluare a proprietății care include o
                evaluare a proprietății dvs., locația acesteia, vânzări
                comparabile recente și un ghid de preț estimativ.
              </p>
            </div>

            <div className="details-contact">
              <div className="details-left-contact">
                <div>
                  <label htmlFor="firstName">NUME</label>
                  <input type="text" id="firstName" name="firstName" />
                </div>
                <div>
                  <label htmlFor="lastName">PRENUME</label>
                  <input type="text" id="lastName" name="lastName" />
                </div>
                <div>
                  <label htmlFor="email">EMAIL-UL TAU</label>
                  <input type="email" id="email" name="email" />
                </div>
                <div>
                  <label htmlFor="contactNumber">NUMAR DE CONTACT</label>
                  <input type="text" id="contactNumber" name="contactNumber" />
                </div>

                <div style={{ flexBasis: "100%" }}>
                  <label>CE FEL DE EVALUARE AI NEVOIE?</label>
                  <div className="evaluare-input">
                    <div
                      className="checkbox-container"
                      style={{ alignItems: "stretch" }}
                    >
                      <input
                        type="radio"
                        id="vanzari"
                        name="evaluationType"
                        value="vanzari"
                        style={{ marginTop: 7 }}
                      />
                      <label htmlFor="vanzari">VÂNZĂRI</label>
                    </div>
                    <div
                      className="checkbox-container"
                      style={{ alignItems: "stretch" }}
                    >
                      <input
                        type="radio"
                        id="inchiriere"
                        name="evaluationType"
                        value="inchiriere"
                      />
                      <label htmlFor="inchiriere">ÎNCHIRIERE</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="details-right-contact">
                <div style={{ flexBasis: "100%" }}>
                  <label htmlFor="propertyAddress">
                    INTRODUCEȚI ADRESA PROPRIETĂȚII CARE URMEAZĂ A FI EVALUATĂ
                  </label>
                  <input
                    type="text"
                    id="propertyAddress"
                    name="propertyAddress"
                  />
                </div>

                <div style={{ flexBasis: "100%" }}>
                  <label htmlFor="message">MESAJUL DVS</label>
                  <textarea id="message" name="message"></textarea>
                </div>

                <div
                  className="checkbox-container"
                  style={{ flexBasis: "100%" }}
                >
                  <input type="checkbox" id="agreement" name="agreement" />
                  <label htmlFor="agreement">
                    Bifând această casetă, sunteți de acord să primiți
                    comunicări de marketing de la Kollosche, conform{" "}
                    <a href="#privacy-policy">
                      Politicii noastre de confidențialitate
                    </a>
                    .
                  </label>
                </div>
                <div>
                  <button type="submit">TRIMITEȚI ÎNTREBAREA</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <News />
    </>
  );
}

export default Evaluare;
