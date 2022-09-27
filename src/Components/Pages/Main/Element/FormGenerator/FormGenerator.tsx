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
            dataStructure={this.state.dataStructure}
            component={component}
            setParenState={this.setState.bind(this)}
          ></TextField>
        );
        break;

      case "multiChoice":
        return (
          <MultiChoice
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
            component={component}
            dataStructure={this.state.dataStructure}
            setParenState={this.setState.bind(this)}
          ></TextArea>
        );
        break;

      default:
        return (
          <Radio
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
  }

  previousPage() {
    BasicProvider.setSectionsRank(this.state.pagination - 1);
    this.setState({ pagination: this.state.pagination - 1 });
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
            Previous
          </button>
          <button
            className="btn btn-primary"
            disabled={this.sections.length - 1 === this.state.pagination}
            onClick={this.nextPage.bind(this)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
