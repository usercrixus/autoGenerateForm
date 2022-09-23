import React, { Component, Profiler, ReactElement } from "react";

import { ProviderInterface } from "../../../../../Providers/ProviderInterface";
import BasicProvider from "../../../../../Providers/BasicProvider";
import FormJson from "../../../../../dataStructure";
import "./formGenerator.css";

export default class FormGenerator
  extends React.Component<
    {},
    {
      Pagination: number;
      dataStructure: typeof FormJson;
    }
  >
  implements ProviderInterface
{
  sectionsName: string[] = [];

  constructor(props: any) {
    super(props);
    this.state = {
      Pagination: 0,
      dataStructure: JSON.parse(JSON.stringify(FormJson)),
    };
  }

  componentDidMount() {
    this.generateSectionTab();
    BasicProvider.setSections(this.sectionsName);
    BasicProvider.setSectionsRank(this.state.Pagination);
  }
  componentWillUnmount() {}
  rerender() {
    this.forceUpdate();
  }

  generateComponent(): any[][] {
    let page = 0;
    let components: any[][] = [];
    this.state.dataStructure.forEach((branch: any) => {
      if (branch.isDisplayed) {
        components.push([]);
        components[page].push(
          <h1 key={branch.branchName}>{branch.sectionName}</h1>
        );
        branch.formStructure.forEach((formStructure: any) => {
          components[page].push(this.dispatchInputType(formStructure));
        });
        page++;
      }
    });
    return components;
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
        <input
          type="text"
          value={formStructure.value}
          name={formStructure.name}
          onChange={(e) => this.eventTextField(e, formStructure)}
        ></input>
      </div>
    );
  }

  eventTextField(e: React.ChangeEvent<HTMLInputElement>, field: any) {
    field.value = e.target.value;
    this.setState({ dataStructure: this.state.dataStructure });
  }

  generateMultiChoice(formStructure: any): any {
    return (
      <div className="column formElement" key={formStructure.name}>
        <h2>{formStructure.question}</h2>
        <div>{formStructure.description}</div>
        {formStructure.multiChoice.map((element: string, index: number) => {
          return (
            <div key={element}>
              <input
                type="checkbox"
                name={formStructure.question}
                value={formStructure.value}
                checked={formStructure.value[index]}
                onChange={(e) => this.eventMultiChoice(e, formStructure, index)}
              />
              <label htmlFor={element}>{element}</label>
            </div>
          );
        })}
      </div>
    );
  }

  eventMultiChoice(
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    index: number
  ) {
    field.value[index] = e.target.checked;
    this.setState({ dataStructure: this.state.dataStructure });
  }

  generateRadio(formStructure: any): any {
    return (
      <div className="column formElement" key={formStructure.name}>
        <h2>{formStructure.question}</h2>
        <div>{formStructure.description}</div>
        {formStructure.radio.map((element: string, index: number) => {
          return (
            <div key={element}>
              <input
                type="radio"
                name={formStructure.question}
                value={element}
                checked={formStructure.value[index]}
                onChange={(e) =>
                  this.eventRadio(e, formStructure, element, index)
                }
              />
              <label htmlFor={element}>{element}</label>
            </div>
          );
        })}
      </div>
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
        this.state.dataStructure.forEach((branch: any) => {
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
    this.generateSectionTab();
    BasicProvider.setSections(this.sectionsName);
    this.setState({ dataStructure: this.state.dataStructure });
  }

  generateSectionTab() {
    this.sectionsName = [];
    this.state.dataStructure.forEach((element: any) => {
      if (element.isDisplayed) {
        this.sectionsName.push(element.sectionName);
      }
    });
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
    BasicProvider.setSectionsRank(this.state.Pagination + 1);
    this.setState({ Pagination: this.state.Pagination + 1 });
  }

  previousPage() {
    BasicProvider.setSectionsRank(this.state.Pagination - 1);
    this.setState({ Pagination: this.state.Pagination - 1 });
  }

  render() {
    let components = this.generateComponent();
    return (
      <div className="col-9">
        <div className="container">
          {components[this.state.Pagination]}
          <button
            disabled={this.state.Pagination === 0}
            onClick={this.previousPage.bind(this)}
          >
            Previous
          </button>
          <button
            disabled={this.sectionsName.length - 1 === this.state.Pagination}
            onClick={this.nextPage.bind(this)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
