// listen auth status
auth.onAuthStateChanged(user => {
    if (user) {
        uiSetup(user);
        // get data

        db.collection("guides").onSnapshot(snap =>
            setupGuides(snap.docs)
            , err => console.error(err))
    } else {
        uiSetup();
        setupGuides([])
    }
})

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection("guides").add({
        title: createForm['title'].value,
        content: createForm['content'].value,
    }).then(() => {
        // close modal and reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch(err => console.error(err.message))
})

// sign up
const signupForm = document.querySelector('#signup-form');

// submision function
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // signup user
    // grabbing auth from const auth = firebase.auth()
    auth.createUserWithEmailAndPassword(email, password)
        .then(r => {
            return db.collection("users").doc(r.user.uid).set({
                bio: signupForm['signup-bio'].value,
            })
        }).then(() => {
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        });


});

// Logout
const logout = document.querySelector("#logout");

logout.addEventListener('click', (e) => {
    e.preventDefault();

    auth.signOut()

})

// login
const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        })
})