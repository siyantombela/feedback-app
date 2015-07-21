/**
 * Created by siya on 15/07/20.
 */
Meteor.publish("feedBackList", function () {
    return FeedbackLlist.find();
});