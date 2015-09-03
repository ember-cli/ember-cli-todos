import DS from 'ember-data';

var Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean', { defaultValue: false })
});

Todo.reopenClass({
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
  ]
});

export default Todo;
