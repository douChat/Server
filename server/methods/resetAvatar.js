// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.methods({
    resetAvatar: function() {
      var user;
      if (!Meteor.userId()) {
        throw new Meteor.Error('error-invalid-user', 'Invalid user', {
          method: 'resetAvatar'
        });
      }
      if (!RocketChat.settings.get("Accounts_AllowUserAvatarChange")) {
        throw new Meteor.Error('error-not-allowed', 'Not allowed', {
          method: 'resetAvatar'
        });
      }
      user = Meteor.user();
      RocketChatFileAvatarInstance.deleteFile(user.username + ".jpg");
      RocketChat.models.Users.unsetAvatarOrigin(user._id);
      RocketChat.Notifications.notifyAll('updateAvatar', {
        username: user.username
      });
    }
  });

  DDPRateLimiter.addRule({
    type: 'method',
    name: 'resetAvatar',
    userId: function() {
      return true;
    }
  }, 1, 60000);

}).call(this);
