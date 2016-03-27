import './header.scss';
import templateUrl from './header.tpl.html';

const content = {
  title: 'Hoog IT',
  subtitle: 'Software Development',
  tagline: '"Don\'t just do it, Hoog it." - Obama',
  image: 'http://placehold.it/300x300',
  icons: [
    {
      link: 'https://github.com/jordond',
      icon: 'fa-github'
    },
    {
      link: 'https://play.google.com/store/apps/developer?id=Jordon%20de%20Hoog&hl=en',
      icon: 'fa-android'
    },
    {
      link: 'http://jordondehoog.ca',
      icon: 'fa-user'
    }
  ]
};

/* eslint indent: 0 */
const template = [
].join('');

function controller() {
  this.content = content;
}

const component = {
  bindings: {},
  templateUrl,
  controller
};
console.log(templateUrl);

export default component;
