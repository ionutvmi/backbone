define([
    'backbone',
    'jquery',
    'templates',

    // views
    'app/views/header-view',
    'app/views/footer-view',
    'app/views/homepage-view',
    'app/views/about-view'
], function(Backbone, $, tpls,
    HeaderView, FooterView, HomepageView, AboutView
   ) {

    var view = Backbone.View.extend({
        el: '.js-app',

        template: tpls['index.html'],

        views: {},

        initialize: function () {

            // render is called internally for this views
            this.views.header = new HeaderView({
                el: '.js-app .header'
            });
            this.views.footer = new FooterView({
                el: '.js-app .footer'
            });
        },

        render: function () {
            this.$('.main-container')
                .empty()
                .append(this.activeView.render().el);

            return this;
        },

        loadHome: function () {
            this.clean();
            this.activeView = new HomepageView();
            this.render();
        },

        loadAbout: function () {
            this.clean();
            this.activeView = new AboutView();
            this.render();
        },

        clean: function () {
            if (this.activeView) {
                this.activeView.remove();
            }
        }


    });

    return view;
});
