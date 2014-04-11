var Router = Ember.Router.extend({
  rootURL: ENV.rootURL,
  location: 'auto'
}); // ensure we don't share routes between all Router instances

Router.map(function(){
  this.resource('todos', { path: '/' }, function() {
    // additional child routes
    this.route('active');
    this.route('completed');
  });
});

export default Router;
