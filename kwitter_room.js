
//ADD YOUR FIREBASE LINKS HERE
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBz_AQUuVrmZf5Tqn15D9xP8wghmwuwc7Y",
  authDomain: "kwitter-3f32d.firebaseapp.com",
  databaseURL: "https://kwitter-3f32d-default-rtdb.firebaseio.com",
  projectId: "kwitter-3f32d",
  storageBucket: "kwitter-3f32d.appspot.com",
  messagingSenderId: "652422264608",
  appId: "1:652422264608:web:ff6ed53cf4ab4e54538945",
  measurementId: "G-6HEXL09F8P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("u_n");
document.getElementById("username").innerHTML="Welcome " + user_name + "!";

function addRoom(){
  room_name=document.getElementById("room_name").value;
  localStorage.setItem("r_n" , room_name);

  firebase.database().ref("/").child(room_name).update({
    purpose:"add room"
  });
  window.location="kwitter_chat.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function(childSnapshot) {
      childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      row= "<div class='room_name' id="+Room_names+" onclick='redirect(this.id)' > #"+ Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function logout(){
  localStorage.removeItem("u_n");    
  localStorage.removeItem("r_n");
  window.location="index.html";

}

function redirect(r_name){
  localStorage.setItem("r_n" , r_name);
  window.location="kwitter_chat.html";
}

