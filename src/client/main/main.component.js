/**
 * Container component that displays each divided part from
 * UI components.
 */
import './main.scss';

/* eslint indent: 0 */
const template = [
  '<div class="main" layout="row" layout-align="center center">',
    '<md-card flex-gt-sm="90" flex-gt-md="80">',
      '<md-card-content>',
        '<h2>Monitored Doctors</h2>',
        '<doctors-list></doctors-list>',
      '</md-card-content>',
    '</md-card>',
  '</div>'
].join('');

const mainComponent = {
  bindings: {
    name: '@'
  },
  template
};

export default mainComponent;
