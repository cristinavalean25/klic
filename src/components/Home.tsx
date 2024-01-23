import Template from "./Template";
import "../index.css";
import Proprieties from "./Proprieties";
import Cifre from "./Cifre";
import WhyKlic from "./WhyKlic";
import ZoneSibiu from "./ZoneSibiu";

function Home() {
  return (
    <div className="App">
      <Template />
      {/* <Proprietati /> */}
      <Proprieties />
      <Cifre />
      <WhyKlic />
      <ZoneSibiu />
    </div>
  );
}

export default Home;
