import { Component } from '../core/heropy';
import aboutStore from '../store/about';

interface State {
  [key: string]: unknown;
  menus: {
    name: string;
    href: string;
  }[];
}


export default class TheHeader extends Component {
  public state!: State; 
  // state는 초기화가 필요한데, 할당 단언을 통해서 초기화가 된 것처럼 판단을 할 수 있다.
  
  constructor() {
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Search',
            href: '#/',
          },
          {
            name: 'Movie',
            href: '#/movie?id=tt4520988'
          },
          {
            name: 'About',
            href: '#/about'
          }
        ]
      }
    });
    window.addEventListener('popstate', () => {
      this.render();
    })
  }

  render() {
    const { photo } = aboutStore.state;
    this.el.innerHTML = /* html */ `
      <a href='#/' class='logo'>
        <span>OMDbAPI</span>.COM  
      </a>
      <nav>
        <ul>
          ${
            this.state.menus.map((menu) => {
              const href = menu.href.split('?')[0];
              const hash = location.hash.split('?')[0];
              const isActive = href === hash;
              return /* html */`
                <li>
                  <a class="${isActive ? 'active' : ''}" href=${menu.href}>
                    ${menu.name}
                  </a>
                </li>
              `
            }).join('')
          }
        </ul>
      </nav>
      <a href='#/about' class='user'>
        <img src="${photo}" alt="User" />
      </a>
    `
  }
}
