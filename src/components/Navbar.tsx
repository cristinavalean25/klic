import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/klick-logo.png";
import "../CssPages/Navbar.css";

function Navbar() {
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
    { label: "REZIDENTIAL", path: "/rezidential" },
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

  return (
    <>
      <div
        className="container-navbar"
        style={{
          width: "100%",
          zIndex: 1000,
          backgroundColor: "#13203c",
          paddingLeft: "0.5rem",
        }}
      >
        <nav className={`navbar navbar-expand-lg  ${navbarClass}`}>
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
    </>
  );
}

export default Navbar;
