// controllers/todos.js
import Ember from 'ember';

export default Ember.Controller.extend({
  state: 'all',
  queryParams: [
    'state'
  ],
});
