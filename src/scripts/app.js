(function() {

    'use strict';

    var fbConfig = {
        apiKey: "AIzaSyC6LUrFBTGcMVkz7MnEIN45jd7TlkUpRhg",
        authDomain: "nine-shots.firebaseapp.com",
        databaseURL: "https://nine-shots.firebaseio.com",
        storageBucket: "nine-shots.appspot.com",
        messagingSenderId: "836956556874"
    };
    firebase.initializeApp(fbConfig);
    //firebase.database().getInstance().setPersistenceEnabled(true);


    var app = {
        isLoading: true,

        container: document.getElementById('body'),

        viewLogin: document.getElementById('view-login'),
        viewMenu: document.getElementById('view-menu'),
        viewPractice: document.getElementById('view-practice'),
        viewSettings: document.getElementById('view-settings'),
        viewStats: document.getElementById('view-stats'),
        viewTest: document.getElementById('view-test'),

        dbSettingsRef: firebase.database().ref('settings/'),
        dbUsersRef: firebase.database().ref('users/')
    };

    app.init = function() {
        //load items, then hide splash screen

        // app.dbWorkoutsRef.on('child_added', function(data) {
        //     app.addWorkoutElement(data.key, data.val());
        // });

        // app.dbWorkoutsRef.on('child_changed', function(data) {
		// 	app.updateWorkoutElement(data.key, data.val());
        // });

        // app.dbWorkoutsRef.on('child_removed', function(data) {
        //     app.removeWorkoutElement(data.key);
        // });

        var settings = {

        };

        if (app.isLoading) {
            app.isLoading = false;

            firebase.auth().getRedirectResult().then(function(result) {
                if (result.credential) {
                    var token = result.credential.accessToken;
                    //app.container.querySelector('#quickstart-oauthtoken').textContent = token;
                    console.log('AUTH TOKEN: ' + token);
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
                if (user) {
                    //user is signed in
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var providerData = user.providerData;

                    //display data
                    app.container.querySelector('#quickstart-sign-in-status').textContent = "Signed in";
                    //app.container.querySelector('#quickstart-account-details').textContent = JSON.stringify(user, null, '   ');
                    console.log(JSON.stringify(user, null, '   '));
                    
                    app.showMenu();
                } else {
                    //user is signed out
                    app.container.querySelector('#quickstart-sign-in-status').textContent = "Signed out";
                    app.container.querySelector('#quickstart-account-details').textContent = 'null';
                    app.container.querySelector('#quickstart-oauthtoken').textContent = 'null';
                    app.showLogin();
                }
            });

            app.container.querySelector('#google-sign-in').addEventListener('click', app.toggleSignIn, false);

            //check user authentication
            //if not, show login
            // else show menu
            //app.showMenu();
        }
    };

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

    app.showLogin = function() {
        app.container.querySelector('.view').setAttribute('hidden', true);
        app.viewLogin.removeAttribute('hidden');
    };

    app.showMenu = function() {
        app.container.querySelector('.view').setAttribute('hidden', true);
        app.viewMenu.removeAttribute('hidden');
    };

    app.showTestMode = function() {
        app.container.querySelector('.view').setAttribute('hidden', true);
        app.viewTest.removeAttribute('hidden');
    };

    app.showPracticeMode = function() {
        app.container.querySelector('.view').setAttribute('hidden', true);
        app.viewPractice.removeAttribute('hidden');
    };

    app.showStats = function() {
        app.container.querySelector('.view').setAttribute('hidden', true);
        app.viewStats.removeAttribute('hidden');
    };

    app.showSettings = function() {
        app.container.querySelector('.view').setAttribute('hidden', true);
        app.viewSettings.removeAttribute('hidden');
    };

    app.init();

    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker
    //         .register('./service-worker.js')
    //         .then(function() {
    //             console.log('[ServiceWorker] Registered');
    //         });
    // }
})();