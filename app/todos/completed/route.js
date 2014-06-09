// routes/todos/completed.js
import Ember from 'ember';
export default Ember.Route.extend({
  model: function(){
    return this.store.filter('todo', completed);
  },
  renderTemplate: function(controller){
    this.render('todos/index', { controller: controller });
  }
});

function completed(todo) {
  return todo.get('isCompleted');
}
