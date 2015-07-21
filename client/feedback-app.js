Meteor.subscribe("feedBackList");

//Meteor.startup(function() {
//    GoogleMaps.load();
//});



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

        var latLng = Geolocation.latLng();

        if(latLng) {
            var latidute = latLng.lat;
            var longitude = latLng.lng;

            console.log(longitude);

            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(latidute,longitude);
            console.log("Formatted Lat Long: " + latlng);

            //reverse geocode to get address
            geocoder.geocode({'location': latlng}, function (results,status) {
                console.log(status);
                if (status === google.maps.GeocoderStatus.OK) {
                    var address = results[1].formatted_address;
                    console.log("Formatted Address: " + address);
                }

            })

        }

        //Check if feedback was entered first
        if (feedback) {
            Meteor.call("addFeedback", feedback,feedbackType);
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

