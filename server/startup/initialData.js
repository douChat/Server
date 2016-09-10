// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.startup(function() {
    return Meteor.defer(function() {
      var adminUser, error, id, nameValidation, oldestUser, re, rs, ws;
      if (RocketChat.models.Rooms.findOneById('GENERAL') == null) {
        RocketChat.models.Rooms.createWithIdTypeAndName('GENERAL', 'c', 'general', {
          "default": true
        });
      }
      if (RocketChat.models.Users.findOneById('rocket.cat') == null) {
        RocketChat.models.Users.create({
          _id: 'rocket.cat',
          name: "Rocket.Cat",
          username: 'rocket.cat',
          status: "online",
          statusDefault: "online",
          utcOffset: 0,
          active: true,
          type: 'bot'
        });
        RocketChat.authz.addUserRoles('rocket.cat', 'bot');
        rs = RocketChatFile.bufferToStream(new Buffer(Assets.getBinary('avatars/rocketcat.png'), 'utf8'));
        RocketChatFileAvatarInstance.deleteFile("rocket.cat.jpg");
        ws = RocketChatFileAvatarInstance.createWriteStream("rocket.cat.jpg", 'image/png');
        ws.on('end', Meteor.bindEnvironment(function() {
          return RocketChat.models.Users.setAvatarOrigin('rocket.cat', 'local');
        }));
        rs.pipe(ws);
      }
      if (process.env.ADMIN_PASS != null) {
        if (_.isEmpty(RocketChat.authz.getUsersInRole('admin').fetch())) {
          console.log('Inserting admin user:'.green);
          adminUser = {
            name: "Administrator",
            username: "admin",
            status: "offline",
            statusDefault: "online",
            utcOffset: 0,
            active: true
          };
          if (process.env.ADMIN_NAME != null) {
            adminUser.name = process.env.ADMIN_NAME;
          }
          console.log(("Name: " + adminUser.name).green);
          if (process.env.ADMIN_EMAIL != null) {
            re = /^[^@].*@[^@]+$/i;
            if (re.test(process.env.ADMIN_EMAIL)) {
              if (!RocketChat.models.Users.findOneByEmailAddress(process.env.ADMIN_EMAIL)) {
                adminUser.emails = [
                  {
                    address: process.env.ADMIN_EMAIL,
                    verified: true
                  }
                ];
                console.log(("Email: " + process.env.ADMIN_EMAIL).green);
              } else {
                console.log('Email provided already exists; Ignoring environment variables ADMIN_EMAIL'.red);
              }
            } else {
              console.log('Email provided is invalid; Ignoring environment variables ADMIN_EMAIL'.red);
            }
          }
          if (process.env.ADMIN_USERNAME != null) {
            try {
              nameValidation = new RegExp('^' + RocketChat.settings.get('UTF8_Names_Validation') + '$');
            } catch (error) {
              nameValidation = new RegExp('^[0-9a-zA-Z-_.]+$');
            }
            if (nameValidation.test(process.env.ADMIN_USERNAME)) {
              if (RocketChat.checkUsernameAvailability(process.env.ADMIN_USERNAME)) {
                adminUser.username = process.env.ADMIN_USERNAME;
              } else {
                console.log('Username provided already exists; Ignoring environment variables ADMIN_USERNAME'.red);
              }
            } else {
              console.log('Username provided is invalid; Ignoring environment variables ADMIN_USERNAME'.red);
            }
          }
          console.log(("Username: " + adminUser.username).green);
          adminUser.type = 'user';
          id = RocketChat.models.Users.create(adminUser);
          Accounts.setPassword(id, process.env.ADMIN_PASS);
          console.log(("Password: " + process.env.ADMIN_PASS).green);
          RocketChat.authz.addUserRoles(id, 'admin');
        } else {
          console.log('Users with admin role already exist; Ignoring environment variables ADMIN_PASS'.red);
        }
      }
      if (_.isEmpty(RocketChat.authz.getUsersInRole('admin').fetch())) {
        oldestUser = RocketChat.models.Users.findOne({
          _id: {
            $ne: 'rocket.cat'
          }
        }, {
          fields: {
            username: 1
          },
          sort: {
            createdAt: 1
          }
        });
        if (oldestUser) {
          RocketChat.authz.addUserRoles(oldestUser._id, 'admin');
          return console.log("No admins are found. Set " + oldestUser.username + " as admin for being the oldest user");
        }
      }
    });
  });

}).call(this);