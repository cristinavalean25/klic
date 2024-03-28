import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// Acesta este locul potrivit pentru a utiliza useEffect în afara componentei
// Așa cum este definit acum, codul este incorect plasat și ar genera o eroare
// Dacă aveți anumite acțiuni pe care doriți să le executați la încărcarea aplicației,
// le puteți plasa aici înainte de ReactDOM.render, în afara oricărei componente specifice.

// useEffect(() => {
//   // Codul dvs. aici
// });
