const database = firebase.database();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("user_div").style.display = "block";
        document.getElementById("signin_div").style.display = "none";

        var user = firebase.auth().currentUser;

        if (user != null) {
            var email_id = user.email;
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
        }

    } else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none";
        document.getElementById("signin_div").style.display = "block";
    }
});

$(document).ready(function () {
    var login_form = document.getElementById("signin_div");
    var signup_link = document.getElementById("link-create-account");

    signup_link.addEventListener("click", e => {
        console.log("We are here 1");
        e.preventDefault();
        window.location.href = "./signup.html";
    });
});

function login() {
    var user_email = document.getElementById("email_field_login").value;
    var user_password = document.getElementById("password_field_login").value;

    firebase.auth().signInWithEmailAndPassword(user_email, user_password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
    });
}

function logout() {
    firebase.auth().signOut();
}