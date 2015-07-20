/**
 * Created by siya on 15/07/20.
 */
FeedbackLlist = new Mongo.Collection("feedbackList");



Meteor.methods({
    addFeedback: function (feedback,feedbackType) {
        if(! Meteor.userId()) {
            throw new Meteor.Error("Not authorized");
        }

        FeedbackLlist.insert({
            feedback: feedback,
            feedbackType: feedbackType,
            dateAdded: new Date(),
            addedBy: Meteor.userId(),
            username: Meteor.user().username
        });
    }
})
