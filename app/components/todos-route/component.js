import Ember from 'ember';

const {
  Component,
  computed,
  computed: { filterBy },
  inject: { service }
} = Ember;

export default Component.extend({
  store: service(),

  filtered: computed('todos.@each.isCompleted', 'filter', function() {
    switch(this.get('filter')) {
    case 'active':
      return this.get('active');
    case 'completed':
      return this.get('completed');
    default:
      return this.get('todos');
    }
  }),

  completed: filterBy('todos', 'isCompleted', true),
  active: filterBy('todos', 'isCompleted', false),
  allAreDone: computed.empty('active'),

  inflection: computed('active.length', function() {
    let active = this.get('active.length');
    return active === 1 ? 'item' : 'items';
  }).readOnly(),

  actions: {
    createTodo(title) {
      let store = this.get('store');

      if (title && !title.trim()) {
        this.set('newTitle', '');
        return;
      }

      // Create the new Todo model
      let todo = store.createRecord('todo', {
        title: title
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    },

    completeAll() {
      let todos = this.get('todos');
      let allAreDone = this.get('allAreDone');

      todos.setEach('isCompleted', !allAreDone);
      todos.invoke('save');
    },

    clearCompleted() {
      let completed = this.get('completed');

      completed
        .toArray() // clone the array, so it is not bound while we iterate over and delete.
        .invoke('destroyRecord');
    }
  }
});
