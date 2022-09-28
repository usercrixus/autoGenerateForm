import React from "react";
import FormJson from "../../../../../../../dataStructure";
import "./radio.css";

export default class Radio extends React.Component<
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

  generateRadio(component: any): any {
    return (
      <>
        <h2>{component.question}</h2>
        <span>{component.description}</span>
        <div className="form-group" key={component.name}>
          <div className="form-check">
            {component.radio.map((element: string, index: number) => {
              return (
                <div key={element}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={component.name}
                    value={element}
                    checked={component.value === element}
                    onChange={(e) =>
                      this.eventRadio(e, component, element, index)
                    }
                  />
                  <label htmlFor={component.question}>{element}</label>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  eventRadio(
    e: React.ChangeEvent<HTMLInputElement>,
    component: any,
    value: string,
    index: number
  ) {
    component.value = value;

    if (component.isBranch) {
      component.branchRefValue = component.branchRef[index];
      component.branchRef.forEach((branchRef: any) => {
        this.props.dataStructure.forEach((branch: any) => {
          if (branch.branch === branchRef) {
            if (branchRef === component.branchRef[index]) {
              branch.isDisplayed = true;
            } else {
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
    return this.generateRadio(this.props.component);
  }
}
