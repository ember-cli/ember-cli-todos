import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('todo-item', 'Integration - Component - Todo Item', {
  integration: true
});

test('completed checkbox triggers a save', function (assert) {
  var store = this.container.lookup('service:store');
  var todo;

  Ember.run(function () {
    todo = store.createRecord('todo', {
      title: 'Confirm save',
      isCompleted: false
    });
  });

  this.set('todo', todo);
  this.render(hbs`{{todo-item todo=todo}}`);

  assert.notOk(todo.get('isSaving'), 'todo is not saving before click');

  this.$('input[type=checkbox]').click();

  assert.ok(todo.get('isCompleted'), 'todo is completed after click');
  assert.ok(todo.get('isSaving'), 'todo is saving after click');

  // Return a promise that ensures the test will wait until the todo is saved
  // before trying to unload it (otherwise an error will be raised):
  return Ember.run(() => todo.save());
});
