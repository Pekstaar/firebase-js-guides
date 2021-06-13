const functions = require("firebase-functions");

// custom claim function
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    // get user and add custom claim
    return admin.auth().getUserByEmail(data.email).then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made admin!`
        }
    }).catch(err => console.error(err.message));
});


