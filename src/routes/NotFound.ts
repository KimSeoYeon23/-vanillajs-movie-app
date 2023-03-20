import { Component } from "../core/heropy";

export default class NotFound extends Component {
  render() {
    this.el.classList.add('container', 'not-found');
    this.el.innerHTML = /* html */ `
      <h1>
        Sorry..<br/>
        Page Not Found.
      </h1>
      <button>← Back</button>
    `
    const btnEl = this.el.querySelector('button');
    btnEl?.addEventListener('click', () => {
      history.back();
    })
  }
}