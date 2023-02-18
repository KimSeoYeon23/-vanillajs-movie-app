import { Component } from "../core/heropy";

export default class About extends Component {
  render() {
    const { id, pw } = history.state;
    this.el.innerHTML = /* html */ `
      <h1>About Page!</h1>
      <h2>${id}</h2>
      <h2>${pw}</h2>
    `
  }
}