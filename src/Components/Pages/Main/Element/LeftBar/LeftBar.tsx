import React from "react";

import { ProviderInterface } from "../../../../../Providers/ProviderInterface";
import BasicProvider from "../../../../../Providers/BasicProvider";
import "./leftBar.css";

export default class FormGenerator
  extends React.Component
  implements ProviderInterface {
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

  render() {
    return (
      <div className="left-section bg-white">
        <ul>
          {BasicProvider.sections.map((element, index: number) => {
            return (
              <li
                key={element}
                className={
                  BasicProvider.sectionsRank >= index ? "selected" : ""
                }
              >
                {element}
              </li>
            );
          })}
        </ul>
      </div>

    );
  }
}
