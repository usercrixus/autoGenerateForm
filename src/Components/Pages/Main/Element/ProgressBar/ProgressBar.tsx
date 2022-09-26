import React from "react";

import { ProviderInterface } from "../../../../../Providers/ProviderInterface";
import BasicProvider from "../../../../../Providers/BasicProvider";
import "./progressBar.css";

export default class FormGenerator
  extends React.Component<{}, { progressPercent: number; }>
  implements ProviderInterface {

  constructor(props: any) {
    super(props);
    this.state = {
      progressPercent: 0
    };
  }

  componentDidMount() {
    BasicProvider.subscribe(this);
  }
  componentWillUnmount() {
    BasicProvider.unsubscribe(this);
  }
  rerender() {
    this.setState({ progressPercent: (BasicProvider.sectionsRank + 1) / (BasicProvider.sections.length) * 100 });
  }

  render() {
    return (
      <div className="p-0 h-100">
        <div style={{ height: "3px", backgroundColor: "green", width: this.state.progressPercent + "%" }} className="backgroundColor">
        </div>
      </div>
    );
  }
}
