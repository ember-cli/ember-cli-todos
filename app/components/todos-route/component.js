import Ember from 'ember';

const {
  Component,
  isEmpty,
  computed,
  computed: { filterBy },
  inject: { service }
} = Ember;

export default Component.extend({
  store: service(),

  filtered: computed('todos.@each.isCompleted', 'filter', function() {
    var filter = this.get('filter');
    var all = this.get('todos');

    if (filter === 'all') { return all; }

    return all.filterBy('isCompleted', filter === 'completed');
  }),

  completed: filterBy('todos', 'isCompleted', true),
  active: filterBy('todos', 'isCompleted', false),

  inflection: computed('active.[]', function() {
    var active = this.get('active.length');
    return active === 1 ? 'item' : 'items';
  }).readOnly(),

  allAreDone: computed('filtered.@each.isCompleted', {
    get() {
      return !isEmpty(this) && this.get('todos.length') === this.get('completed.length');
    },
    set(key, value) {
      // TODO: use action instead of a 2 way CP
      var todos = this.get('todos');
      todos.setEach('isCompleted', value);
      todos.invoke('save');
      return value;
    }
  }),

  actions: {
    createTodo() {
      const store = this.get('store');

      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');

      if (title && !title.trim()) {
        this.set('newTitle', '');
        return;
      }

      // Create the new Todo model
      var todo = store.createRecord('todo', {
        title: title
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    },

    clearCompleted() {
      var completed = this.get('completed');

      completed.toArray(). // clone the array, so it is not bound while we iterate over and delete.
        invoke('deleteRecord').
        invoke('save');
    }
  },
});
