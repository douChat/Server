// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.publish('roomFiles', function(rid, limit) {
    var cursorFileListHandle, pub;
    if (limit == null) {
      limit = 50;
    }
    if (!this.userId) {
      return this.ready();
    }
    pub = this;
    cursorFileListHandle = RocketChat.models.Uploads.findNotHiddenFilesOfRoom(rid, limit).observeChanges({
      added: function(_id, record) {
        return pub.added('room_files', _id, record);
      },
      changed: function(_id, record) {
        return pub.changed('room_files', _id, record);
      },
      removed: function(_id, record) {
        return pub.removed('room_files', _id, record);
      }
    });
    this.ready();
    return this.onStop(function() {
      return cursorFileListHandle.stop();
    });
  });

}).call(this);
