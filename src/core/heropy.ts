// Component
interface ComponentPayload {
  tagName?: string;
  props?: {
    [key: string]: unknown
  };
  state?: {
    [key: string]: unknown
  };
}

export class Component {
  public el
  public props
  public state
  
  constructor(payload: ComponentPayload = {}) {
    const { 
      tagName = 'div',      // 최상위 요소의 태그 이름
      state = {},
      props = {}
    } = payload; 
    this.el = document.createElement(tagName);    // 컴포넌트의 최상위 요소
    this.state = state;                           // 컴포넌트가 사용될 때 부모 컴포넌트에서 받는 데이터
    this.props = props;                           // 컴포넌트 안에서 사용할 데이터
    this.render();
  }
  render() {    // 컴포넌트를 렌더링하는 함수
    // ...
  }  
}


// Router
function routeRender(routes) {
  // 접속할 때 해시 모드가 아니면(해시가 없으면) /#/로 리다이렉트!
  if(!location.hash) {
    // replaceState(상태정보, 페이지의 제목, 변경할 url주소)
    // history 내역에 기록을 남기지 않으면서 페이지 이동을 해주는 메소드
    history.replaceState(null, '', '/#/');
  }
  const routerView = document.querySelector('router-view');
  // #/ 부터 뒤의 url을 모두 가져올 수 있다. 
  // 쿼리 스트링이 있을 경우 쿼리 스트링 직전까지 갖고온다.
  const [hash, queryString = ''] = location.hash.split('?');  // 물음표를 기준으로 해시 정보와 쿼리스트링을 구분

  // a=123&b=456
  // ['a=123', 'b=456']
  // a: '123', b: '456'
  // 1) 쿼리스트링을 객체로 변환해 히스토리의 상태에 저장!
  const query = queryString
    .split('&')
    .reduce((acc, cur) => {
      const [key, value] = cur.split('=');
      acc[key] = value;
      return acc;
    }, {});
  history.replaceState(query, '');    // (상태, 제목)

  // 2) 현재 라우트 정보를 찾아서 렌더링!
  // find 메소드로 url이 일치하는 route를 currentRoute에 할당한다.
  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
  routerView.innerHTML = ''
  routerView.append(new currentRoute.component().el);

  // 페이지가 바뀔 때 스크롤을 최상단으로 맞춰줄 수 있다.
  window.scrollTo(0, 0);
}

export function createRouter(routes) {
  // 원하는(필요한) 곳에서 호출할 수 있도록 함수 데이터를 반환!
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

// Store
export class Store {
  constructor(state) {
    this.state = {};      // 상태(데이터)
    this.observers = {};

    for(const key in state) {
      Object.defineProperty(this.state, key, {
        // get 함수는 객체 데이터에 지정하는 key 값을 사용할 떄 동작
        get: () => state[key],     // state[message]
        // set 함수는 객체 데이터의 특정 속성에 값을 할당할 때 동작
        set: val => {
          state[key] = val;
          // 데이터가 변경이 되면 observers[key]에 할당한 함수 호출
          // observer는 배열에 등록된 각각의 콜백함수들
          if(Array.isArray(this.observers[key])) {  // 호출할 콜백이 있는 경우
            this.observers[key].forEach((observer) => observer(val));
          }
        }
      });
    }
  }
  // 데이터를 감시하는 메소드
  // 어떤 데이터의 key를 감시하고 감시를 하다가 데이터가 변경되면 cb 함수 실행
  subscribe(key, cb) {
    // observers에 실행할 콜백 함수를 저장
    // observers[key]가 배열 데이터인지 확인
    // { message: [cb1, cb2, cb3, ...] }
    Array.isArray(this.observers[key])
    ? this.observers[key].push(cb)  // array라면 기존 배열 뒤에 push로 콜백함수 집어넣기
    : this.observers[key] = [cb]    // array가 아니라면 배열 데이터를 할당

    // 예시)
    // observers = {
    //   구독할상태이름: [실행할콜백1, 실행할콜백2]
    //   movies: [cb, cb, cb],
    //   message: [cb]
    // }
  }
}