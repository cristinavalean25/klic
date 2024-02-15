import "bootstrap/dist/css/bootstrap.min.css";
import "../CssPages/Template.css";
import Logo from "../Images/klick-logo.png";
import video from "../video/Klick-Web-V4-1.mp4";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

function Template() {
  const navigate = useNavigate();
  const controls = useAnimation();
  const dropdownControls = useAnimation();
  const inputsControls = useAnimation();

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 90) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    controls.start({ opacity: 1, y: 0 });
    dropdownControls.start({ opacity: 1, y: 0 });
    inputsControls.start({ opacity: 1, y: 0 });

    const timeoutId = setTimeout(() => {
      controls.start({ opacity: 1, y: 0 });
      dropdownControls.start({ opacity: 1, y: 0 });
      inputsControls.start({ opacity: 1, y: 0 });
    }, 20000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [controls, dropdownControls, inputsControls]);

  const navbarClass = isScrolled ? "navbar fixed-navbar" : "navbar";

  const dropdownItems = [
    { label: "APARTAMENTE", path: "/Apartamente" },
    { label: "CASE", path: "/Case" },
    { label: "COMERCIAL", path: "/comercial" },
    { label: "ANSAMBLURI REZIDENTIALE", path: "/ansambluri" },
    { label: "CASE LA TARA", path: "/casetara" },
    { label: "TERENURI", path: "/terenuri" },
    { label: "HOTELURI/PENSIUNI", path: "/hoteluri" },
  ];

  const dropdownItemsRent = [
    { label: "REZIDENTIAL", path: "/rezidential" },
    { label: "COMERCIAL", path: "/comercial" },
  ];

  const dropdownItemsSold = [
    { label: "REZIDENTIAL", path: "/rezidential" },
    { label: "COMERCIAL", path: "/comercial" },
    { label: "ANSAMBLURI REZIDENTIALE", path: "/ansambluri" },
  ];

  const dropdownItemsAbout = [
    { label: "DESPRE NOI", path: "/rezidential" },
    { label: "ECHIPA", path: "/comercial" },
    { label: "CONTACTATI-NE", path: "/ansambluri" },
    { label: "CARIERA", path: "/ansambluri" },
  ];

  const handleDropdownItemClick = (path: string) => {
    navigate(path);
  };

  const onlyDigitsRegex = /^[0-9]*$/;
  const errorMessage = "Introduceți doar cifre.";

  function validateInput(inputValue: string): boolean {
    return onlyDigitsRegex.test(inputValue);
  }

  return (
    <div className="content">
      <video id="backgroundVideo" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className="overlay">
        <div className="container" style={{ width: "100%", zIndex: 1000 }}>
          <nav
            className={`navbar navbar-expand-lg navbar-light ${navbarClass}`}
          >
            <div
              className="container-fluid"
              style={{ width: "100%", zIndex: 1000 }}
            >
              <Link to="/" className="navbar-brand">
                <img src={Logo} className="img-fluid logo" />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul
                  className="navbar-nav ms-auto"
                  style={{
                    width: "80%",
                  }}
                >
                  <li className="nav-item dropdown">
                    <Link
                      to="/"
                      className="nav-link dropdown-toggle  custom-dropdown-menu"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "#fff" }}
                    >
                      CUMPARA
                    </Link>
                    <ul
                      className="dropdown-menu custom-dropdown-menu"
                      aria-labelledby="navbarDropdown"
                      style={{ backgroundColor: "#13203C", borderRadius: "0" }}
                    >
                      {dropdownItems.map((item) => (
                        <li key={item.label}>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => handleDropdownItemClick(item.path)}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      to="/"
                      className="nav-link dropdown-toggle custom-dropdown-menu"
                      id="navbarDropdown2"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "#fff" }}
                    >
                      INCHIRIAZA
                    </Link>
                    <ul
                      className="dropdown-menu custom-dropdown-menu"
                      aria-labelledby="navbarDropdown2"
                      style={{ backgroundColor: "#13203C", borderRadius: "0" }}
                    >
                      {dropdownItemsRent.map((item) => (
                        <li key={item.label}>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => handleDropdownItemClick(item.path)}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/vinde-acum"
                      className="nav-link custom-dropdown-menu"
                      style={{ color: "#fff", whiteSpace: "nowrap" }}
                    >
                      VINDE ACUM
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/vinde-acum"
                      className="nav-link custom-dropdown-menu"
                      style={{ color: "#fff", whiteSpace: "nowrap" }}
                    >
                      CASE LA TARA
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      to="/"
                      className="nav-link dropdown-toggle custom-dropdown-menu"
                      id="navbarDropdown3"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "#fff" }}
                    >
                      VANDUT
                    </Link>
                    <ul
                      className="dropdown-menu custom-dropdown-menu"
                      aria-labelledby="navbarDropdown3"
                      style={{ backgroundColor: "#13203C", borderRadius: "0" }}
                    >
                      {dropdownItemsSold.map((item) => (
                        <li key={item.label}>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => handleDropdownItemClick(item.path)}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      to="/"
                      className="nav-link dropdown-toggle custom-dropdown-menu"
                      id="navbarDropdown4"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "#fff" }}
                    >
                      DESPRE
                    </Link>
                    <ul
                      className="dropdown-menu custom-dropdown-menu"
                      aria-labelledby="navbarDropdown4"
                      style={{ backgroundColor: "#13203C", borderRadius: "0" }}
                    >
                      {dropdownItemsAbout.map((item) => (
                        <li key={item.label}>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => handleDropdownItemClick(item.path)}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <hr style={{ width: "100%", color: "#F8F9FA" }} />
        </div>

        <div className="middle-content">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={controls}
            transition={{ duration: 3, delay: 2.5 }}
          >
            <div className="row content-center">
              <div className="col-4 text-container">
                <div className="line-text"></div>
                <p className="white-text">REZIDENTIAL</p>
              </div>
              <div className="col-4 text-container">
                <div className="line-text"></div>
                <p className="white-text">COMERCIAL</p>
              </div>
              <div className="col-4 text-container">
                <div className="line-text"></div>
                <p className="white-text">ANSAMBLURI </p>
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={controls}
            className="title-luxury"
            transition={{ duration: 2, delay: 1 }}
          >
            Imobiliarele incep cu noi
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={dropdownControls}
            transition={{ duration: 3, delay: 2.5 }}
          >
            <div className="input-container">
              <div className="select-container">
                <select className="select-button">
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Template;
