// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.publish('spotlight', function(selector, options, collName) {
    var ref, self, subHandleRooms, subHandleUsers;
    if ((this.userId == null) || ((selector != null ? (ref = selector.name) != null ? ref.$regex : void 0 : void 0) == null)) {
      return this.ready();
    }
    self = this;
    subHandleUsers = null;
    subHandleRooms = null;
    subHandleUsers = RocketChat.models.Users.findUsersByNameOrUsername(new RegExp(selector.name.$regex, 'i'), {
      limit: 10,
      fields: {
        name: 1,
        username: 1,
        status: 1
      },
      sort: {
        name: 1
      }
    }).observeChanges({
      added: function(id, fields) {
        var data;
        data = {
          type: 'u',
          uid: id,
          username: fields.username,
          name: fields.username + ' - ' + fields.name,
          status: fields.status
        };
        return self.added("autocompleteRecords", id, data);
      },
      removed: function(id) {
        return self.removed("autocompleteRecords", id);
      }
    });
    subHandleRooms = RocketChat.models.Rooms.findByNameContainingAndTypes(selector.name.$regex, ['c'], {
      limit: 10,
      fields: {
        t: 1,
        name: 1
      },
      sort: {
        name: 1
      }
    }).observeChanges({
      added: function(id, fields) {
        var data;
        data = {
          type: 'r',
          rid: id,
          name: fields.name,
          t: fields.t
        };
        return self.added("autocompleteRecords", id, data);
      },
      removed: function(id) {
        return self.removed("autocompleteRecords", id);
      }
    });
    this.ready();
    return this.onStop(function() {
      if (subHandleUsers != null) {
        subHandleUsers.stop();
      }
      return subHandleRooms != null ? subHandleRooms.stop() : void 0;
    });
  });

}).call(this);
