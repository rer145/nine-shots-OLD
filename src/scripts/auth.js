firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
        var token = result.credential.accessToken;
        //console.log('AUTH TOKEN: ' + token);
    } else {
        //app.container.querySelector('#quickstart-oauthtoken').textContent = 'null';
    }

    var user = result.user;
}).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You are already signed up with another provider.');
    } else {
        console.error(error);
    }
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user && app.currentUserId === user.uid) {
        //token refresh event - ignore
        return;
    }

    if (user) {
        app.currentUserId = user.uid;

        //user is signed in - save somewhere?
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;

        app.saveUserData(user.uid, user.displayName, user.email, app.globalSettings, app.globalClubs);

        //app.container.querySelector('#quickstart-sign-in-status').textContent = "Signed in";
        //console.log(JSON.stringify(user, null, '   '));
        app.showMenu();
    } else {
        //user has signed out
        app.currentUserId = null;
        app.showLogin();
    }
});


app.toggleSignIn = function() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
    } else {
        firebase.auth().signOut();
        app.showLogin();
    }
};