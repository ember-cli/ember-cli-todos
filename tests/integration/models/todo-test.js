import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('todo', 'Integration - Model');

test('contrived example, loading an additional todo', function(){
  expect(4);

  var store = this.store();

  // he user interacts with the application (via click or something)
  // so lets simulate that via an programmatic run-loop (normally the eventDispatcher does this for us)
  Ember.run(function(){

    // lets grab all the Todos
    stop(); // tell qunit to wait
    store.find('todo').then(function(todos){
      start(); // tell qunit to resume testing

      // ensure new length
      var numberOfTodos = todos.get('length');

      // lets pretend another Todo was added
      store.push('todo', {
        id: '9999',
        title: 'install EAK',
        isCompleted: true
      });

      // triggers another find
      stop(); // tell qunit to wait
      store.find('todo', 9999).then(function(todo) {
        start(); // tell qunit to resume testing

        // some what trivial but still a good test
        equal('9999',        todo.get('id'));
        equal('install EAK', todo.get('title'));
        equal(true,          todo.get('isCompleted'));
      });

      // lets do another findAll
      stop(); // tell qunit to wait
      store.find('todo').then(function(todos){
        start();

        equal(numberOfTodos + 1, todos.get('length'), 'expect an additional todo');
      });
    });
  });
});
