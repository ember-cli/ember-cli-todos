import startApp from 'todos/tests/helpers/start-app';
import Resolver from 'todos/tests/helpers/resolver';
import Ember from 'ember';
import {
  module,
  test
} from 'qunit';

var App;

module('Acceptances - Todos', {
  beforeEach() {
    var todo = Resolver.resolve('model:todo');

    todo.reopenClass({
      FIXTURES: [
        {
          id: '1',
          title: 'install ember-cli',
          isCompleted: true
        },
        {
          id: '2',
          title: 'install additional dependencies',
          isCompleted: true
        },
        {
          id: '3',
          title: 'develop amazing things',
          isCompleted: false
        }
    ]});

    App = startApp();
  },

  afterEach() {
    Ember.run(App, 'destroy');
  }
});

function exists(selector) {
  return !!window.find(selector).length;
}

function remainingCountText() {
  return Number($('.todo-count strong').text());
}

var notCompletedSelector = ".todo-list li:not('.completed') input";
var completedSelector = '.todo-list li.completed input';

function notCompleted() {
  return $(notCompletedSelector);
}

function completed() {
  return $(completedSelector);
}

function mock(options) {
  return Ember.$.extend(true, {}, options);
}

test('todos renders', function(assert) {
  assert.expect(7);

  visit('/').then(() => {
    assert.ok(exists('.new-todo'));
    assert.ok(exists('.toggle-all'));

    var list = find('.todo-list li');
    assert.equal(list.length, 3);

    assert.ok(exists('.todo-count'));

    var linkList = find('.filters li');
    assert.equal(linkList.length, 3);

    assert.ok(exists('.clear-completed'));
    assert.ok(exists('.info'));
  });
});

test('todos mark last completed', function(assert) {
  assert.expect(6);

  return visit('/').then(() => {
    assert.equal(1, notCompleted().length, 'expected 1 uncompleted');
    assert.equal(1, remainingCountText());
    assert.equal(2, completed().length);

    return click(notCompletedSelector).then(() => {
      assert.equal(0, notCompleted().length, 'expected 0 uncompleted');
      assert.equal(0, remainingCountText());
      assert.equal(3, completed().length);
    });
  });
});

test('todos mark one uncompleted', function(assert){
  assert.expect(6);

  return visit('/').then(() => {
    assert.equal(1, notCompleted().length, 'expected 1 uncompleted');
    assert.equal(1, remainingCountText());
    assert.equal(2, completed().length);

    return click(completedSelector + ':first').then(() => {
      assert.equal(2, notCompleted().length, 'expected 0 uncompleted');
      assert.equal(2, remainingCountText());
      assert.equal(1, completed().length);
    });
  });
});

test('clear completed', function(assert){
  assert.expect(6);

  return visit('/').then(() => {
    assert.equal(1, notCompleted().length, 'expected 1 uncompleted');
    assert.equal(1, remainingCountText());
    assert.equal(2, completed().length);

    return click('.clear-completed').then(() => {
      assert.equal(1, notCompleted().length, 'expected 3 uncompleted');
      assert.equal(1, remainingCountText());
      assert.equal(0, completed().length);
    });
  });
});

test('create todo', function(assert){
  assert.expect(4);

  return visit('/').then(() => {
    fillIn('.new-todo', 'bro');

    // insert a newline
    keyEvent('.new-todo', 'keyup', 13).then(() => {
      assert.equal(2, notCompleted().length, 'expected 1 uncompleted');
      assert.equal(2, remainingCountText());
      assert.equal(2, completed().length);
      assert.equal('bro', $('ul.todo-list li label:last').text());
    });
  });
});

test('remove todo', function(assert) {
  assert.expect(3);

  return visit('/').then(() => {
    return click('.todo-list li.completed button.destroy').then(() => {
      assert.equal(1, notCompleted().length, 'expected 1 uncompleted');
      assert.equal(1, remainingCountText());
      assert.equal(0, completed().length);
    });
  });
});

test('edit todo', function(assert) {
  assert.expect(2);

  return visit('/').then(() => {
    var todo = $('.todo-list li:first');

    triggerEvent(todo.find('label'), 'dblclick').then(() => {
      var input = todo.find('input.edit');
      assert.equal(input.length, 1, 'label should have become transformed into input');

      fillIn(input, 'new task description');
      keyEvent(input.selector, 'keyup', 13).then(() => {
        assert.equal(todo.find('label').text(), 'new task description');
      });
    });
  });
});
