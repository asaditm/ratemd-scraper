/* eslint indent: 0 */
const template = [
  '<div layout="row" layout-align="center center">',
    '<scraper-toggle id="$ctrl.id"></scraper-toggle>',
    '<icon-button icon="open_in_new" fill="green" action="$ctrl.edit($event)"></icon-button>',
    '<icon-button icon="delete" fill="red" action="$ctrl.deleteAlert($event)"></icon-button>',
  '</div>'
].join('');

const bindings = {
  id: '<'
};

// TODO switch all buttons to font awesome ones to match the scraper toggle

/** @ngInject */
function controller($scope, scraperSocket) {
  function edit(targetEvent) {
    console.log('edit');
  }

  function deleteAlert(targetEvent) {
    console.log('delete');
  }

  this.edit = edit;
  this.deleteAlert = deleteAlert;
}

export default { name: 'quickActions', template, bindings, controller };
