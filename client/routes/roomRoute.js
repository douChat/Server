// Generated by CoffeeScript 1.10.0
(function() {
  FlowRouter.goToRoomById = function(roomId) {
    var subscription;
    subscription = ChatSubscription.findOne({
      rid: roomId
    });
    if (subscription != null) {
      return FlowRouter.go(RocketChat.roomTypes.getRouteLink(subscription.t, subscription));
    }
  };

}).call(this);
