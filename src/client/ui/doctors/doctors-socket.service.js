const socket = new WeakMap();

export class DoctorSocket {
  /** @ngInject */
  constructor(socketService) {
    socket.set(this, socketService);
    this.doctors = [];
  }

  register() {
    socket.on('doctors:save', (doctor) => this.onSave(doctor));
    socket.on('doctors:delete', (doctor) => this.onDelete(doctor));
  }

  onSave(doctor) {

  }

  onDelete(doctor) {

  }
}

export default DoctorSocket;
