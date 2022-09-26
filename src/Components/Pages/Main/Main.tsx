import FormGenerator from "./Element/FormGenerator/FormGenerator";
import LeftBar from "./Element/LeftBar/LeftBar";
import ProgressBar from "./Element/ProgressBar/ProgressBar";

export default function Main() {
  return (
    <div>
      <ProgressBar></ProgressBar>
      <div className="container-fluid d-flex justify-content-center">
        <img src="./LogoAltyorHOrange.png" />
      </div>
      <div className="d-flex justify-content-center align-items-center m-0">
        <div className="d-flex ">
          <LeftBar></LeftBar>
          <FormGenerator></FormGenerator>
        </div>
      </div>
    </div>

  );
}
