import logger from './logger';
const log = logger.create('Sockets');

// TODO actually implement this...
export function emit(event, data, callback) {
  log.debug(`Emitting ${event}`, data);
}
