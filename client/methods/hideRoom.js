// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.methods({
    hideRoom: function(rid) {
      if (!Meteor.userId()) {
        return false;
      }
      return ChatSubscription.update({
        rid: rid,
        'u._id': Meteor.userId()
      }, {
        $set: {
          alert: false,
          open: false
        }
      });
    }
  });

}).call(this);
