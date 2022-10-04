import React, { ReactElement } from "react";

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
import FilePicker from "./Element/File/FilePicker";

export default class FormGenerator
  extends React.Component<
    {},
    {
      pagination: number;
      dataStructure: typeof FormJson;
      isToolTipDisplayed: boolean;
    }
  >
  implements ProviderInterface
{
  sections: string[] = [];
  isTriggerScrollTop: boolean = false;
  isNextButtonEnable: boolean = false;

  toolTipsNext: ReactElement = (
    <div
      id="tooltip"
      style={{
        position: "absolute",
        backgroundColor: "#f45c54",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      fields with * must be filled
    </div>
  );

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
      setTimeout(() => {
        // uggly solution to avoid bug. window.scrollTo() wouldn't fire without setTimeout
        window.scrollTo(0, 0);
      });
      this.isTriggerScrollTop = false;
      this.setState({ isToolTipDisplayed: false });
    }
  }

  generateComponent(): any[][] {
    let page = 0;
    let components: any[][] = [];
    this.state.dataStructure.form.forEach((branch: any) => {
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

      case "filePicker":
        return (
          <FilePicker
            key={component.name}
            component={component}
            dataStructure={this.state.dataStructure}
            setParenState={this.setState.bind(this)}
          ></FilePicker>
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
    this.state.dataStructure.form.forEach((element: any) => {
      if (element.isDisplayed) {
        this.sections.push(element.title);
      }
    });
    BasicProvider.setSections(this.sections);
  }

  getDisplayedBranchByIndex(index: number): any {
    let iDisplayed = 0;
    let bufferBranch: any = {};
    for (let i = 0; i < this.state.dataStructure.form.length; i++) {
      if (this.state.dataStructure.form[i].isDisplayed && iDisplayed == index) {
        bufferBranch = this.state.dataStructure.form[i];
        break;
      } else if (this.state.dataStructure.form[i].isDisplayed) {
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

  generateJson(): any {
    let jsonAnswer: any = {};
    this.state.dataStructure.form.forEach((branch: any) => {
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
    return jsonAnswer;
  }

  sendForm() {
    this.isTriggerScrollTop = true;
    fetch(this.state.dataStructure.endPoint, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: this.state.dataStructure.header,
      body: JSON.stringify(JSON.stringify(this.generateJson())),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error to send the form");
        return res.json();
      })
      .catch((error: Error) => {
        // console.log(error.message);
        //document.location.href = "https://altyor.fr";
      });
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
            onClick={() => this.setState({ isToolTipDisplayed: true })}
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
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!this.isNextButtonEnable}
                onClick={this.nextPage.bind(this)}
              >
                Next
              </button>
            )}
            {this.state.isToolTipDisplayed && !this.isNextButtonEnable ? (
              this.toolTipsNext
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}
