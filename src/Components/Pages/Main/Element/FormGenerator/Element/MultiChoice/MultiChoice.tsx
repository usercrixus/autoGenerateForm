import React from "react";
import FormJson from "../../../../../../../dataStructure";
import "./multiChoice.css";

export default class Radio
  extends React.Component<
    {
      formStructure: any,
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

  componentDidMount() { }
  componentWillUnmount() { }
  rerender() {
    this.forceUpdate();
  }

  generateMultiChoice(formStructure: any): any {
    return (
      <>
        <h2>{formStructure.question}</h2>
        <span>{formStructure.description}</span>
        <div className="form-group" key={formStructure.name}>
          <div className="form-check">
            {formStructure.multiChoice.map((element: string, index: number) => {
              return (
                <div key={element}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={formStructure.question}
                    value={formStructure.value}
                    checked={formStructure.value[index]}
                    onChange={(e) => this.eventMultiChoice(e, formStructure, index)}
                  />
                  <label htmlFor={formStructure.question} className="form-check-label">{element}</label>
                </div>
              );
            })}
          </div>
        </div >
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
    return this.generateMultiChoice(this.props.formStructure);
  }
}
