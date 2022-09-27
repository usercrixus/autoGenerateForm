import React from "react";
import FormJson from "../../../../../../../dataStructure";
import "./multiChoice.css";

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

  generateMultiChoice(component: any): any {
    return (
      <>
        <h2>{component.question}</h2>
        <span>{component.description}</span>
        <div className="form-group" key={component.name}>
          <div className="form-check">
            {component.multiChoice.map((element: string, index: number) => {
              return (
                <div key={element}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={component.question}
                    value={component.value}
                    checked={component.value[index]}
                    onChange={(e) => this.eventMultiChoice(e, component, index)}
                  />
                  <label
                    htmlFor={component.question}
                    className="form-check-label"
                  >
                    {element}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  eventMultiChoice(
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    index: number
  ) {
    field.value[index] = e.target.checked;
    this.props.setParenState({ dataStructure: this.props.dataStructure });
  }

  render() {
    return this.generateMultiChoice(this.props.component);
  }
}
