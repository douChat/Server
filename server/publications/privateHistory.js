// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.publish('privateHistory', function() {
    if (!this.userId) {
      return this.ready();
    }
    return RocketChat.models.Rooms.findByContainigUsername(RocketChat.models.Users.findOneById(this.userId).username, {
      fields: {
        t: 1,
        name: 1,
        msgs: 1,
        ts: 1,
        lm: 1,
        cl: 1
      }
    });
  });

}).call(this);
