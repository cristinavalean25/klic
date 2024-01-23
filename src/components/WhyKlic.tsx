import { useEffect, useState } from "react";
import "../CssPages/WhyKlic.css";
import imgBackground from "../Images/ab.jpg";
import { Slide } from "../types/SlideType";
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

function WhyKlic() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + detailsSlider.length) % detailsSlider.length
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentSlide]);

  const detailsSlider: Slide[] = [
    {
      id: 1,
      titleSlider: "De ce Klic?",
      textDet: "ONESTITATE",
      textSlider:
        "Relațiile bazate pe consiliere de încredere promovează oportunități de-a lungul vieții pentru clienții noștri în domeniile rezidențial, comercial și dezvoltare imobiliară.",
    },
    {
      id: 2,
      titleSlider: "De ce Klic?",
      textDet: "COLABORARE",
      textSlider:
        "Agenții Klic operează folosind un model de baze de date deschise, asigurând clienților noștri un acces inegalabil la resurse și oportunități.",
    },
    {
      id: 3,
      titleSlider: "De ce Klic?",
      textDet: "COMUNITATE",
      textSlider:
        "Toți membrii echipei noastre sunt dedicați să contribuie activ la bunăstarea comunităților locale în care trăim, lucrăm și ne bucurăm de viață împreună. ",
    },
  ];
  return (
    <>
      <div className="white-container"></div>
      <div className="why-klic-container">
        <div className="left-section">
          <img
            src={imgBackground}
            alt="Background"
            className="background-image"
          />

          <div className="overlay-text-why">
            <div className="top-section">
              <div className="about-us">
                Despre noi
                <div className="arrow">
                  <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </div>
              </div>
              <div className="our-team">
                Echipa noastra
                <div className="arrow">
                  <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-section">
          <Carousel
            activeIndex={currentSlide}
            onSelect={(index) => setCurrentSlide(index)}
            interval={5000}
            style={{ height: "90vh" }}
            controls={false}
            indicators={false}
            fade
          >
            {detailsSlider.map((slide, index) => (
              <Carousel.Item key={index} style={{ height: "90vh" }}>
                <h2 className="carousel-text-h2">{slide.titleSlider}</h2>
                <h3 className="carousel-text-h3">{slide.textDet}</h3>
                <p className="carousel-text">{slide.textSlider}</p>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default WhyKlic;
