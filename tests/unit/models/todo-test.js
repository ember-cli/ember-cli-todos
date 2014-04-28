import { moduleForModel, test } from 'ember-qunit';

moduleForModel('todo', 'Unit - Todo');

test("it exists", function() {
  var todo = this.subject();

  ok(todo);
});

test('artificial promise thing', function () {
  return Ember.run(function(){
    // TODO:  https://github.com/emberjs/ember.js/pull/4176
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.run.later(function(){

        ok(true, "no really, seems good");
        resolve("seems good");
      }, 1000);
    });
  });
});
