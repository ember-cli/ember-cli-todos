import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['todo.isCompleted:completed', 'isEditing:editing'],

  init() {
    this._super(...arguments);
    this.set('isEditing', false);
  },

  actions: {
    editTodo() {
      this.set('isEditing', true);
    },

    save(todo, title) {
      this.set('isEditing', false);

      todo.set('title', title);
      todo.save();
    },

    removeTodo(todo) {
      todo.destroyRecord();
    },

    toggleCompleteTodo(todo) {
      todo.toggleProperty('isCompleted');
      todo.save();
    }
  }
});
