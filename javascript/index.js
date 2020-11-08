const database = firebase.database();
var childId;
var userEmail;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        userEmail = String(user.email);
        childId = String(user.uid);
        database.ref('activeUsers/' + user.uid).set({
            email: user.email
        });
    } else {
        // No user is signed in.
        window.location.href = "./login.html";
    }
});

function logout() {
    firebase.database().ref('activeUsers/'+childId).remove();
    firebase.auth().signOut();
}

$(document).ready(function () {
    var rootRef = firebase.database().ref().child("users");
    var activeRef = firebase.database().ref().child("activeUsers");
    var sg = document.getElementById("students-project-list");
    var bb = document.getElementById("test-iv");
    var emailArray = [];

    activeRef.on("child_added", snap => {
        var email = snap.child("email").val();
        var emailString = String(email);
        emailArray.push(emailString);
    });

    rootRef.on("child_added", snap => {
        var first_name = snap.child("first_name").val();
        var last_name = snap.child("last_name").val();
        var university = snap.child("university").val();
        var year = snap.child("year").val();
        var program = snap.child("program").val();
        var studentNumber = snap.child("student_number").val();
        var email = snap.child("email").val();
        var emailString = String(email);
        var online = 0;

        for(let i = 0; i < emailArray.length; i++){
            if (emailArray[i] == emailString){
                online = 1;
                break;
            }
        }

        var newDiv = document.createElement('div');
        newDiv.classList.add('col-lg-4', 'col-md-4', 'col-sm-4', 'col-4');

        var newDiv0 = document.createElement('div');
        newDiv0.id = "project-students-item"

        var hh1 = document.createElement('h2');
        var sectionValueString1 = String(first_name + " ");
        var newDivText1 = document.createTextNode(sectionValueString1);
        hh1.appendChild(newDivText1);

        var sectionValueString2 = String(last_name);
        var newDivText2 = document.createTextNode(sectionValueString2);
        hh1.appendChild(newDivText2);

        var hh3 = document.createElement('h2');
        var sectionValueStringP = String(program + ", ");
        var newDivTextP = document.createTextNode(sectionValueStringP);
        hh3.appendChild(newDivTextP);

        var sectionValueString3 = String(university);
        var newDivText3 = document.createTextNode(sectionValueString3);
        hh3.appendChild(newDivText3);

        var hh4 = document.createElement('h2');
        var yearString = String(year);
        var newDivTextY = document.createTextNode(yearString);
        hh4.appendChild(newDivTextY);

        var imgCircle = document.createElement('div');
        imgCircle.className = "imgCircle";
        var imgCreate = document.createElement('img');
        var studentNumberString = String(studentNumber);
        console.log(studentNumberString);
        //firebase.storage().ref('users/' + studentNumberString+'/profile.jpg').getDownloadURL().then(imgUrl => {
        //    console.log("URL IS " + imgUrl);
        //    imgCreate.src = imgUrl;
        //})
        if (studentNumberString == "123456789") {
            imgCreate.src = "../student.png";
        } else if (studentNumberString == "987654321") {
            imgCreate.src = "../student.png";
        } else if (studentNumberString == "1234554321") {
            imgCreate.src = "../student.png";
        } else {
            imgCreate.src = "../nouserpic.jpg";
        }
        imgCreate.className = 'students-img';

        imgCircle.appendChild(imgCreate);
        newDiv0.appendChild(imgCircle);
        newDiv0.appendChild(hh1);
        newDiv0.appendChild(hh3);
        newDiv0.appendChild(hh4);

        var newDiv00 = document.createElement('button');
        if (online == 1){
            newDiv00.innerHTML = "CHAT - ONLINE";
            newDiv00.className = "active";
        } else{
            newDiv00.innerHTML = "CHAT - OFFLINE";
            newDiv00.disabled = true;
            newDiv00.className = "disabled";
        }
        newDiv00.addEventListener("click", redirectChat);
        newDiv0.appendChild(newDiv00);

        newDiv.appendChild(newDiv0);
        sg.insertBefore(newDiv, bb);

    });

});

function redirectChat() {
    window.location.href = "./chat.html";
}