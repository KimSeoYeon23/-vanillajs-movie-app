import { Component } from '../core/heropy';

export default class Footer extends Component {
  constructor() {
    super({
      tagName: 'footer'
    })
  }
  render() {
    this.el.innerHTML = /* html */ `
      <div>
        <a href="https://github.com/KimSeoYeon23/fc-movie-app" target='_blank'>
          GitHub Repository
        </a>
      </div>
      <div>
        <a href="https://github.com/KimSeoYeon23/" target='_blank'>
          ${new Date().getFullYear()}
          KimSeoYeon
        </a>
      </div>
    `
  }
}
