// Generated by CoffeeScript 1.10.0
(function() {
  RocketChat.Migrations.add({
    version: 3,
    up: function() {
      RocketChat.models.Subscriptions.tryDropIndex('uid_1');
      RocketChat.models.Subscriptions.tryDropIndex('rid_1_uid_1');
      console.log('Fixing ChatSubscription uid');
      RocketChat.models.Subscriptions.find({
        uid: {
          $exists: true
        }
      }, {
        nonreactive: true
      }).forEach(function(sub) {
        var update, user;
        update = {};
        user = RocketChat.models.Users.findOneById(sub.uid, {
          fields: {
            username: 1
          }
        });
        if (user != null) {
          if (update.$set == null) {
            update.$set = {};
          }
          if (update.$unset == null) {
            update.$unset = {};
          }
          update.$set['u._id'] = user._id;
          update.$set['u.username'] = user.username;
          update.$unset.uid = 1;
        }
        if (Object.keys(update).length > 0) {
          return RocketChat.models.Subscriptions.update(sub._id, update);
        }
      });
      console.log('Fixing ChatRoom uids');
      RocketChat.models.Rooms.find({
        'uids.0': {
          $exists: true
        }
      }, {
        nonreactive: true
      }).forEach(function(room) {
        var k, oldId, ref, ref1, update, user, usernames, users, v;
        update = {};
        users = RocketChat.models.Users.find({
          _id: {
            $in: room.uids
          },
          username: {
            $exists: true
          }
        }, {
          fields: {
            username: 1
          }
        });
        usernames = users.map(function(user) {
          return user.username;
        });
        if (update.$set == null) {
          update.$set = {};
        }
        if (update.$unset == null) {
          update.$unset = {};
        }
        update.$set.usernames = usernames;
        update.$unset.uids = 1;
        user = RocketChat.models.Users.findOneById(room.uid, {
          fields: {
            username: 1
          }
        });
        if (user != null) {
          update.$set['u._id'] = user._id;
          update.$set['u.username'] = user.username;
          update.$unset.uid = 1;
        }
        if (room.t === 'd' && usernames.length === 2) {
          ref = update.$set;
          for (k in ref) {
            v = ref[k];
            room[k] = v;
          }
          ref1 = update.$unset;
          for (k in ref1) {
            v = ref1[k];
            delete room[k];
          }
          oldId = room._id;
          room._id = usernames.sort().join(',');
          RocketChat.models.Rooms.insert(room);
          RocketChat.models.Rooms.removeById(oldId);
          RocketChat.models.Subscriptions.update({
            rid: oldId
          }, {
            $set: {
              rid: room._id
            }
          }, {
            multi: true
          });
          return RocketChat.models.Messages.update({
            rid: oldId
          }, {
            $set: {
              rid: room._id
            }
          }, {
            multi: true
          });
        } else {
          return RocketChat.models.Rooms.update(room._id, update);
        }
      });
      console.log('Fixing ChatMessage uid');
      RocketChat.models.Messages.find({
        uid: {
          $exists: true
        }
      }, {
        nonreactive: true
      }).forEach(function(message) {
        var update, user;
        update = {};
        user = RocketChat.models.Users.findOneById(message.uid, {
          fields: {
            username: 1
          }
        });
        if (user != null) {
          if (update.$set == null) {
            update.$set = {};
          }
          if (update.$unset == null) {
            update.$unset = {};
          }
          update.$set['u._id'] = user._id;
          update.$set['u.username'] = user.username;
          update.$unset.uid = 1;
        }
        if (Object.keys(update).length > 0) {
          return RocketChat.models.Messages.update(message._id, update);
        }
      });
      return console.log('End');
    }
  });

}).call(this);
