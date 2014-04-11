// controllers/todo.js
var equal = Ember.computed.equal;
var and = Ember.computed.and;

export default Ember.ObjectController.extend({
  needs: ['todos'],
  isCompleted: function(key, value){
    var model = this.get('model');

    if (arguments.length === 2) {
      // property being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
   } else {
      // property being used as a getter
      return model.get('isCompleted');
    }
  }.property('model.isCompleted'),

  isLastRemaining: and(equal('controllers.todos.active.length', 1),
                       equal('isCompleted', false)),
  isEditing: false,

  actions: {
    editTodo: function () {
      this.set('isEditing', true);
    },
    removeTodo: function () {
      var todo = this.get('model');
      todo.deleteRecord();
      todo.save();
    },
    acceptChanges: function () {
      this.set('isEditing', false);
      this.get('model').save();
    }
  }
});
