import {
  moduleFor,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleFor('route:application', 'Unit - TodoRoute', {
  subject(options, factory) {
    return factory.create({
      store: {
        find() { 
          return Ember.RSVP.Promise.resolve([

          ]);
        }
      }
    });
  }
});

test('it exists', function(assert) {
  assert.expect(2);
  var route = this.subject();

  assert.ok(route);
  assert.ok(route instanceof Ember.Route);
});

test('#model state:all', function(assert) {
  assert.expect(2);

  var route = this.subject();

  var expectedModel = {
    id: '1',
    title: 'install EAK',
    isCompleted: true
  };

  route.store.find = function(type) {
    assert.equal(type, 'todo');

    return expectedModel;
  };

  assert.equal(route.model({
    state: 'all'
  }), expectedModel, 'did not correctly invoke store');
});


test('#model state: unknown', function(assert) {
  assert.expect(1);

  assert.throws( _ => this.subject().model({ state: 'unknown' }) , /Unknown Todo State: 'unknown'/);
});

test('#model state:active', function(assert) {
  assert.expect(3);

  var route = this.subject();

  route.store.filter = function(type, fn) {
    assert.equal(type, 'todo');

    assert.ok(!fn(Ember.Object.create({ isCompleted: true })));
    assert.ok(fn(Ember.Object.create({ isCompleted: false })));
  };

  route.model({ state: 'active' });
});

test('#model state:completed', function(assert) {
  assert.expect(3);

  var route = this.subject();

  route.store.filter = function(type, fn) {
    assert.equal(type, 'todo');

    assert.ok(fn(Ember.Object.create({ isCompleted: true })));
    assert.ok(!fn(Ember.Object.create({ isCompleted: false })));
  };

  route.model({ state: 'completed' });
});
