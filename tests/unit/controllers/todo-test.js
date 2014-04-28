import { moduleFor, test } from 'ember-qunit';

var todo;
moduleFor('controller:todos/item-controller', 'Unit - TodoController', {
  needs: ['controller:todos'],
  subject: function(options, factory) {
    todo = mockTodo({
      isCompleted: true
    });

    return factory.create({
      model: todo
    });
  }
});

function mock(properties) {
  return Ember.Object.create(properties || {});
}

function mockTodo(properties) {
  var m = mock(properties);
  m.reopen({
    save: function () {
      return Ember.RSVP.resolve();
    }
  });
  return m;
}

test('isCompleted: get', function(){
  var controller = this.subject();
  equal(controller.get('isCompleted'), true);

  todo.set('isCompleted', false);

  equal(controller.get('isCompleted'), false);
});

test('isCompleted: set', function(){
  var controller = this.subject();

  equal(controller.get('isCompleted'), true);
  equal(todo.get('isCompleted'), true);

  controller.set('isCompleted', false);

  equal(controller.get('isCompleted'), false);
  equal(todo.get('isCompleted'), false);
});

test('actions: editTodo', function(){
  var controller = this.subject();

  equal(todo.get('isEditing', false));
  controller.send('editTodo');
  equal(todo.get('isEditing', true));
});

test('actions: removeTodo', function(){
  expect(2);

  var controller = this.subject();

  todo.deleteRecord = function() {
    ok(true, 'expected Record#deleteRecord');
  };

  todo.save = function() {
    ok(true, 'expected Record#save');
  };

  controller.send('removeTodo');
});

test('actions: acceptChanges', function(){
  expect(3);

  var controller = this.subject();

  todo.save = function() {
    ok(true, 'expected Record#save');
  };

  equal(todo.get('isEditing', true));
  controller.send('acceptChanges');
  equal(todo.get('isEditing', false));
});

moduleFor('controller:todos/item-controller', 'Unit - TodoController with multiple todos', {
  needs: ['controller:todos'],
  otherTodo: function (options, factory) {
    var otherTodo = mockTodo({
      isCompleted: true
    });

    return factory.create({
      model: otherTodo
    });
  },
  // maybe todos: 'controller:todos'
  todosController: function (options, factory, container) {
    return container.lookup('controller:todos');
  },
  subject: function(options, factory) {
    todo = mockTodo({
      isCompleted: false
    });

    return factory.create({
      model: todo
    });
  },
  setup: function (container) {
    var todos = container.lookup('controller:todos');
    todos.set('content', [this.subject(), this.otherTodo()]);
  }
});

test('isLastRemaining', function () {
  var controller = this.subject();
  equal(this.todosController().get('length'), 2, "There are initially 2 todos");
  equal(this.todosController().get('active.length'), 1, "Only one todo is active");
  equal(controller.get('isCompleted'), false, "The todo is initially active");
  equal(controller.get('isLastRemaining'), true, "todo is initially the last remaining one");

  controller.set('isCompleted', true);

  equal(todo.get('isCompleted'), true, "todo is now complete");
  equal(controller.get('isLastRemaining'), false, "todo is no longer the last remaining one");
});
