const database = firebase.database();
var userEmail;
var myName;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        userEmail = String(user.email);
    } else {
        // No user is signed in.
        window.location.href = "./login.html";
    }
});

$(document).ready(function () {
    var rootRef = firebase.database().ref().child("users");
    
    rootRef.on("child_added", snap => {
        var first_name = snap.child("first_name").val();
        var firstNameString = String(first_name);
        var last_name = snap.child("last_name").val();
        var lastNameString = String(last_name);
        var nameString = firstNameString + " " + lastNameString;
        var university = snap.child("university").val();
        var year = snap.child("year").val();
        var program = snap.child("program").val();
        var email = snap.child("email").val();
        var emailString = String(email);

        if (userEmail==emailString){
            myName = String(nameString);
        }

    });
});


function sendMessage() {
    var message = document.getElementById("message").value;

    firebase.database().ref("messages").push().set({
        "sender": myName,
        "message": message
    });

    // prevent form from submitting
    return false;
}

// listen for incoming messages
firebase.database().ref("messages").on("child_added", function (snapshot) {
    var html = "";
    var senderString = String(snapshot.val().sender);
    console.log(myName);
    if (senderString == myName){
        html += "<li class='me' id='message-" + snapshot.key + "'>";
    } else{
        html += "<li class='away' id='message-" + snapshot.key + "'>";
    }
    // show delete button if message is sent by me
    html += snapshot.val().sender + ": " + snapshot.val().message + " ";
    if (snapshot.val().sender == myName) {
        html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
        html += "X";
        html += "</button>";
    }
    html += "</li>";

    document.getElementById("messages").innerHTML += html;
});

function deleteMessage(self) {
    // get message ID
    var messageId = self.getAttribute("data-id");
 
    // delete message
    firebase.database().ref("messages").child(messageId).remove();
}
 
// attach listener for delete message
firebase.database().ref("messages").on("child_removed", function (snapshot) {
    // remove message node
    document.getElementById("message-" + snapshot.key).innerHTML = "This message was deleted";
});