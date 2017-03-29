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
    app.currentUser = firebase.database().ref('/users/' + uid);
    app.currentUser.set(user);
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

App.controller('clubs', function(page) {
    var $list = $(page).find('#clubs-list');
    var clubs = nineShotsApp.globalClubs;
    clubs.forEach(function (c) {
        var $club = document.createElement('li');
        $club.classList.add('app-button');
        $club.classList.add('club-list-button');
        $club.setAttribute('display', c.display);
        $club.innerText = c.display;
        $list.append($club);
    });

    $(page)
        .find('.club-list-button')
        .on('click', function() {
            console.log(this.getAttribute('display'));
            //TODO: toggle on/off status and checkmar icon
        });
});





/***************** FIREBASE AUTH ********************/
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
        nineShotsApp.saveUserData(user.uid, user.displayName, user.email, nineShotsApp.globalSettings, nineShotsApp.globalClubs);
        App.load('home');
    } else {
        nineShotsApp.currentUserId = null;
        nineShotsApp.currentUser = null;
        App.load('splash');
    }
});


/***************** FIREBASE DB ********************/
firebase.database().ref('/settings').on('value', function(data) {
    nineShotsApp.globalSettings = data.val();
    console.log('global settings set');
});
firebase.database().ref('/settings').on('child_added', function(data) {
    console.log('settings data added');
});
firebase.database().ref('/settings').on('child_changed', function(data) {
    console.log('settings data changed');
});
firebase.database().ref('/settings').on('child_removed', function(data) {
    console.log('settings data removed');
});

firebase.database().ref('/clubs').on('value', function(data) {
    nineShotsApp.globalClubs = data.val();
    console.log('global clubs set');
});
firebase.database().ref('/clubs').on('child_added', function(data) {
    console.log('clubs data added');
});
firebase.database().ref('/clubs').on('child_changed', function(data) {
    console.log('clubs data changed');
});
firebase.database().ref('/clubs').on('child_removed', function(data) {
    console.log('clubs data removed');
});

firebase.database().ref('/users').on('child_added', function(data) {
    console.log('users data added');
});
firebase.database().ref('/clubs').on('child_changed', function(data) {
    console.log('users data changed');
});
firebase.database().ref('/clubs').on('child_removed', function(data) {
    console.log('users data removed');
});