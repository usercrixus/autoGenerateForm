import React, { Profiler } from "react";

import ProviderInterface from "../../Providers/BasicProvider";
import BasicProvider from "../../Providers/BasicProvider";

export default class HelloWorld
  extends React.Component
  implements ProviderInterface
{
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

  onRenderCallback(
    id: any, // the "id" prop of the Profiler tree that has just committed
    phase: any, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration: any, // time spent rendering the committed update
    baseDuration: any, // estimated time to render the entire subtree without memoization
    startTime: any, // when React began rendering this update
    commitTime: any, // when React committed this update
    interactions: any // the Set of interactions belonging to this update
  ) {
    console.log(id + " " + phase + " " + interactions);
  }

  render() {
    return (
      <Profiler id="helloworld" onRender={this.onRenderCallback}>
        <span>HELLO WORLD</span>
      </Profiler>
    );
  }
}
