import DS from 'ember-data';

export default DS.Adapter.extend({
  findAll() {
    // rather then doing an ajax, just echo back the default data

    return [
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
    ];
  },

  createRecord(store, type, snapshot) {
    // rather then doing an ajax, just echo back the data that was created
    var record = snapshot.record;
    var json = record.toJSON();

    // assign a unique ID like the server would
    json.id = Date.now();

    // return a value or a promise
    return json;
  },

  updateRecord(store, type, snapshot) {
    // rather then doing an ajax, just echo back the data that was updated
    var record = snapshot.record;
    var json = record.toJSON();

    json.id = record.id;

    return json;
  },

  deleteRecord(store, type, snapshot) {
    var record = snapshot.record;

    return { id: record.id };
  }
});
