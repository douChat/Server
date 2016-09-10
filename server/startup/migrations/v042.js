// Generated by CoffeeScript 1.10.0
(function() {
  RocketChat.Migrations.add({
    version: 42,
    up: function() {
      var chunks, extension, files, from, list, oldFile, results, to;
      files = RocketChat.__migration_assets_files = new Mongo.Collection('assets.files');
      chunks = RocketChat.__migration_assets_chunks = new Mongo.Collection('assets.chunks');
      list = {
        'favicon.ico': 'favicon_ico',
        'favicon.svg': 'favicon',
        'favicon_64.png': 'favicon_64',
        'favicon_96.png': 'favicon_96',
        'favicon_128.png': 'favicon_128',
        'favicon_192.png': 'favicon_192',
        'favicon_256.png': 'favicon_256'
      };
      results = [];
      for (from in list) {
        to = list[from];
        if (files.findOne({
          _id: to
        }) == null) {
          oldFile = files.findOne({
            _id: from
          });
          if (oldFile != null) {
            extension = RocketChat.Assets.mime.extension(oldFile.contentType);
            RocketChat.settings.removeById("Assets_" + from);
            RocketChat.settings.updateById("Assets_" + to, {
              url: "/assets/" + to + "." + extension,
              defaultUrl: RocketChat.Assets.assets[to].defaultUrl
            });
            oldFile._id = to;
            oldFile.filename = to;
            files.insert(oldFile);
            files.remove({
              _id: from
            });
            results.push(chunks.update({
              files_id: from
            }, {
              $set: {
                files_id: to
              }
            }, {
              multi: true
            }));
          } else {
            results.push(void 0);
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  });

}).call(this);