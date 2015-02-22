export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');
  application.inject('component', 'store', 'store:main');
}

export default {
  name: 'component-store-injector',
  initialize: initialize
};
