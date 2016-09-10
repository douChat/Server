// Generated by CoffeeScript 1.10.0
(function() {
  RocketChat.Migrations.add({
    version: 11,
    up: function() {

      /*
      		 * Set GENERAL room to be default
       */
      RocketChat.models.Rooms.update({
        _id: 'GENERAL'
      }, {
        $set: {
          "default": true
        }
      });
      return console.log("Set GENERAL room to be default");
    }
  });

}).call(this);
