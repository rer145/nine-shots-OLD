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
        App.load('loading');
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