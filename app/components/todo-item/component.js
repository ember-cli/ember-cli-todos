import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['todo.isCompleted:completed', 'isEditing:editing'],

  isCompleted: Ember.computed.oneWay('todo.isCompleted'),
  title: Ember.computed.oneWay('todo.title'),

  init() {
    this._super(...arguments);
    this.set('isEditing', false);
  },

  actions: {
    editTodo() {
      this.set('isEditing', true);
    },

    removeTodo() {
      this.sendAction('actionDeleteTodo', this.get('todo'));
    },

    titleChange() {
      this.set('isEditing', false);
      this.sendAction('actionPatchTodo', this.get('todo'), 'title', this.get('title'));
    },

    isCompletedChange(checked) {
      this.sendAction('actionPatchTodo', this.get('todo'), 'isCompleted', checked);
    }
  },
});