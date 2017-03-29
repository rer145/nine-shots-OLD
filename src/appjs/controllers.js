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