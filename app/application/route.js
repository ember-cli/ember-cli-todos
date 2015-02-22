// routes/todos.js
import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    state: { refreshModel: true }
  },

  model(params) {
    var all = this.store.find('todo');

    switch (params.state) {
      case 'all'       : return all;
      case 'active'    : return all.then( () => this.store.filter('todo', (todo) => !todo.get('isCompleted')));
      case 'completed' : return all.then( () => this.store.filter('todo', (todo) =>  todo.get('isCompleted')));
      default          : throw new Error(`Unknown Todo State: '${params.state}'`);
    }
  }
});
