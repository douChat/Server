// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.methods({
    toggleFavorite: function(rid, f) {
      check(rid, String);
      check(f, Match.Optional(Boolean));
      if (!Meteor.userId()) {
        throw new Meteor.Error('error-invalid-user', "Invalid user", {
          method: 'toggleFavorite'
        });
      }
      return RocketChat.models.Subscriptions.setFavoriteByRoomIdAndUserId(rid, Meteor.userId(), f);
    }
  });

}).call(this);
