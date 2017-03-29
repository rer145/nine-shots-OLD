//'use strict';

var fbConfig = {
    apiKey: "AIzaSyC6LUrFBTGcMVkz7MnEIN45jd7TlkUpRhg",
    authDomain: "nine-shots.firebaseapp.com",
    databaseURL: "https://nine-shots.firebaseio.com",
    storageBucket: "nine-shots.appspot.com",
    messagingSenderId: "836956556874"
};
firebase.initializeApp(fbConfig);


var nineShotsApp = {
    currentUserId: null,
    currentUser: null,

    globalSettings: null,
    globalClubs: null
};

nineShotsApp.init = function() {
    try
    {
        App.restore({ maxAge: 5*60*1000 });     //only attempt restore from last 5 minutes (milliseconds)
    }
    catch (err) {
        App.load('splash');
    }
};

nineShotsApp.saveUserData = function(uid, name, email, settings, clubs) {
    //check to make sure user doesn't already have settings and clubs set before overriding
    var user = {
        uid: uid,
        username: name,
        email: email,
        settings: settings,
        clubs: clubs
    };
    nineShotsApp.currentUser = firebase.database().ref('/users/' + uid);
    nineShotsApp.currentUser.set(user);
};