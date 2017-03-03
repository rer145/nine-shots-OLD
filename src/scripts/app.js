//(function() {

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

        globalSettings: null,
        userSettings: null,
        globalClubs: null,
        userClubs: null,
        userLog: null,

        currentUserId: null
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

        if (app.isLoading) {
            app.isLoading = false;
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


//})();