FeedbackLlist = new Mongo.Collection("feedbackList");


if (Meteor.isClient) {

  Template.body.helpers({
    feedBacklist : function () {
      return FeedbackLlist.find({}, {sort: {dateAdded: -1}});
    },
    appData: {
      name: 'FeedbackNow',
      version: '0'
    },
    numberOfQuery: function () {
      return FeedbackLlist.find().count();
    }
  
  });

  Template.feedbackForm.events({
    'submit form' : function(event) {
      event.preventDefault(); 
      
      var feedback = event.target.feedback.value;
      var feedbackType = event.target.feedbackType.value;
      var username = Meteor.user().username;
      var addedBy = Meteor.user();
      
      // console.log(Geolocation.currentLocation());
      
      if (feedback) {
        FeedbackLlist.insert({
          feedback: feedback,
          feedbackType: feedbackType,
          dateAdded: new Date(),
          addedBy: addedBy,
          username: username
        }); 
        
      } else {
      
        return false;
      }
      
      //Clear form
      event.target.feedback.value = "";
      return false;
    }
  });
  
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  
  
  var currentUser = user;
  
  console.log(currentUser);


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
