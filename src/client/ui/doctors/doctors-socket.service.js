import { remove } from 'lodash';

export class DoctorsSocket {
  /** @ngInject */
  constructor(socketService, doctorsService) {
    this.socket = socketService;
    this.Doctor = doctorsService;
    this.doctors = [];
  }

  activate() {
    return this.Doctor.all().then(response => {
      console.log('Retrieved doctors list');
      this.doctors = response;
      this.register();
    })
    .catch(err => console.error('[DoctorsSocket] Failed to get all doctors'));
  }

  register() {
    this.socket.get().on('doctors:create', (doctor) => this.onCreate(doctor));
    this.socket.get().on('doctors:update', (doctor) => this.onUpdate(doctor));
    this.socket.get().on('doctors:delete', (doctor) => this.onDelete(doctor));
  }

  onCreate(doctor) {
    this.doctors.push(doctor);
    console.log(`[DoctorsSocket][${doctor.name}] was created`);
  }

  onUpdate(doctor) {
    const index = this.doctors.findIndex(d => d.id === doctor.id);
    this.doctors[index] = doctor;
    console.log(`[DoctorsSocket][${doctor.name}] was updated`);
  }

  onDelete(doctor) {
    remove(this.doctors, { id: doctor.id });
    console.log(`[DoctorsSocket][${doctor.name}] was deleted`);
  }
}

export default DoctorsSocket;
