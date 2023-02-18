// Component
export class Component {
  constructor(payload = {}) {
    const { 
      tagName = 'div', 
      state = {},
      props = {}
    } = payload; 
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }
  render() {
    // ...
  }  
}


// Router
function routeRender(routes) {
  if(!location.hash) {
    // replaceState(상태정보, 페이지의 제목, 변경할 url주소)
    // history 내역에 기록을 남기지 않으면서 페이지 이동을 해주는 메소드
    history.replaceState(null, '', '/#/');
  }
  const routerView = document.querySelector('router-view');
  // #/ 부터 뒤의 url을 모두 가져올 수 있다. 
  // 쿼리 스트링이 있을 경우 쿼리 스트링 직전까지 갖고온다.
  const [hash, queryString = ''] = location.hash.split('?');

  // a=123&b=456
  // ['a=123', 'b=456']
  // a: '123', b: '456'
  const query = queryString
    .split('&')
    .reduce((acc, cur) => {
      const [key, value] = cur.split('=');
      acc[key] = value;
      return acc;
    }, {});
  history.replaceState(query, '');

  // find 메소드로 url이 일치하는 route를 currentRoute에 할당한다.
  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
  routerView.innerHTML = ''
  routerView.append(new currentRoute.component().el);

  // 페이지가 바뀔 때 스크롤을 최상단으로 맞춰줄 수 있다.
  window.scrollTo(0, 0);
}

export function createRouter(routes) {
  return function () {
    // popstate는 주소가 바뀌는지 체크
    window.addEventListener('popstate', () => {
      // 페이지의 주소가 바뀔 때마다 호출
      routeRender(routes);
    });
    // 최초 호출 코드
    routeRender(routes);
  }
}