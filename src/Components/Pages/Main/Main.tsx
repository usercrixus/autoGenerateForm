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
      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex mb-5">
          <LeftBar></LeftBar>
          <FormGenerator></FormGenerator>
        </div>
      </div>
      <footer className="text-center mt-4 position-fixed bottom-0 w-100">
        Developped by ©Altyor 2022
      </footer>
    </div>
  );
}
