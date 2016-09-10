// Generated by CoffeeScript 1.10.0
(function() {
  var slice = [].slice;

  Meteor.startup(function() {
    var loadedLanguages;
    TimeSync.loggingEnabled = false;
    UserPresence.awayTime = 300000;
    UserPresence.start();
    Meteor.subscribe("activeUsers");
    Session.setDefault('AvatarRandom', 0);
    window.lastMessageWindow = {};
    window.lastMessageWindowHistory = {};
    TAPi18n.conf.i18n_files_route = Meteor._relativeToSiteRootUrl('/tap-i18n');
    this.defaultAppLanguage = function() {
      var lng, re;
      lng = window.navigator.userLanguage || window.navigator.language || 'en';
      re = /([a-z]{2}-)([a-z]{2})/;
      if (re.test(lng)) {
        lng = lng.replace(re, function() {
          var match, parts;
          match = arguments[0], parts = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          return parts[0] + parts[1].toUpperCase();
        });
      }
      return lng;
    };
    this.defaultUserLanguage = function() {
      return RocketChat.settings.get('Language') || defaultAppLanguage();
    };
    loadedLanguages = [];
    this.setLanguage = function(language) {
      if (!language) {
        return;
      }
      if (loadedLanguages.indexOf(language) > -1) {
        return;
      }
      loadedLanguages.push(language);
      if (isRtl(language)) {
        $('html').addClass("rtl");
      } else {
        $('html').removeClass("rtl");
      }
      language = language.split('-').shift();
      TAPi18n.setLanguage(language);
      language = language.toLowerCase();
      if (language !== 'en') {
        return Meteor.call('loadLocale', language, function(err, localeFn) {
          Function(localeFn)();
          return moment.locale(language);
        });
      }
    };
    return Meteor.subscribe("userData", function() {
      var ref, userLanguage;
      userLanguage = (ref = Meteor.user()) != null ? ref.language : void 0;
      if (userLanguage == null) {
        userLanguage = defaultUserLanguage();
      }
      if (localStorage.getItem('userLanguage') !== userLanguage) {
        localStorage.setItem('userLanguage', userLanguage);
      }
      return setLanguage(userLanguage);
    });
  });

}).call(this);
