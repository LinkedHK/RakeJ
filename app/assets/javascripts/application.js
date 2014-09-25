// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery.min
//= require jquery_ujs
//= require turbolinks
//= require bootstrap.min
//= require main
//= require item_creator.js.erb
//= require_tree .


/*
 +-javascripts/
 | +-application.js (manifest)
 | +-paloma/
 | | +-users/ (assuming you have a UsersController)
 | | | +-new.js (assuming you have JavaScript you want to execute only for the "new" action)
 | | +-foobars/ (assuming you have a FoobarsController)
 | | | +-show.js (assuming you have JavaScript you want to execute only for the "show" action)
 +-stylesheets/
 */
