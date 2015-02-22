import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('edit-todo');

test('renders and autofocuses', function(assert) {
  assert.ok(this.subject() instanceof Ember.Component);
  assert.ok(this.$().is('input'), 'is an input');
  assert.ok(this.$().is('.focus'), 'is in focus');
});
