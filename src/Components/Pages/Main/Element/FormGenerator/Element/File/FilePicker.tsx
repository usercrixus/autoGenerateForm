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

        <input
          className="form-control"
          type="file"
          multiple
          name={component.name}
          onChange={(e) => this.eventFilePicker(e, component)}
          style={{ marginBottom: component.value.length > 0 ? "10px" : "0px" }}
        />

        {component.value.map((file: any, index: number) => {
          return (
            <div key={index}>
              {file.name}
              <img
                className="cancel"
                src="cancel.svg"
                width={"25px"}
                alt="delete"
                title="click to remove this file"
                onClick={(e) => this.removeFile(component, file.name)}
              />
            </div>
          );
        })}
      </>
    );
  }

  eventFilePicker(e: React.ChangeEvent<HTMLInputElement>, field: any) {
    if (e.target.files) {
      field.value = field.value.concat(Array.from(e.target.files));
      e.target.value = "";
    }
    this.props.setParenState({ dataStructure: this.props.dataStructure });
  }

  removeFile(component: any, fileName: string) {
    let index: number = this.indexFileByName(component.value, fileName);
    if (index !== -1) {
      component.value.splice(index, 1);
    }
    this.props.setParenState({ dataStructure: this.props.dataStructure });
  }

  indexFileByName(files: File[], fileName: string): number {
    let index = -1;
    for (let i = 0; i < files.length; i++) {
      if (files[i].name == fileName) {
        index = i;
        break;
      }
    }
    return index;
  }

  render() {
    return this.generateFilePicker(this.props.component);
  }
}
