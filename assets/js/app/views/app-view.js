define([
    'backbone',
    'jquery',
    'templates',

    'app/views/homepage-view'
], function(Backbone, $, tpls,
    HomepageView) {

    var view = Backbone.View.extend({
        el: '.js-app',

        template: tpls['index.html'],

        render: function () {
            this.$('.main-container')
                .empty()
                .append(this.activeView.render().el);

            return this;
        },

        loadHome : function () {
            this.activeView = new HomepageView();
            this.render();
        },

        loadAbout : function () {
            this.activeView = new AboutView();
            this.render();
        }


    });

    return view;
});
