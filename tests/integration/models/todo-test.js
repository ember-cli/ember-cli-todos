import {
  test,
  moduleForModel
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('todo', 'Integration - Model', {
  integration: true
});

test('contrived example, loading an additional todo', function(assert) {
  assert.expect(4);

  var store = this.store();

  // he user interacts with the application (via click or something)
  // so lets simulate that via an programmatic run-loop (normally the eventDispatcher does this for us)
  return Ember.run(() => {
    return store.find('todo').then((todos) => {

      // ensure new length
      var numberOfTodos = todos.get('length');

      // lets pretend another Todo was added
      store.push('todo', {
        id: '9999',
        title: 'install EAK',
        isCompleted: true
      });

      store.find('todo', 9999).then((todo) => {
        // some what trivial but still a good test
        assert.equal('9999',        todo.get('id'));
        assert.equal('install EAK', todo.get('title'));
        assert.equal(true,          todo.get('isCompleted'));
      });

      // lets do another findAll
      return store.find('todo').then((todos) => {
        assert.equal(numberOfTodos + 1, todos.get('length'), 'expect an additional todo');
      });
    });
  });
});
