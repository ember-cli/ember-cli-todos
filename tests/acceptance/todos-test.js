import startApp from 'todos/tests/helpers/start-app';
import Resolver from 'todos/tests/helpers/resolver';
import Ember from 'ember';

var App;

module('Acceptances - Todos', {
  setup: function(){
    var todo = Resolver.resolve('model:todo');
    todo.reopenClass({
      FIXTURES: [
        {
          id: "1",
          title: 'install ember-cli',
          isCompleted: true
        },
        {
          id: "2",
          title: 'install additional dependencies',
          isCompleted: true
        },
        {
          id: "3",
          title: 'develop amazing things',
          isCompleted: false
        }
    ]});

    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

function exists(selector) {
  return !!window.find(selector).length;
}

function remainingCountText(){
  return Number($('#todo-count strong').text());
}

var notCompletedSelector = "#todo-list li:not('.completed') input";
var completedSelector = "#todo-list li.completed input";

function notCompleted() {
  return $(notCompletedSelector);
}

function completed() {
  return $(completedSelector);
}

function mock(options) {
  return Ember.$.extend(true, {}, options);
}

test('todos renders', function(){
  expect(7);

  visit('/').then(function(){
    ok(exists('#new-todo'));
    ok(exists('#toggle-all'));

    var list = find('#todo-list li');
    equal(list.length, 3);

    ok(exists('#todo-count'));

    var linkList = find('#filters li');
    equal(linkList.length, 3);

    ok(exists('#clear-completed'));
    ok(exists('#info'));
  });
});

test('todos mark last completed', function(){
  expect(6);

  visit('/').then(function(){
    equal(1, notCompleted().length, 'expected 1 uncompleted');
    equal(1, remainingCountText());
    equal(2, completed().length);

    click(notCompletedSelector).then(function(){
      equal(0, notCompleted().length, 'expected 0 uncompleted');
      equal(0, remainingCountText());
      equal(3, completed().length);
    });
  });
});

test('todos mark one uncompleted', function(){
  expect(6);

  visit('/').then(function(){
    equal(1, notCompleted().length, 'expected 1 uncompleted');
    equal(1, remainingCountText());
    equal(2, completed().length);

    click(completedSelector + ':first').then(function(){
      equal(2, notCompleted().length, 'expected 0 uncompleted');
      equal(2, remainingCountText());
      equal(1, completed().length);
    });
  });
});

test('clear completed', function(){
  expect(6);

  visit('/').then(function(){
    equal(1, notCompleted().length, 'expected 1 uncompleted');
    equal(1, remainingCountText());
    equal(2, completed().length);

    click('#clear-completed').then(function(){
      equal(1, notCompleted().length, 'expected 3 uncompleted');
      equal(1, remainingCountText());
      equal(0, completed().length);
    });
  });
});

test("create todo", function(){
  expect(4);
  visit('/').then(function(){
    fillIn('#new-todo', 'bro');

    // insert a newline
    keyEvent('#new-todo', 'keyup', 13).then(function(){
      equal(2, notCompleted().length, 'expected 1 uncompleted');
      equal(2, remainingCountText());
      equal(2, completed().length);
      equal('bro', $('ul#todo-list li label:last').text());
    });
  });
});

test("remove todo", function(){
  expect(3);
  visit('/').then(function(){
    click('#todo-list li.completed button.destroy').then(function(){
      equal(1, notCompleted().length, 'expected 1 uncompleted');
      equal(1, remainingCountText());
      equal(0, completed().length);
    });
  });
});

test("edit todo", function(){
  expect(2);

  visit('/').then(function(){
    var todo = $('#todo-list li:first');

    triggerEvent(todo.find('label'), 'dblclick');

    var input = todo.find('input.edit');
    equal(input.length, 1, 'label should have become transformed into input');

    fillIn(input, 'new task description');
    keyEvent(input.selector, 'keyup', 13).then(function(){
      equal(todo.find('label').text(), 'new task description');
    });
  });
});
