// views/edit-todo.js
import Ember from 'ember';

export default Ember.TextField.extend({
  didInsertElement() {
    this.$().focus();
    this.$().addClass('focus'); // headless testing is brittle
  }
});
