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
    currentUser: null
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









App.controller('splash', function(page) {
    //check authentication status
    //show sign in if not authenticated
    //show homepage if authenticated

    $(page)
        .find('#google-sign-in')
        .on('click', function() {
            if (!firebase.auth().currentUser) {
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/plus.login');
                firebase.auth().signInWithRedirect(provider);
            } else {
                firebase.auth().signOut();
                App.load('splash');
            }
        });
});



App.controller('home', function(page) {
    $(page)
        .find('#sign-out')
        .on('click', function() {
            firebase.auth().signOut();
            App.load('splash');
        });
});

App.controller('test-stats', function(page, args) {
    //load up test details via args.id from firebase
    
    $(page)
        .find('#test-id')
        .text(args.id);
});






firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
        var token = result.credential.accessToken;
    } else {

    }
    var user = result.user;
}).catch(function(error) {
    if (error.code == "auth/account-exists-with-different-credential") {
        alert("You are already signed up with another provider.");
    } else {
        console.error(error);
    }
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user && nineShotsApp.currentUserId === user.uid) {
        return;
    }

    if (user) {
        nineShotsApp.currentUserId = user.uid;
        nineShotsApp.currentUser = user;
        //save user data?
        App.load('home');
    } else {
        nineShotsApp.currentUserId = null;
        nineShotsApp.currentUser = null;
        App.load('splash');
    }
});