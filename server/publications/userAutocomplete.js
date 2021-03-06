// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.publish('userAutocomplete', function(selector) {
    var cursorHandle, exceptions, options, pub;
    if (!this.userId) {
      return this.ready();
    }
    pub = this;
    options = {
      fields: {
        name: 1,
        username: 1,
        status: 1
      },
      limit: 10,
      sort: {
        name: 1
      }
    };
    exceptions = selector.exceptions || [];
    cursorHandle = RocketChat.models.Users.findActiveByUsernameOrNameRegexWithExceptions(selector.term, exceptions, options).observeChanges({
      added: function(_id, record) {
        return pub.added("autocompleteRecords", _id, record);
      },
      changed: function(_id, record) {
        return pub.changed("autocompleteRecords", _id, record);
      },
      removed: function(_id, record) {
        return pub.removed("autocompleteRecords", _id, record);
      }
    });
    this.ready();
    this.onStop(function() {
      return cursorHandle.stop();
    });
  });

}).call(this);
