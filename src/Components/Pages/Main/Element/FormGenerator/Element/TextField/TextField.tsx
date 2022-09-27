import React from "react";
import FormJson from "../../../../../../../dataStructure";
import "./textField.css";

export default class Radio extends React.Component<
  {
    component: any;
    dataStructure: typeof FormJson;
    setParenState: Function;
  },
  {}
> {
  sectionsName: string[] = [];

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}
  componentWillUnmount() {}
  rerender() {
    this.forceUpdate();
  }

  generateTextField(component: any): any {
    return (
      <>
        <h2>{component.question}</h2>
        <span>{component.description}</span>
        <div className="form-group" key={component.name}>
          <input
            className="form-control"
            type="text"
            value={component.value}
            name={component.name}
            onChange={(e) => this.eventTextField(e, component)}
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
    return this.generateTextField(this.props.component);
  }
}
