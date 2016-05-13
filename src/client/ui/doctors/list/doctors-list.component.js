import templateUrl from './doctor-list.tpl.html';

// TODO refactor out 'item' to it's own directive

// TODO add animations for the ng-repeat and the search box

function formatDoctor(doctor) {
  return {
    value: doctor.name.toLowerCase(),
    display: doctor.name
  };
}

/** @ngInject */
function controller(doctorsSocket) {
  this.search = { name: '' };
  this.searchIcon = 'search';
  this.searchIconOptions = { rotation: 'clock' };

  this.toggleSearch = () => {
    this.searchVisible = !this.searchVisible;
    this.search.name = '';
    this.searchIcon = this.searchVisible ? 'keyboard_arrow_right' : 'search';
  };

  this.searchQuery = (query) => {
    const doctors = Array.from(this.socket.doctors, x => formatDoctor(x));
    if (query.length < 2) {
      return doctors;
    }
    return doctors.filter(x => x.value.indexOf(query.toLowerCase()) >= 0);
  };

  doctorsSocket.activate().then(() => {
    this.socket = doctorsSocket;
    console.log('DList Activated');
  });
}

const bindings = {};

export default { name: 'doctorsList', bindings, templateUrl, controller };
