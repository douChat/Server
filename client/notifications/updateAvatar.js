// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.startup(function() {
    return RocketChat.Notifications.onAll('updateAvatar', function(data) {
      return updateAvatarOfUsername(data.username);
    });
  });

}).call(this);
