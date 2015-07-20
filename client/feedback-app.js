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

        //Check if feedback was entered first
        if (feedback) {
            Meteor.call("addFeedback", feedback,feedbackType);
        } else {
            //Otherwise do nothing
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