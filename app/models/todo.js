// models/todo.js
var Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

Todo.reopenClass({
  FIXTURES: [
  {
    id: "1",
    title: 'install EAK',
    isCompleted: true
  }, {
    id: "2",
    title: 'install additional dependencies',
    isCompleted: true
  }, {
    id: "3",
    title: 'develop amazing things',
    isCompleted: false
  }
]});

export default Todo;
