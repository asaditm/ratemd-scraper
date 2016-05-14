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
    return privates.get(this).$http.delete(`/api/doctors/${id}`)
      .then(response => {
        // TODO handle error message / toast?
        console.log(`Deleted ${id}`);
        return response.data;
      }).catch(err => {
        console.log('[DoctorsService] delete() failed', err);
        return privates.get(this).$q.reject(err);
      });
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

  scrapeAll() {
    return privates.get(this).$http.get('/api/scraper/all')
      .then(response => response.data)
      .catch(err => {
        console.log('[DoctorsService] scrapeAll() failed', err);
        return privates.get(this).$q.reject(err);
      });
  }
}

export default DoctorsApi;
