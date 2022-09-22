import React, { Component, Profiler, ReactElement } from "react";
import "../../../../CSS/utilities.css";
import { ProviderInterface } from "../../../../Providers/ProviderInterface";
import BasicProvider from "../../../../Providers/BasicProvider";
import FormJson from "../../../../dataStructure";
import "./formGenerator.css";

export default class FormGenerator
  extends React.Component<{}, { Pagination: number, FormComponents: any; }>
  implements ProviderInterface {

  constructor(props: any) {
    super(props);
    this.state = { Pagination: 0, FormComponents: FormJson };
  }

  componentDidMount() {

    this.setState({ FormComponents: FormJson });
    BasicProvider.subscribe(this);
  }
  componentWillUnmount() {
    BasicProvider.unsubscribe(this);
  }
  rerender() {
    this.forceUpdate();
  }

  generateComponent() {
    FormJson.forEach((branch: any) => {
      branch.component.push((<h1 key={branch.branchName}>{branch.sectionName}</h1>));
      branch.formStructure.forEach((formStructure: any) => {
        formStructure.component.push(this.dispatchInputType(formStructure));
      });
    });
  }

  dispatchInputType(formStructure: any): any {
    switch (formStructure.inputType) {
      case "textField":
        return this.generateTextField(formStructure);
        break;

      case "multiChoice":
        return this.generateMultiChoice(formStructure);
        break;

      default:
        return this.generateRadio(formStructure);
        break;
    }
  }

  generateTextField(formStructure: any): any {
    return (
      <div className="column formElement" key={formStructure.name}>
        <h2>{formStructure.question}</h2>
        <div>{formStructure.description}</div>
        <input type="text" value={formStructure.value} name={formStructure.name} onChange={(e) => { formStructure.value = e.target.value; this.setState({ FormComponents: this.state.FormComponents }); }}></input>
      </div>
    );
  }

  eventTextField(e: React.ChangeEvent<HTMLInputElement>, key: string) {

  }

  generateMultiChoice(formStructure: any): any {
    return (
      <div className="column formElement" key={formStructure.name}>
        <h2>{formStructure.question}</h2>
        <div>{formStructure.description}</div>
        {formStructure.multiChoice.map((element: string) => {
          return (
            <div key={element}>
              <input
                type="checkbox"
                name={formStructure.question}
                value={formStructure.value}
                onChange={(e) => formStructure.value = e.target.value}
              />
              <label htmlFor={element}>{element}</label>
            </div>
          );
        })}
      </div>
    );
  }

  generateRadio(formStructure: any): any {
    return (
      <div className="column formElement" key={formStructure.name}>
        <h2>{formStructure.question}</h2>
        <div>{formStructure.description}</div>
        {formStructure.radio.map((element: string) => {
          return (
            <div key={element}>
              <input
                type="radio"
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

  getSectionByName(branchName: string) {
    let buffer: any;
    FormJson.forEach((element: any) => {
      if (element.branchName === branchName) {
        buffer = element;
        return;
      }
    });
    return buffer;
  }

  nextPage() {
    this.setState({ Pagination: this.state.Pagination + 1 });
  }

  previousPage() {
    this.setState({ Pagination: this.state.Pagination - 1 });

  }


  render() {
    this.generateComponent();
    return (
      <div className="column">
        <>
          {this.state.FormComponents[this.state.Pagination].component}
        </>
        <>
          {this.state.FormComponents[this.state.Pagination].formStructure.map((element: any) => element.component)}
        </>
        <div>
          <button disabled={this.state.Pagination === 0} onClick={this.previousPage.bind(this)}>Previous</button>
          <button onClick={this.nextPage.bind(this)}>Next</button>
        </div>
      </div>
    );
  }
}
/*        */