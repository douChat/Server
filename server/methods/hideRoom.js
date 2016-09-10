// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.methods({
    hideRoom: function(rid) {
      check(rid, String);
      if (!Meteor.userId()) {
        throw new Meteor.Error('error-invalid-user', 'Invalid user', {
          method: 'hideRoom'
        });
      }
      return RocketChat.models.Subscriptions.hideByRoomIdAndUserId(rid, Meteor.userId());
    }
  });

}).call(this);
