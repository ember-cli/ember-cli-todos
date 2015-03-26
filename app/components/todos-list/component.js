import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  actions: {
    patchTodo(todo, propertyName, propertyValue) {
      this.sendAction('actionPatchTodo', todo, propertyName, propertyValue);
    },
    deleteTodo(todo) {
      this.sendAction('actionDeleteTodo', todo);
    }
  }
});
