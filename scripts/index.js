
const guideList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const uiSetup = (user) => {
    if (user) {

        // account info setup
        db.collection("users").doc(user.uid).get().then((doc) => {
            const html = `
            <div> Logged in user as  ${user.email}</div>
            <div>${doc.data().bio}</div> 
            `
            accountDetails.innerHTML = html;
        })


        // toggle ui elements
        loggedInLinks.forEach(item => item.style.display = 'block')
        loggedOutLinks.forEach(item => item.style.display = 'none')
    } else {
        // hide account information
        accountDetails.innerHTML = '';
        // toggle Ui elements
        loggedInLinks.forEach(item => item.style.display = 'none')
        loggedOutLinks.forEach(item => item.style.display = 'block')

    }
}
// guides list set
const setupGuides = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            const li = `
            <li>
                <div class="collapsible-header grey lighten-4">${guide.title}</div>
                <div class="collapsible-body white"><span>${guide.content}</span></div>
            </li>
        `;
            html += li
        });

        guideList.innerHTML = html;
    } else {
        guideList.innerHTML = "<h5 class='center-align'>Login to view guides</h5>"
    }
}

// materialize components setup
document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items)
});

