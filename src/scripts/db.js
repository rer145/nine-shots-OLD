/****************** DATABASE HOOKS ******************/
firebase.database().ref('/settings').on('value', function(data) {
    app.globalSettings = data.val();
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
    app.globalClubs = data.val();
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



/* GLOBAL DATA LOAD */
if (app.globalSettings == null) {
    firebase.database().ref('/settings').set({
        testModeShots: 30,
        practiceModeEnabled: false
    });
}

if (app.globalClubs == null) {
    firebase.database().ref('/clubs').set([
        {type: 'Wood', number: 1, code: 'D', display: 'Driver'},
        {type: 'Wood', number: 3, code: '3W', display: '3 Wood'},
        {type: 'Wood', number: 5, code: '5W', display: '5 Wood'},
        {type: 'Iron', number: 3, code: '3I', display: '3 Iron'},
        {type: 'Iron', number: 4, code: '4I', display: '4 Iron'},
        {type: 'Iron', number: 5, code: '5I', display: '5 Iron'},
        {type: 'Iron', number: 6, code: '6I', display: '6 Iron'},
        {type: 'Iron', number: 7, code: '7I', display: '7 Iron'},
        {type: 'Iron', number: 8, code: '8I', display: '8 Iron'},
        {type: 'Iron', number: 9, code: '9I', display: '9 Iron'},
        {type: 'Wedge', number: 0, code: 'PW', display: 'Pitching Wedge'},
        {type: 'Wedge', number: 0, code: 'GW', display: 'Gap Wedge'},
        {type: 'Wedge', number: 0, code: 'SW', display: 'Sand Wedge'},
        {type: 'Wedge', number: 0, code: 'LW', display: 'Lob Wedge'}
    ]);
}


app.saveUserData = function(uid, name, email) {
    firebase.database().ref('/users/' + uid).set({
        uid: uid,
        username: name,
        email: email
    });
};