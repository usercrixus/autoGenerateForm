import { ProviderInterface } from "./ProviderInterface";

export default class BasicProvider {
  static subscribers: ProviderInterface[] = [];

  static sectionsRank: number = 0;
  static sections: string[] = [];

  static subscribe(subscriber: ProviderInterface) {
    BasicProvider.subscribers.push(subscriber);
  }

  static unsubscribe(subscriber: ProviderInterface) {
    BasicProvider.subscribers.splice(
      BasicProvider.subscribers.indexOf(subscriber),
      1
    );
  }

  static notify() {
    BasicProvider.subscribers.forEach((subscriber) => {
      subscriber.rerender();
    });
  }

  static setSectionsRank(value: number) {
    BasicProvider.sectionsRank = value;
    BasicProvider.notify();
  }

  static setSections(value: string[]) {
    BasicProvider.sections = value;
    BasicProvider.notify();
  }
}
