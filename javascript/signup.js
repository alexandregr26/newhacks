const database = firebase.database();
const storage = firebase.storage();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("user_div").style.display = "block";
        document.getElementById("signout_div").style.display = "none";

        var user = firebase.auth().currentUser;

        if (user != null) {
            var email_id = user.email;
            document.getElementById("user_para").innerHTML = "Welcome to UNIverse " ;
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
    var user_program = document.getElementById("program_field").value;
    var user_year = document.getElementById("year_field").value;
    var user_password = document.getElementById("password_field_signup").value;

    firebase.auth().createUserWithEmailAndPassword(user_email, user_password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
    });

    firebase.storage().ref('users/' + user_studentNumber+'profile.jpg').put(files).then(function () {
    }).catch(error => {
        console.log(error.message);
    })

    database.ref('users/' + user_studentNumber).set({
        first_name: user_firstName,
        last_name: user_secondName,
        email: user_email,
        student_number: user_studentNumber,
        university: user_university,
        program: user_program,
        year: user_year
    });
}

function main() {
    window.location.href = "./index.html";
}

var ImgUrl;
var files = [];
var reader;

document.getElementById("select").onclick = function (e) {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function () {
            document.getElementById("myimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}