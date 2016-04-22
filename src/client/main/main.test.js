import { expect } from 'chai';

import { module as main, default as name } from './main.module';
import routes from './main.routes';

describe('Module: Main', () => {
  describe('Module', () => {
    it('should be an Angular object', () => {
      const props = ['name', 'factory', 'service', 'controller', 'directive', 'component', 'config'];
      expect(main).to.be.an('object');
      expect(main).to.contain.all.keys(props);
    });

    it('should have dependencies that are strings', () => {
      expect(main.requires).to.be.an('array').length.above(0);

      for (const dependency of main.requires) {
        expect(dependency).to.be.a('string');
      }
    });

    it('default export should be a string called app.main', () => {
      expect(name).to.be.a('string').and.equal('app.main');
    });
  });

  describe('Routes', () => {
    const stateProviderMock = { state: () => {} };
    it('should return an array of states', () => {
      const states = routes(stateProviderMock);
      expect(states).to.be.an('array');
      for (const state of states) {
        expect(state).to.contain.all.keys(['state', 'config']);
      }
    });
  });

  const mockName = 'John Doe';

  describe('Component', () => {
    describe('Element', () => {
      let scope, element = undefined;
      beforeEach(() => {
        angular.mock.module(name);
        global.inject(($rootScope, $compile) => {
          scope = $rootScope.$new();
          element = angular.element('<main name="{{mockName}}"></main>');
          element = $compile(element)(scope);
          scope.mockName = mockName;
          scope.$apply();
        });
      });

      it('should render the text', () => {
        const div = element.find('div');
        expect(div.text()).to.equal(`Hello ${mockName}`);
      });
    });

    describe('Controller', () => {
      let controller, scope = undefined;
      beforeEach(angular.mock.module(name));
      beforeEach(global.inject(($rootScope, $componentController) => {
        scope = $rootScope.$new();
        controller = $componentController('main', { $scope: scope }, { name: mockName });
      }));

      it('should have bindings bound', () => {
        expect(controller.name).to.exist;
        expect(controller.name).to.equal(mockName);
      });
    });
  });
});
