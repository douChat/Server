// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.methods({
    toggleFavorite: function(rid, f) {
      if (!Meteor.userId()) {
        return false;
      }
      return ChatSubscription.update({
        rid: rid,
        'u._id': Meteor.userId()
      }, {
        $set: {
          f: f
        }
      });
    }
  });

}).call(this);
