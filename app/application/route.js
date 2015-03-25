// routes/todos.js
import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    state: { refreshModel: true }
  },

  model(params) {
    return this.store.find('todo').then((todos) => {
      return {
        all: todos,
        filter: params.state
      };
    });
  }
});
