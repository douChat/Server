// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.methods({
    sendConfirmationEmail: function(email) {
      var user;
      check(email, String);
      user = RocketChat.models.Users.findOneByEmailAddress(s.trim(email));
      if (user != null) {
        Accounts.sendVerificationEmail(user._id, s.trim(email));
        return true;
      }
      return false;
    }
  });

}).call(this);
