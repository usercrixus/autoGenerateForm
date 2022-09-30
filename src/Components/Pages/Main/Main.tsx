import FormGenerator from "./Element/FormGenerator/FormGenerator";
import LeftBar from "./Element/LeftBar/LeftBar";
import ProgressBar from "./Element/ProgressBar/ProgressBar";
import "./main.css";

export default function Main() {
  return (
    <div>
      <header>
        <ProgressBar></ProgressBar>
        <div className="fullCenter">
          <img id="logo" src="./LogoAltyorHOrange.png" />
        </div>
      </header>
      <div style={{ marginTop: "200px" }} className="fullCenter">
        <section id="mainSection">
          <LeftBar></LeftBar>
          <FormGenerator></FormGenerator>
        </section>
      </div>
    </div>
  );
}
