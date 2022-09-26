import React from "react";
import FormJson from "../../../../../../../dataStructure";
import "./radio.css";

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

  generateRadio(formStructure: any): any {
    return (
      <>
        <h2>{formStructure.question}</h2>
        <span>{formStructure.description}</span>
        <div className="form-group" key={formStructure.name}>
          <div className="form-check">
            {formStructure.radio.map((element: string, index: number) => {
              return (
                <div key={element}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={formStructure.question}
                    value={element}
                    checked={formStructure.value[index]}
                    onChange={(e) =>
                      this.eventRadio(e, formStructure, element, index)
                    }
                  />
                  <label htmlFor={formStructure.question}>{element}</label>
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
    field: any,
    value: string,
    index: number
  ) {
    for (let i = 0; i < field.value.length; i++) {
      if (i !== index) {
        field.value[i] = false;
      } else {
        field.value[i] = true;
      }
    }

    if (field.isBranch) {
      field.radio.forEach((radioValue: any) => {
        this.props.dataStructure.forEach((branch: any) => {
          if (branch.branchName === radioValue) {
            if (radioValue === value) {
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
    return this.generateRadio(this.props.formStructure);
  }
}
