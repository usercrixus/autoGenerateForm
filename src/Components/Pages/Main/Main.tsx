import FormGenerator from "./Element/FormGenerator/FormGenerator";
import LeftBar from "./Element/LeftBar/LeftBar";

export default function Main() {
  return (
    <div className="row">
      <LeftBar></LeftBar>
      <FormGenerator></FormGenerator>
    </div>
  );
}
