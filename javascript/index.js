firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
    } else {
        // No user is signed in.
        window.location.href = "./login.html";
    }
});

function logout() {
    firebase.auth().signOut();
}