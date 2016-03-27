/**
 * Container component that displays each divided part from
 * UI components.
 */
import './main.scss';

/* eslint indent: 0 */
const template = [
  '<div>',
    'Hello {{$ctrl.name || World}}',
  '</div>'
].join('');

const mainComponent = {
  bindings: {
    name: '@'
  },
  template
};

export default mainComponent;
