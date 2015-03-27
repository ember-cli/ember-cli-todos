import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  classNames: ['todo-checkbox'],
  attributeBindings: [
    'type',
    'checked',
    'indeterminate',
    'disabled',
    'tabindex',
    'name',
    'autofocus',
    'required',
    'form'
  ],

  type: 'checkbox',
  checked: false,
  disabled: false,
  indeterminate: false,

  didInsertElement() {
    this.get('element').indeterminate = !!this.get('indeterminate');
  },

  change() {
    var checked = this.$().prop('checked');
    // this.set('checked', checked);
    this.sendAction('action', checked);
  }
});