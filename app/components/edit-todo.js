// views/edit-todo.js
export default Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
    this.$().addClass('focus'); // headless testing is brittle
  }
});
