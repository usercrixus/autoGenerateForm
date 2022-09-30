import React from "react";
import FormJson from "../../../../../../../dataStructure";
import "./select.css";

export default class Select extends React.Component<
  {
    component: any;
    dataStructure: typeof FormJson;
    generateSectionTab: Function;
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

  generateSelect(component: any): any {
    return (
      <>
        <h2>{component.question}</h2>
        <span>{component.description}</span>
        <div key={component.name}>
          <select
            className="form-select"
            name={component.name}
            value={component.value}
            onChange={(e) => this.eventSelect(e, component)}
          >
            {component.select.map((element: string, index: number) => {
              return (
                <option value={element} key={element}>
                  {" "}
                  {element}
                </option>
              );
            })}
          </select>
        </div>
      </>
    );
  }

  eventSelect(e: React.ChangeEvent<HTMLSelectElement>, field: any) {
    field.value = e.target.value;

    if (field.isBranch) {
      field.select.forEach((selectValue: any) => {
        this.props.dataStructure.form.forEach((branch: any) => {
          if (branch.branch === field.value) {
            branch.isDisplayed = true;
          } else {
            if (branch.branch === selectValue) {
              branch.isDisplayed = false;
            }
          }
        });
      });
    }

    this.props.generateSectionTab();
    this.props.setParenState({ dataStructure: this.props.dataStructure });
  }

  render() {
    return this.generateSelect(this.props.component);
  }
}
