import React from "react";
import FormJson from "../../../../../../../dataStructure";
import "./textField.css";

export default class Radio
  extends React.Component<
    {
      formStructure: any,
      dataStructure: typeof FormJson;
      setParenState: Function;
    },
    {}
  > {
  sectionsName: string[] = [];

  constructor(props: any) {
    super(props);
  }

  componentDidMount() { }
  componentWillUnmount() { }
  rerender() {
    this.forceUpdate();
  }

  generateTextField(formStructure: any): any {
    return (
      <>
        <h2>{formStructure.question}</h2>
        <span>{formStructure.description}</span>
        <div className="form-group" key={formStructure.name}>
          <input
            className="form-control"
            type="text"
            value={formStructure.value}
            name={formStructure.name}
            onChange={(e) => this.eventTextField(e, formStructure)}
          ></input>
        </div>
      </>
    );
  }

  eventTextField(e: React.ChangeEvent<HTMLInputElement>, field: any) {
    field.value = e.target.value;
    this.props.setParenState({ dataStructure: this.props.dataStructure });
  }


  render() {
    return this.generateTextField(this.props.formStructure);
  }
}
