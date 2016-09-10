// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.startup(function() {
    return Meteor.users.find({}, {
      fields: {
        name: 1,
        username: 1,
        pictures: 1,
        status: 1,
        emails: 1,
        phone: 1,
        services: 1,
        utcOffset: 1
      }
    }).observe({
      added: function(user) {
        Session.set('user_' + user.username + '_status', user.status);
        return RoomManager.updateUserStatus(user, user.status, user.utcOffset);
      },
      changed: function(user) {
        Session.set('user_' + user.username + '_status', user.status);
        return RoomManager.updateUserStatus(user, user.status, user.utcOffset);
      },
      removed: function(user) {
        Session.set('user_' + user.username + '_status', null);
        return RoomManager.updateUserStatus(user, 'offline', null);
      }
    });
  });

}).call(this);