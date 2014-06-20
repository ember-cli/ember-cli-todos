import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:todos', 'Unit - TodoRoute', {
  subject: function(options, factory) {
    return factory.create({
      store: { }
    });
  }
});

test('it exists', function(){
  expect(2);
  var route = this.subject();

  ok(route);
  ok(route instanceof Ember.Route);
});

test('#model', function(){
  expect(2);
  var route = this.subject();

  var expectedModel = {
    id: '1',
    title: 'install EAK',
    isCompleted: true
  };

  route.store.find = function(type) {
    equal(type, 'todo');

    return expectedModel;
  };

  equal(route.model(), expectedModel, 'did not correctly invoke store');
});
