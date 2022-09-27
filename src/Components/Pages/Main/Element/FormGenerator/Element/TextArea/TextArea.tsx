import React from "react";
import FormJson from "../../../../../../../dataStructure";
import "./textArea.css";

export default class TextArea extends React.Component<
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

  generateTextArea(component: any): any {
    return (
      <>
        <h2>{component.question}</h2>
        <span>{component.description}</span>
        <div className="form-group" key={component.name}>
          <textarea
            className="form-control"
            value={component.value}
            name={component.name}
            onChange={(e) => this.eventTextArea(e, component)}
          />
        </div>
      </>
    );
  }

  eventTextArea(e: React.ChangeEvent<HTMLTextAreaElement>, field: any) {
    field.value = e.target.value;
    this.props.setParenState({ dataStructure: this.props.dataStructure });
  }

  render() {
    return this.generateTextArea(this.props.component);
  }
}
