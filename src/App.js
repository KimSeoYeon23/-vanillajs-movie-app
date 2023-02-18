import { Component } from "./core/heropy";
import TheHeader from "./components/TheHeader";

export default class App extends Component {
  render() {
    // 나만의 요소를 만드는 경우 꼭 대시 기호를 사용하여 두 단어로 사용해야 한다.
    const routerView = document.createElement('router-view');
    this.el.append(
      new TheHeader().el,
      routerView
    );
  }
}