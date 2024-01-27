import { Link } from "react-router-dom";
import "../CssPages/Footer.css";

function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-second-container">
          <div className="footer-row">
            <h1 className="title-klic">
              K <span>|</span> L <span>|</span> I <span>|</span> C
            </h1>
            <Link to="tel: +40751325933" className="phone-number">
              +40 751 325 933
            </Link>
            <div className="footer-address">
              <Link
                to="https://www.google.com/maps/place/Strada+Stefan+Cel+Mare+nr.+65,+Sibiu"
                target="blank"
              >
                <p>Sediu central Klic </p>
                <p>Sibiu, Stefan cel mare 65</p>
              </Link>
            </div>
          </div>

          <div className="footer-row">
            <h6 className="footer-row-title">Cumpara</h6>
            <div className="footer-buy">
              <ul>
                <li>
                  <Link to="/">Case</Link>
                </li>
                <li>
                  <Link to="/">Apartamente</Link>
                </li>
                <li>
                  <Link to="/">Teren</Link>
                </li>
                <li>
                  <Link to="/">Comercial</Link>
                </li>
                <li>
                  <Link to="/">Ansamble noi</Link>
                </li>
                <li>
                  <Link to="/">Open House</Link>
                </li>
                <li>
                  <Link to="/">Zone Sibiu</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-row">
            <h6 className="footer-row-title">Vandut</h6>
            <div className="footer-buy">
              <ul>
                <li>
                  <Link to="/">Rezidential</Link>
                </li>
                <li>
                  <Link to="/">Comercial</Link>
                </li>
                <li>
                  <Link to="/">Teren</Link>
                </li>
                <li>
                  <Link to="/">Ansamble Noi</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-row">
            <h6 className="footer-row-title">Inchirieri</h6>
            <div className="footer-buy">
              <ul>
                <li>
                  <Link to="/">Case</Link>
                </li>
                <li>
                  <Link to="/">Apartamente</Link>
                </li>
                <li>
                  <Link to="/">Comercial</Link>
                </li>
                <li>
                  <Link to="/">Teren</Link>
                </li>
                <li>
                  <Link to="/">Zone Sibiu</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-row">
            <h6 className="footer-row-title">Despre noi</h6>
            <div className="footer-buy">
              <ul>
                <li>
                  <Link to="/">Despre Noi</Link>
                </li>
                <li>
                  <Link to="/">Servicii </Link>
                </li>
                <li>
                  <Link to="/">Echipa </Link>
                </li>
                <li>
                  <Link to="/">Stiri</Link>
                </li>
                <li>
                  <Link to="/">Contactati-ne</Link>
                </li>
                <li>
                  <Link to="/">Cariere</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-row">
            <h6 className="footer-row-title">Ne gasesti pe:</h6>
            <div className="footer-buy">
              <ul>
                <li>
                  <Link to="/">Linkedin</Link>
                </li>
                <li>
                  <Link to="/">Facebook</Link>
                </li>
                <li>
                  <Link to="/">Instagram</Link>
                </li>
                <li>
                  <Link to="/">Whatsapp</Link>
                </li>
                <li>
                  <Link to="/">Tiktok</Link>
                </li>
                <li>
                  <Link to="/">Youtube</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="sec-footer">
        <div className="sec-footer-1">
          <div className="sec-container-footer">Termeni si conditii</div>
          <div className="sec-container-footer">
            Politica de confidentialitate
          </div>
          <div className="sec-container-footer">© Klic 2021</div>
          <div className="sec-container-footer">Design by VMS design</div>
        </div>
      </div>
    </>
  );
}

export default Footer;
