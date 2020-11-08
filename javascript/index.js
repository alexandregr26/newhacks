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

$(document).ready(function () {
    var rootRef = firebase.database().ref().child("users");
    var sg = document.getElementById("students-project-list");
    var bb = document.getElementById("test-iv");

    rootRef.on("child_added", snap => {
        var first_name = snap.child("first_name").val();
        var last_name = snap.child("last_name").val();
        var university = snap.child("university").val();
        var year = snap.child("year").val();
        var program = snap.child("program").val();

        var newDiv = document.createElement('div');
        newDiv.classList.add('col-lg-3', 'col-md-4', 'col-sm-4', 'col-4');

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
        var sectionValueStringP = String(program+", ");
        var newDivTextP = document.createTextNode(sectionValueStringP);
        hh3.appendChild(newDivTextP);

        var sectionValueString3 = String(university);
        var newDivText3 = document.createTextNode(sectionValueString3);
        hh3.appendChild(newDivText3);

        var hh4 = document.createElement('h2');
        var yearString = String(year);
        var newDivTextY = document.createTextNode(yearString);
        hh4.appendChild(newDivTextY);

        newDiv0.appendChild(hh1);
        newDiv0.appendChild(hh3);
        newDiv0.appendChild(hh4);

        var newDiv00 = document.createElement('button');
        newDiv00.innerHTML = "CHAT";
        newDiv00.addEventListener("click", redirectChat);

        newDiv0.appendChild(newDiv00);

        newDiv.appendChild(newDiv0);
        sg.insertBefore(newDiv,bb);

    });

});

function redirectChat(){
    window.location.href = "./chat.html";
}