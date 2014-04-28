import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('edit-todo');

test("asdf", function(){
  ok(this.subject() instanceof Ember.Component);
  ok(this.$().is('input'), 'is an input');
  ok(this.$().is('.focus'), 'is in focus');
});
