import { expect } from 'chai';
import app from './index';

/**
 * Call setup method in `test/setup.js` in order to get ngMock to work correctly
 *
 * Can call it here once, or call it in individual unit test files.
 */
setup();

describe('Index module', () => {
  it('should be an Angular object', () => {
    const props = ['name', 'factory', 'service', 'controller', 'directive', 'component', 'config'];
    expect(app).to.be.an('object');
    expect(app).to.contain.all.keys(props);
  });

  it('should be called app', () => {
    expect(app.name).to.equal('app');
  });
});
