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
    return privates.get(this).$http.post('/api/doctors', doctor)
      .then((response) => response.data)
      .catch((err) => {
        const errMsg = err.data.errors ? 'Doctor already exists' : err.data.message;
        console.log('[DoctorsService] create() failed', err);
        return privates.get(this).$q.reject(errMsg);
      });
  }

  update(doctor) {
    // POST /doctors/:id
  }

  get(id) {
    // GET /doctors/:id
  }

  destroy(id) {
    // DELETE /doctors/:id
  }

  scrape(id) {
    // GET /doctors/:id/scrape
    return privates.get(this).$http.get(`/api/doctors/${id}/scrape`)
      .then(response => response.data)
      .catch(err => {
        console.log('[DoctorsService] scrape() failed', err);
        return privates.get(this).$q.reject(err);
      });
  }
}

export default DoctorsApi;
