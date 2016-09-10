// Generated by CoffeeScript 1.10.0
(function() {
  Meteor.startup(function() {
    var RocketChatStore, path, ref, storeType, transformWrite;
    storeType = 'GridFS';
    if (RocketChat.settings.get('Accounts_AvatarStoreType')) {
      storeType = RocketChat.settings.get('Accounts_AvatarStoreType');
    }
    RocketChatStore = RocketChatFile[storeType];
    if (RocketChatStore == null) {
      throw new Error("Invalid RocketChatStore type [" + storeType + "]");
    }
    console.log(("Using " + storeType + " for Avatar storage").green);
    transformWrite = function(file, readStream, writeStream) {
      var height, width;
      if (RocketChatFile.enabled === false || RocketChat.settings.get('Accounts_AvatarResize') !== true) {
        return readStream.pipe(writeStream);
      }
      height = RocketChat.settings.get('Accounts_AvatarSize');
      width = height;
      return RocketChatFile.gm(readStream, file.fileName).background('#ffffff').resize(width, height + '^>').gravity('Center').extent(width, height).stream('jpeg').pipe(writeStream);
    };
    path = "~/uploads";
    if (((ref = RocketChat.settings.get('Accounts_AvatarStorePath')) != null ? ref.trim() : void 0) !== '') {
      path = RocketChat.settings.get('Accounts_AvatarStorePath');
    }
    this.RocketChatFileAvatarInstance = new RocketChatStore({
      name: 'avatars',
      absolutePath: path,
      transformWrite: transformWrite
    });
    return WebApp.connectHandlers.use('/avatar/', Meteor.bindEnvironment(function(req, res, next) {
      var color, colors, file, initials, params, position, ref1, ref2, ref3, ref4, ref5, ref6, reqModifiedHeader, svg, user, username, usernameParts;
      params = {
        username: decodeURIComponent(req.url.replace(/^\//, '').replace(/\?.*$/, ''))
      };
      if (_.isEmpty(params.username)) {
        res.writeHead(403);
        res.write('Forbidden');
        res.end();
        return;
      }
      if (params.username[0] !== '@') {
        if ((ref1 = Meteor.settings) != null ? (ref2 = ref1["public"]) != null ? ref2.sandstorm : void 0 : void 0) {
          user = RocketChat.models.Users.findOneByUsername(params.username.replace('.jpg', ''));
          if (user != null ? (ref3 = user.services) != null ? (ref4 = ref3.sandstorm) != null ? ref4.picture : void 0 : void 0 : void 0) {
            res.setHeader('Location', user.services.sandstorm.picture);
            res.writeHead(302);
            res.end();
            return;
          }
        }
        file = RocketChatFileAvatarInstance.getFileWithReadStream(encodeURIComponent(params.username));
      } else {
        params.username = params.username.replace('@', '');
      }
      res.setHeader('Content-Disposition', 'inline');
      if (file == null) {
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'public, max-age=0');
        res.setHeader('Expires', '-1');
        res.setHeader('Last-Modified', "Thu, 01 Jan 2015 00:00:00 GMT");
        reqModifiedHeader = req.headers["if-modified-since"];
        if (reqModifiedHeader != null) {
          if (reqModifiedHeader === "Thu, 01 Jan 2015 00:00:00 GMT") {
            res.writeHead(304);
            res.end();
            return;
          }
        }
        colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];
        username = params.username.replace('.jpg', '');
        color = '';
        initials = '';
        if (username === "?") {
          color = "#000";
          initials = username;
        } else {
          position = username.length % colors.length;
          color = colors[position];
          username = username.replace(/[^A-Za-z0-9]/g, '.').replace(/\.+/g, '.').replace(/(^\.)|(\.$)/g, '');
          usernameParts = username.split('.');
          initials = usernameParts.length > 1 ? _.first(usernameParts)[0] + _.last(usernameParts)[0] : username.replace(/[^A-Za-z0-9]/g, '').substr(0, 2);
          initials = initials.toUpperCase();
        }
        svg = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" pointer-events=\"none\" width=\"50\" height=\"50\" style=\"width: 50px; height: 50px; background-color: " + color + ";\">\n	<text text-anchor=\"middle\" y=\"50%\" x=\"50%\" dy=\"0.36em\" pointer-events=\"auto\" fill=\"#ffffff\" font-family=\"Helvetica, Arial, Lucida Grande, sans-serif\" style=\"font-weight: 400; font-size: 28px;\">\n		" + initials + "\n	</text>\n</svg>";
        res.write(svg);
        res.end();
        return;
      }
      reqModifiedHeader = req.headers["if-modified-since"];
      if (reqModifiedHeader != null) {
        if (reqModifiedHeader === ((ref5 = file.uploadDate) != null ? ref5.toUTCString() : void 0)) {
          res.setHeader('Last-Modified', reqModifiedHeader);
          res.writeHead(304);
          res.end();
          return;
        }
      }
      res.setHeader('Cache-Control', 'public, max-age=0');
      res.setHeader('Expires', '-1');
      res.setHeader('Last-Modified', ((ref6 = file.uploadDate) != null ? ref6.toUTCString() : void 0) || new Date().toUTCString());
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Content-Length', file.length);
      file.readStream.pipe(res);
    }));
  });

}).call(this);
