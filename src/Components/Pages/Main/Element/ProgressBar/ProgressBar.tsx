import React from "react";

import { ProviderInterface } from "../../../../../Providers/ProviderInterface";
import BasicProvider from "../../../../../Providers/BasicProvider";
import "./progressBar.css";

export default class FormGenerator
  extends React.Component<{}, { progressPercent: number }>
  implements ProviderInterface
{
  constructor(props: any) {
    super(props);
    this.state = {
      progressPercent: 0,
    };
  }

  componentDidMount() {
    BasicProvider.subscribe(this);
  }
  componentWillUnmount() {
    BasicProvider.unsubscribe(this);
  }
  rerender() {
    this.setState({
      progressPercent:
        ((BasicProvider.sectionsRank + 1) / BasicProvider.sections.length) *
        100,
    });

    let progressPercent =
      ((BasicProvider.sectionsRank + 1) / BasicProvider.sections.length) * 100;
    let bufferWidth: number =
      document.getElementById("progressBar")!.offsetWidth;
    let browserWidth: number = document.body.offsetWidth;
    let percentWidth: number = (bufferWidth / browserWidth) * 100;

    if (percentWidth < progressPercent) {
      this.increaseBar(percentWidth, progressPercent);
    } else {
      this.decreaseBar(percentWidth, progressPercent);
    }
  }

  increaseBar(percentWidth: number, targetedWidth: number) {
    setTimeout(() => {
      document.getElementById("progressBar")!.style.width =
        percentWidth + 2 + "%";
      if (percentWidth + 2 < targetedWidth) {
        this.increaseBar(percentWidth + 2, targetedWidth);
      }
    }, 15);
  }

  decreaseBar(percentWidth: number, targetedWidth: number) {
    setTimeout(() => {
      document.getElementById("progressBar")!.style.width =
        percentWidth - 2 + "%";
      if (percentWidth - 2 > targetedWidth) {
        this.decreaseBar(percentWidth - 2, targetedWidth);
      }
    }, 15);
  }

  render() {
    return (
      <div className="container-progressBar">
        <div
          id="progressBar"
          style={{
            height: "8px",
            width: "0px",
          }}
          className="backgroundColor"
        ></div>
      </div>
    );
  }
}
