
require.config({
    paths: {
        'jasmine' :'lib/jasmine-2.3.4/jasmine',
        'jasmine-html' :'lib/jasmine-2.3.4/jasmine-html',
        'jasmine-boot' :'lib/jasmine-2.3.4/boot',
        'jquery': '../assets/js/libs/jquery.min',
        'underscore': '../assets/js/libs/underscore',
        'backbone': '../assets/js/libs/backbone',
        'templates': '../assets/js/app/templates',
        'app': '../assets/js/app'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'templates': {
            deps: ['underscore'],
            exports: '_templates_app_'
        },
        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        }
    }
});

require(['jasmine-boot'], function () {

    var specs = [
        'spec/headerSpec'
    ];

    require(specs, function () {
        window.onload();
    });

});


