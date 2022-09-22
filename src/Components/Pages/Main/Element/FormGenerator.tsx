import React, { Profiler, ReactElement } from "react";
import "../../../../CSS/utilities.css";
import { ProviderInterface } from "../../../../Providers/ProviderInterface";
import BasicProvider from "../../../../Providers/BasicProvider";
import FormJson from "../../../../dataStructure.json";
import { Console } from "console";
import "./formGenerator.css";

export default class FormGenerator
  extends React.Component
  implements ProviderInterface
{
  FormElement: ReactElement[] = [];

  Tester: ReactElement = (<div>ok</div>);

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    BasicProvider.subscribe(this);
  }
  componentWillUnmount() {
    BasicProvider.unsubscribe(this);
  }
  rerender() {
    this.forceUpdate();
  }

  printForm(formSection: any) {
    this.FormElement.push(<h1>{formSection.sectionName}</h1>);

    formSection.formStructure.forEach((element: any) => {
      this.dispatchInputType(element);
      if (element.isBranch) {
        this.printForm(this.getSectionByName(element.include));
      }
    });
    if (formSection.next)
      this.printForm(this.getSectionByName(formSection.next));
  }

  dispatchInputType(formStructure: any) {
    switch (formStructure.inputType) {
      case "textField":
        this.generateTextField(formStructure);
        break;

      case "multiChoice":
        this.generateMultiChoice(formStructure);
        break;

      default:
        break;
    }
  }

  generateTextField(formStructure: any) {
    this.FormElement.push(
      <div className="column formElement">
        <h2>{formStructure.question}</h2>
        <div>{formStructure.description}</div>
        <input type="text"></input>
      </div>
    );
  }

  generateMultiChoice(formStructure: any) {
    this.FormElement.push(
      <div className="column formElement">
        <h2>{formStructure.question}</h2>
        <div>{formStructure.description}</div>
        {formStructure.multiChoice.map((element: string) => {
          return (
            <div>
              <input
                key={element}
                type="checkbox"
                name={formStructure.question}
                value={element}
              />
              <label htmlFor={element}>{element}</label>
            </div>
          );
        })}
      </div>
    );
  }

  generateBranch() {}

  getSectionByName(branchName: string) {
    let buffer: any;
    FormJson.forEach((element) => {
      if (element.branchName === branchName) {
        buffer = element;
        return;
      }
    });
    return buffer;
  }

  getSectionRankByName(branchName: string): number {
    let rank: number = 0;
    FormJson.forEach((element) => {
      if (element.branchName === branchName) {
        return;
      }
      rank++;
    });
    return rank;
  }

  render() {
    this.printForm(FormJson[0]);
    return (
      <>
        <div className="column">
          {this.FormElement.map((element) => element)}
        </div>
      </>
    );
  }
}
