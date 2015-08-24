define([
    'backbone'
], function(Backbone) {

    var router = Backbone.Router.extend({
        routes: {
            '*others': 'loadHome',
        },

        initialize: function (appView) {
            this.appView = appView;
        },

        loadHome: function () {
            this.appView.loadHome();
        }

    });

    return router;
});


