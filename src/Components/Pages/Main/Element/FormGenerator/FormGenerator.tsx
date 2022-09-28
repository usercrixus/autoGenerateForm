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
      isToolTipDisplayed: boolean;
    }
  >
  implements ProviderInterface {
  sections: string[] = [];
  isTriggerScrollTop: boolean = false;
  isNextButtonEnable: boolean = false;
  constructor(props: any) {
    super(props);
    this.state = {
      pagination: 0,
      dataStructure: FormJson,
      isToolTipDisplayed: false,
    };
  }

  componentDidMount() {
    this.generateSectionTab();
    BasicProvider.setSections(this.sections);
    BasicProvider.setSectionsRank(this.state.pagination);
  }
  componentWillUnmount() { }

  rerender() {
    this.forceUpdate();
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{ pagination: number; dataStructure: typeof FormJson; }>,
    snapshot?: any
  ): void {
    if (this.isTriggerScrollTop) {
      document.documentElement.scrollTop = document.documentElement.scrollHeight;
      window.scrollTo(0, 0);
      this.isTriggerScrollTop = false;
      this.setState({ isToolTipDisplayed: false });
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
    this.isTriggerScrollTop = true;
    BasicProvider.setSectionsRank(this.state.pagination + 1);
    this.setState({ pagination: this.state.pagination + 1 });
  }

  previousPage() {
    this.isTriggerScrollTop = true;
    BasicProvider.setSectionsRank(this.state.pagination - 1);
    this.setState({ pagination: this.state.pagination - 1 });
  }

  getDisplayedBranchByIndex(index: number): any {
    let iDisplayed = 0;
    let bufferBranch: any = {};
    for (let i = 0; i < this.state.dataStructure.length; i++) {
      if (this.state.dataStructure[i].isDisplayed && iDisplayed == index) {
        bufferBranch = this.state.dataStructure[i];
        break;
      } else if (this.state.dataStructure[i].isDisplayed) {
        iDisplayed++;
      }
    }
    return bufferBranch;
  }

  isRequired(component: any) {
    return component.question.endsWith("*");
  }

  isEnableByRequiredInput(): boolean {
    let isEnable: boolean = true;
    let branch: any = this.getDisplayedBranchByIndex(
      BasicProvider.sectionsRank
    );
    branch.components.forEach((component: any) => {
      if (this.isRequired(component)) {
        if (component.inputType === "multiChoice") {
          if (!component.value.includes(true)) {
            isEnable = false;
            return;
          }
        } else {
          if (component.value.length === 0) {
            isEnable = false;
            return;
          }
        }
      }
    });
    return isEnable;
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
    this.isNextButtonEnable = this.isEnableByRequiredInput();
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
          <div
            onMouseEnter={() => this.setState({ isToolTipDisplayed: true })}
            onMouseMove={(e) => {
              let element = document.getElementById("tooltip");
              if (element) {
                element!.style.left = e.pageX + "px";
                element!.style.top = e.pageY + "px";
              }
            }}
            onMouseLeave={() => this.setState({ isToolTipDisplayed: false })}
          >
            {this.sections.length - 1 === this.state.pagination ? (
              <button
                className="btn btn-primary"
                onClick={this.sendForm.bind(this)}
                disabled={!this.isNextButtonEnable}
              >
                Send
                {this.state.isToolTipDisplayed && !this.isNextButtonEnable ? (
                  <div
                    id="tooltip"
                    style={{
                      position: "absolute",
                      backgroundColor: "red",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    fields with * must be filled
                  </div>
                ) : (
                  <></>
                )}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!this.isNextButtonEnable}
                onClick={this.nextPage.bind(this)}
              >
                Next
                {this.state.isToolTipDisplayed && !this.isNextButtonEnable ? (
                  <div
                    id="tooltip"
                    style={{
                      position: "absolute",
                      backgroundColor: "red",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    fields with * must be filled
                  </div>
                ) : (
                  <></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
