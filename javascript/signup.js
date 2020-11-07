const database = firebase.database();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("user_div").style.display = "block";
        document.getElementById("signout_div").style.display = "none";

        var user = firebase.auth().currentUser;

        if (user != null) {
            var email_id = user.email;
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
        }

    } else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none";
        document.getElementById("signout_div").style.display = "block";
    }
});

$(document).ready(function () {
    var signup_form = document.getElementById("signout_div");
    var login_link = document.getElementById("link-login");

    login_link.addEventListener("click", e => {
        e.preventDefault();
        window.location.href = "./login.html";
    });
});

function signup() {
    var user_firstName = document.getElementById("firstName_field").value;
    var user_secondName = document.getElementById("lastName_field").value;
    var user_email = document.getElementById("email_field_signup").value;
    var user_studentNumber = document.getElementById("studentNumber_field").value;
    var user_university = document.getElementById("university_field").value;
    var user_password = document.getElementById("password_field_signup").value;

    firebase.auth().createUserWithEmailAndPassword(user_email, user_password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
    });

    database.ref('users/' + user_studentNumber).set({
        first_name: user_firstName,
        last_name: user_secondName,
        university: user_university
    });
}

function main() {
    window.location.href = "./index.html";
}