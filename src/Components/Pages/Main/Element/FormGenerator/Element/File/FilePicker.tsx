import React from "react";
import FormJson from "../../../../../../../dataStructure";
import "./filePicker.css";

export default class FilePicker extends React.Component<
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

  generateFilePicker(component: any): any {
    return (
      <>
        <h2>{component.question}</h2>
        <span>{component.description}</span>
        <div className="form-group" key={component.name}>
          <div className="form-check">
            <input
              className="form-control"
              type="file"
              name={component.name}
              value={component.value}
              onChange={(e) => this.eventFilePicker(e, component)}
            />
            <label className="form-label">Choose file</label>
          </div>
        </div>
      </>
    );
  }

  eventFilePicker(e: React.ChangeEvent<HTMLInputElement>, field: any) {
    field.value = e.target.files ? e.target.files[0] : null;
    this.props.setParenState({ dataStructure: this.props.dataStructure });
  }

  render() {
    return this.generateFilePicker(this.props.component);
  }
}
