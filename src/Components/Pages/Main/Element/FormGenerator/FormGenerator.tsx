import React from "react";

import { ProviderInterface } from "../../../../../Providers/ProviderInterface";
import BasicProvider from "../../../../../Providers/BasicProvider";
import FormJson from "../../../../../dataStructure";
import "./formGenerator.css";
import Radio from "./Element/Radio/Radio";
import TextField from "./Element/TextField/TextField";
import MultiChoice from "./Element/MultiChoice/MultiChoice";
import ProgressBar from "../ProgressBar/ProgressBar";

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
      dataStructure: FormJson,
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
    this.sectionsName = [];
    this.state.dataStructure.forEach((element: any) => {
      if (element.isDisplayed) {
        this.sectionsName.push(element.title);
      }
    });
    BasicProvider.setSections(this.sectionsName);
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
      <div className="container-fluid main-section">
        {components[this.state.Pagination]}

        <div className="d-flex justify-content-center p-4">
          <button
            className="btn btn-primary"
            disabled={this.state.Pagination === 0}
            onClick={this.previousPage.bind(this)}
            style={{ marginRight: "10px" }}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
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
