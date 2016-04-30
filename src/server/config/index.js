// functions:

// Load
// All the config files (prod, dev, def, user, etc)

// Save
// The user config to file

// Get
// All or a specific value
import mkdirp from 'mkdirp';

import defaults from './defaults';
import { development, production } from './environments';

export function get() {
  const environment = defaults.env === 'production' ? production : development;

  // TODO include User config?
  return Object.assign(defaults, environment);
}

export default { get };
