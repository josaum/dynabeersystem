//code shared between client and server
Router.configure({
  // This is the default layout/top-level template 
 layoutTemplate: 'layout'
});

// Router.route('/addTask/:projectId', function () {
//   this.render('addTaskForm', {
//     data: function () { 
//       return {projectId: this.params.projectId} }
//   });
// });


Router.route('/addTask/:projectId', function () {
  
  this.wait(Meteor.subscribe('projects'));

  if (this.ready()) {

    this.render('addTaskForm', {
      data: function () { 
        return {projectId: this.params.projectId} }
    });

  }else {

    this.render('loadingTemplate');
  }

  fastRender: true;
});

// Router.route('/', function () {
//   this.render('createProjectForm');
// });

// Router.route('/createProjectForm', function () {
//   this.render('createProjectForm');
// });

Router.route('/', function () {

  this.wait(Meteor.subscribe('projects'));

  if (this.ready()) {
    this.render('/createProjectForm');
  } else {
    this.render('loadingTemplate');
  }

  fastRender: true;
  
});

Router.route('/createProjectForm', function () {


  this.wait(Meteor.subscribe('projects'));

  if (this.ready()) {
    this.render();
  } else {
    this.render('loadingTemplate');
  }

  fastRender: true;

});


Router.route('/loadingTemplate', function () {

  this.render('loadingTemplate');

});

Router.route('/makeMeAdmin', function () {
  this.render('makeMeAdminForm');
});

Router.route('/loginForm', function () {

  if (Meteor.user()) {
    this.render('createProjectForm');
  }else{
    this.render('loginForm');
  }
  
});


Router.map(function() {
  // Route for the landing page when user is not logged in
  
 this.route('signupForm', {
  path: '/signup'
 });

 // this.route('createProjectForm', {
 //  path: '/createProject'
 // });

 // this.route('addTaskForm', {
 //  path: '/addTask/:_id'
 // });

});

var requireLogin = function() { 
 if (! Meteor.user()) {
  // If user is not logged in render landingpage
  this.render('readOnly'); 
 } else {
  //if user is logged in render whatever route was requested
  this.next(); 
 }
}

// Before any routing run the requireLogin function. 
// Except in the case of "landingpage". 
// Note that you can add more pages in the exceptions if you want. (e.g. About, Faq, contact...) 
Router.onBeforeAction(requireLogin, {except: ['signupForm', 'loadingTemplate']});

// Accounts.config({'forbidClientAccountCreation':true});