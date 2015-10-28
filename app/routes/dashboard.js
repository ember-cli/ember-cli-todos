import Ember from 'ember';
import Tab from 'frontend/models/tab';

export default Ember.Route.extend({
 model() {
   var tabs = [];
    tabs.pushObject(Tab.create({id: 'facilities', name: 'Facilities'}));
    tabs.pushObject(Tab.create({id: 'departments', name: 'Departments'}));
    tabs.pushObject(Tab.create({id: 'units', name: 'Units'}));
    tabs.pushObject(Tab.create({id: 'users', name: 'Users'}));
    tabs.pushObject(Tab.create({id: 'roles', name: 'Roles'}));
    tabs.pushObject(Tab.create({id: 'events', name: 'Events'}));
    return tabs;
  }
});
