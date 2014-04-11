// routes/todos.js
export default Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});
