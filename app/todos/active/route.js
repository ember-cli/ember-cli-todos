// routes/todos/active.js
export default Ember.Route.extend({
  model: function(){
    return this.store.filter('todo', active);
  },
  renderTemplate: function(controller){
    this.render('todos/index', {controller: controller});
  }
});

function active(todo) {
  return !todo.get('isCompleted');
}
