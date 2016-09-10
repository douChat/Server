// Generated by CoffeeScript 1.10.0
(function() {
  RocketChat.Migrations.add({
    version: 9,
    up: function() {
      var toMigrate;
      toMigrate = [
        {
          source: new Meteor.Collection('data.ChatRoom'),
          target: RocketChat.models.Rooms.model
        }, {
          source: new Meteor.Collection('data.ChatSubscription'),
          target: RocketChat.models.Subscriptions.model
        }, {
          source: new Meteor.Collection('data.ChatMessage'),
          target: RocketChat.models.Messages.model
        }, {
          source: new Meteor.Collection('settings'),
          target: Settings
        }, {
          source: new Meteor.Collection('oembed_cache'),
          target: OEmbed.cache
        }
      ];
      return toMigrate.forEach(function(collection) {
        var rawSource, source, target;
        source = collection.source;
        target = collection.target;
        console.log('Migrating data from: ' + source.rawCollection().collectionName + ' to: ' + target.rawCollection().collectionName);
        source.find().forEach(function(doc) {
          return target.upsert({
            _id: doc._id
          }, doc);
        });
        rawSource = source.rawCollection();
        return Meteor.wrapAsync(rawSource.drop, rawSource)(function(err, res) {
          if (err) {
            return console.log('Error dropping ' + rawSource.collectionName + ' collection due to: ' + err.errmsg);
          }
        });
      });
    }
  });

}).call(this);