import { Store } from '../core/heropy';

interface State {
  photo: string;
  name: string;
  email: string;
  blog: string;
  github: string;
  repository: string;
}

export default new Store<State>({
  photo: 'https://i.ibb.co/p3pYK3m/bondee-profile.png',
  name: 'KimSeoYeon',
  email: 'tjdus3431@daum.net',
  blog: 'https://sy-developer.notion.site/Dev-77134d22850b420eaa856affa95c0fad',
  github: 'https://github.com/KimSeoYeon23',
  repository: 'https://github.com/KimSeoYeon23/fc-movie-app'
});