import React from "react";

import { ProviderInterface } from "../../../../../Providers/ProviderInterface";
import BasicProvider from "../../../../../Providers/BasicProvider";
import FormJson from "../../../../../dataStructure";
import "./formGenerator.css";
import Radio from "./Element/Radio/Radio";
import TextField from "./Element/TextField/TextField";
import MultiChoice from "./Element/MultiChoice/MultiChoice";
import ProgressBar from "../ProgressBar/ProgressBar";
import Select from "./Element/Select/Select";
import TextArea from "./Element/TextArea/TextArea";

export default class FormGenerator
  extends React.Component<
    {},
    {
      pagination: number;
      dataStructure: typeof FormJson;
    }
  >
  implements ProviderInterface
{
  sections: string[] = [];
  isTriggerScrollTop: boolean = false;

  constructor(props: any) {
    super(props);
    this.state = {
      pagination: 0,
      dataStructure: FormJson,
    };
  }

  componentDidMount() {
    this.generateSectionTab();
    BasicProvider.setSections(this.sections);
    BasicProvider.setSectionsRank(this.state.pagination);
  }
  componentWillUnmount() {}

  rerender() {
    this.forceUpdate();
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{ pagination: number; dataStructure: typeof FormJson }>,
    snapshot?: any
  ): void {
    if (this.isTriggerScrollTop) {
      window.scrollTo(0, 0);
      this.isTriggerScrollTop = false;
    }
  }

  generateComponent(): any[][] {
    let page = 0;
    let components: any[][] = [];
    this.state.dataStructure.forEach((branch: any) => {
      if (branch.isDisplayed) {
        components.push([]);
        components[page].push(
          <h1 className="text-center" key={branch.branch}>
            {branch.title}
          </h1>
        );
        branch.components.forEach((component: any) => {
          components[page].push(this.dispatchInputType(component));
        });
        page++;
      }
    });
    return components;
  }

  dispatchInputType(component: any): any {
    switch (component.inputType) {
      case "textField":
        return (
          <TextField
            key={component.name}
            dataStructure={this.state.dataStructure}
            component={component}
            setParenState={this.setState.bind(this)}
          ></TextField>
        );
        break;

      case "multiChoice":
        return (
          <MultiChoice
            key={component.name}
            component={component}
            dataStructure={this.state.dataStructure}
            generateSectionTab={this.generateSectionTab.bind(this)}
            setParenState={this.setState.bind(this)}
          ></MultiChoice>
        );
        break;

      case "select":
        return (
          <Select
            key={component.name}
            component={component}
            dataStructure={this.state.dataStructure}
            generateSectionTab={this.generateSectionTab.bind(this)}
            setParenState={this.setState.bind(this)}
          ></Select>
        );
        break;

      case "textArea":
        return (
          <TextArea
            key={component.name}
            component={component}
            dataStructure={this.state.dataStructure}
            setParenState={this.setState.bind(this)}
          ></TextArea>
        );
        break;

      default:
        return (
          <Radio
            key={component.name}
            component={component}
            dataStructure={this.state.dataStructure}
            generateSectionTab={this.generateSectionTab.bind(this)}
            setParenState={this.setState.bind(this)}
          ></Radio>
        );
        break;
    }
  }

  generateSectionTab() {
    this.sections = [];
    this.state.dataStructure.forEach((element: any) => {
      if (element.isDisplayed) {
        this.sections.push(element.title);
      }
    });
    BasicProvider.setSections(this.sections);
  }

  nextPage() {
    BasicProvider.setSectionsRank(this.state.pagination + 1);
    this.setState({ pagination: this.state.pagination + 1 });
    this.isTriggerScrollTop = true;
  }

  previousPage() {
    BasicProvider.setSectionsRank(this.state.pagination - 1);
    this.setState({ pagination: this.state.pagination - 1 });
    this.isTriggerScrollTop = true;
  }

  sendForm() {
    let jsonAnswer: any = {};
    this.state.dataStructure.forEach((branch: any) => {
      if (branch.isDisplayed) {
        branch.components.forEach((component: any) => {
          if (
            component.inputType === "textField" ||
            component.inputType === "radio" ||
            component.inputType === "textArea"
          ) {
            jsonAnswer[component.name] = component.value;
          }
          if (component.inputType === "multiChoice") {
            if (component.value.includes(true)) jsonAnswer[component.name] = [];
            for (let i = 0; i < component.multiChoice.length; i++) {
              if (component.value[i] == true) {
                jsonAnswer[component.name].push(component.multiChoice[i]);
              }
            }
          }
        });
      }
    });
    console.log(jsonAnswer);
  }

  render() {
    let components = this.generateComponent();
    return (
      <div className="container-fluid main-section">
        {components[this.state.pagination]}

        <div className="d-flex justify-content-center p-4">
          <button
            className="btn btn-primary"
            disabled={this.state.pagination === 0}
            onClick={this.previousPage.bind(this)}
            style={{ marginRight: "10px" }}
          >
            Precedent
          </button>
          {this.sections.length - 1 === this.state.pagination ? (
            <button
              className="btn btn-primary"
              onClick={this.sendForm.bind(this)}
            >
              Envoyer
            </button>
          ) : (
            <button
              className="btn btn-primary"
              disabled={this.sections.length - 1 === this.state.pagination}
              onClick={this.nextPage.bind(this)}
            >
              Suivant
            </button>
          )}
        </div>
      </div>
    );
  }
}
