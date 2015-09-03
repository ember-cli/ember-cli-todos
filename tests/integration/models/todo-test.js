import {
  test,
  moduleForModel
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('todo', 'Integration - Model', {
  needs: ['adapter:application']
});

test('contrived example, loading an additional todo', function(assert) {
  assert.expect(4);

  var store = this.store();

  // he user interacts with the application (via click or something)
  // so lets simulate that via an programmatic run-loop (normally the eventDispatcher does this for us)
  return Ember.run(() => {
    return store.findAll('todo').then((todos) => {

      // ensure new length
      var numberOfTodos = todos.get('length');

      // lets pretend another Todo was added
      store.push({
        data: {
          type: 'todo',
          id: '9999',
          attributes: {
            title: 'install EAK',
            isCompleted: true
          }
        }
      });

      // // lets do another findAll
      return store.findAll('todo').then((todos) => {
        assert.equal(numberOfTodos + 1, todos.get('length'), 'expect an additional todo');

        var todo = todos.get('lastObject');

        // some what trivial but still a good test
        assert.equal('9999',          todo.get('id'));
        assert.equal('install EAK', todo.get('title'));
        assert.equal(true,          todo.get('isCompleted'));
      });
    });
  });
});
