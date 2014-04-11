// import TodosController from 'todos/controller';
// import { moduleFor, test } from 'appkit/tests/helpers/module-for';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:todos', 'Unit - TodosController');

function mock(properties) {
  return Ember.Object.create(properties || {});
}

test('inflection', function(){
  var controller = this.subject();

  equal(controller.get('inflection'), 'items');

  Ember.run(function () {
    controller.pushObject(mock({
      isCompleted: false
    }));
  });

  equal(controller.get('inflection'), 'item');

  Ember.run(function () {
    controller.pushObject(mock({
      isCompleted: false
    }));
  });

  equal(controller.get('inflection'), 'items');
});

test('aggregates', function(){
  var todo1 = mock({ isCompleted: false });
  var todo2 = mock({ isCompleted: false });
  var todo3 = mock({ isCompleted: false });

  var controller = this.subject({
    model: [
      todo1,
      todo2,
      todo3,
    ]
  });

  deepEqual(controller.get('active'), [todo1, todo2, todo3]);
  deepEqual(controller.get('completed'), []);
  equal(controller.get('hasCompleted'), false);
  equal(controller.get('allAreDone'), false);

  todo1.set('isCompleted', true);

  deepEqual(controller.get('active'), [todo2, todo3]);
  deepEqual(controller.get('completed'), [todo1]);
  equal(controller.get('hasCompleted'), true);
  equal(controller.get('allAreDone'), false);

  todo2.set('isCompleted', true);

  deepEqual(controller.get('active'), [todo3]);
  deepEqual(controller.get('completed'), [todo1, todo2]);
  equal(controller.get('hasCompleted'), true);
  equal(controller.get('allAreDone'), false);

  todo3.set('isCompleted', true);

  deepEqual(controller.get('active'), []);
  deepEqual(controller.get('completed'), [todo1, todo2, todo3]);
  equal(controller.get('hasCompleted'), true);
  equal(controller.get('allAreDone'), true);
});

test('allAreDone: get', function(){
  var controller = this.subject();
  var todo1 = mock();
  var todo2 = mock();

  equal(controller.get('allAreDone'), false);

  controller.pushObject(todo1);
  equal(controller.get('allAreDone'), false);

  controller.pushObject(todo2);
  equal(controller.get('allAreDone'), false);

  todo1.set('isCompleted', true);
  equal(controller.get('allAreDone'), false);

  todo2.set('isCompleted', true);
  equal(controller.get('allAreDone'), true);

  todo2.set('isCompleted', false);
  equal(controller.get('allAreDone'), false);
});

test('allAreDone: set', function(){
  var todo1 = mock();
  var todo2 = mock();

  var controller = this.subject({
    model: [
      todo1,
      todo2
    ],
    newTitle: ' '
  });

  controller.set('allAreDone', true);

  equal(todo1.get('isCompleted'),  true);
  equal(todo2.get('isCompleted'),  true);

  controller.set('allAreDone', false);

  equal(todo1.get('isCompleted'), false);
  equal(todo2.get('isCompleted'), false);
});

test('actions: createTodo', function(){
  var store, controller;

  store = { };

  controller = this.subject({
    store: store,
    model: Ember.A(),
    newTitle: "   "
  });

  store.createRecord = function(type, data) {
    equal(type, 'todo');
    ok(true, 'expected Store#createRecord');
    controller.pushObject(data);
    data.save = function() {
      ok(true, 'expected Record#save');
    };
    return data;
  };

  controller.send('createTodo');

  equal(controller.get('newTitle'), "");
  equal(controller.get('length'), 0);

  controller.set('newTitle', 'understanding tests');

  controller.send('createTodo');

  equal(controller.get('newTitle'), "");
  equal(controller.get('length'), 1);
});

test('actions: clearCompleted', function(){
  var controller, todo, todo1, todo2;
  var properties = {
    isCompleted: true,
    deleteRecord: function() {
      ok(true, 'expected Record#deleteRecord');
      controller.removeObject(this);
    },
    save: function() {
      ok(true, 'expected Record#save');
    }
  };

  todo = mock(properties);
  todo1 = mock(properties);
  todo2 = mock(properties);

  todo2.set('isCompleted', false);

  controller = this.subject({
    model: [
      todo,
      todo1,
      todo2
    ]
  });

  equal(controller.get('length'), 3);

  controller.send('clearCompleted');

  equal(controller.get('length'), 1);
});
