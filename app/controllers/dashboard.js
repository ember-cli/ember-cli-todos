import Ember from 'ember';

export default Ember.Controller.extend({
    application: Ember.inject.controller(),
    isActiveRoute: Ember.computed.equal("application.currentRouteName", "dashboard.index")
});
