import angular from 'angular';

const privates = new WeakMap();

class DoctorsApi {
  /** @ngInject */
  constructor($http, $q) {
    privates.set(this, { $http, $q });
  }

  all() {
    return privates.get(this).$http.get('/api/doctors')
      .then((response) => response.data)
      .catch((err) => {
        console.log('[DoctorsService] all() failed', err);
        return privates.get(this).$q.reject(err);
      });
  }

  create(doctor) {
    // POST /doctors
    return privates.get(this).$http.post('/api/doctors', doctor)
      .then((response) => response.data)
      .catch((err) => {
        console.log('[DoctorsService] create() failed', err);
        return privates.get(this).$q.reject(err.data.message);
      });
  }

  update(doctor) {
    // POST /doctors/:id
  }

  get(id) {
    // GET /doctors/:id
  }

  destroy(doctor) {
    // DELETE /doctors/:id
  }

  scrape(doctor) {
    // GET /doctors/:id/scrape
  }
}

export default DoctorsApi;
