// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.methods({
    removeRoomModerator: function(rid, userId) {
      var fromUser, subscription, user;
      check(rid, String);
      check(userId, String);
      if (!Meteor.userId()) {
        throw new Meteor.Error('error-invalid-user', 'Invalid user', {
          method: 'removeRoomModerator'
        });
      }
      if (!RocketChat.authz.hasPermission(Meteor.userId(), 'set-moderator', rid)) {
        throw new Meteor.Error('error-not-allowed', 'Not allowed', {
          method: 'removeRoomModerator'
        });
      }
      subscription = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(rid, userId);
      if (subscription == null) {
        throw new Meteor.Error('error-invalid-room', 'Invalid room', {
          method: 'removeRoomModerator'
        });
      }
      RocketChat.models.Subscriptions.removeRoleById(subscription._id, 'moderator');
      user = RocketChat.models.Users.findOneById(userId);
      fromUser = RocketChat.models.Users.findOneById(Meteor.userId());
      RocketChat.models.Messages.createSubscriptionRoleRemovedWithRoomIdAndUser(rid, user, {
        u: {
          _id: fromUser._id,
          username: fromUser.username
        },
        role: 'moderator'
      });
      if (RocketChat.settings.get('UI_DisplayRoles')) {
        RocketChat.Notifications.notifyAll('roles-change', {
          type: 'removed',
          _id: 'moderator',
          u: {
            _id: user._id,
            username: user.username
          },
          scope: rid
        });
      }
      return true;
    }
  });

}).call(this);
