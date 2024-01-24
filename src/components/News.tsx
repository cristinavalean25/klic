import "../CssPages/News.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import img1News from "../Images/news.1.jpg";
import img2News from "../Images/news2.jpeg";

function News() {
  return (
    <>
      <div className="news-big-contaiener">
        <div className="news-top-container">
          <div className="left-top-container">
            <div className="line-news" />
            <div className="left-top-title">
              Cele mai recente stiri <br /> & informatii
            </div>
          </div>

          <div className="right-top-container">
            <p>Mai multe stiri</p>
            <div className="news-icon">
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </div>
          </div>
        </div>
      </div>

      <div className="container-news">
        <div className="secound-news-container">
          <div className="news-container-left">
            <div className="news-overlay">
              <img src={img2News} alt="news1" />
              <div className="news-overlay-text">
                <h3>
                  Cum sa gasesti si sa pastrezi <br /> un chirias bun
                </h3>
              </div>
            </div>
          </div>
          <div className="news-container-right">
            <div className="news-overlay">
              <img src={img1News} alt="news1" />
              <div className="news-overlay-text">
                <h3>
                  Cele mai recente stiri <br /> si informatii
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="details-new-container">
        <div className="details-new-overlay">
          <div className="second-details-new">
            <div className="second-det-title">
              <h2>
                Descoperiti experienta serviciului de top <br /> oferit de
                <span>klic imobiliare</span>
              </h2>
            </div>
            <div className="second-details-title">
              <h6>
                Echipa noastra dedicata de consilieri de incredere are ca
                misiune sa va ajute sa va atingeti obiectivele imobiliare,
                facilitand realizarea viselor dumneavoastra de viata.
              </h6>
              <div className="news-bottom-container">
                <div className="btn-news">
                  <h5>Incepeti cautarea </h5>
                  <FontAwesomeIcon
                    icon={faArrowAltCircleRight}
                    style={{ fontSize: "24px" }}
                  />
                </div>
                <div className="btn-news">
                  <h5>Contactati-ne</h5>
                  <FontAwesomeIcon
                    icon={faArrowAltCircleRight}
                    style={{ fontSize: "24px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
