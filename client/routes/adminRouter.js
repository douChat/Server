// Generated by CoffeeScript 1.10.0
(function() {
  FlowRouter.route('/admin/users', {
    name: 'admin-users',
    action: function() {
      RocketChat.TabBar.showGroup('adminusers');
      return BlazeLayout.render('main', {
        center: 'adminUsers'
      });
    }
  });

  FlowRouter.route('/admin/rooms', {
    name: 'admin-rooms',
    action: function() {
      RocketChat.TabBar.showGroup('adminrooms');
      return BlazeLayout.render('main', {
        center: 'adminRooms'
      });
    }
  });

  FlowRouter.route('/admin/info', {
    name: 'admin-info',
    action: function() {
      RocketChat.TabBar.showGroup('adminInfo');
      return BlazeLayout.render('main', {
        center: 'adminInfo'
      });
    }
  });

  FlowRouter.route('/admin/:group?', {
    name: 'admin',
    action: function() {
      RocketChat.TabBar.showGroup('admin');
      return BlazeLayout.render('main', {
        center: 'admin'
      });
    }
  });

}).call(this);
