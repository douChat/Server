// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.methods({
    deleteMessage: function(message) {
      var blockDeleteInMinutes, currentTsDiff, deleteAllowed, deleteOwn, hasPermission, msgTs, ref;
      if (!Meteor.userId()) {
        return false;
      }
      hasPermission = RocketChat.authz.hasAtLeastOnePermission('delete-message', message.rid);
      deleteAllowed = RocketChat.settings.get('Message_AllowDeleting');
      deleteOwn = (message != null ? (ref = message.u) != null ? ref._id : void 0 : void 0) === Meteor.userId();
      if (!(hasPermission || (deleteAllowed && deleteOwn))) {
        return false;
      }
      blockDeleteInMinutes = RocketChat.settings.get('Message_AllowDeleting_BlockDeleteInMinutes');
      if ((blockDeleteInMinutes != null) && blockDeleteInMinutes !== 0) {
        if (message.ts != null) {
          msgTs = moment(message.ts);
        }
        if (msgTs != null) {
          currentTsDiff = moment().diff(msgTs, 'minutes');
        }
        if (currentTsDiff > blockDeleteInMinutes) {
          toastr.error(t('error-message-deleting-blocked'));
          return false;
        }
      }
      return Tracker.nonreactive(function() {
        return ChatMessage.remove({
          _id: message._id,
          'u._id': Meteor.userId()
        });
      });
    }
  });

}).call(this);
