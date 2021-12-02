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
room_name=localStorage.getItem("r_n");

function send(){
msg = document.getElementById("msg").value;
console.log(msg);
console.log(room_name);
firebase.database().ref(room_name).push({
  name:user_name,
  message:msg,
  likes:0
});
document.getElementById("msg").value=" ";
}

function getData() {firebase.database().ref("/" +room_name).on('value', function(snapshot) {
  document.getElementById("output").innerHTML = "";
  snapshot.forEach(function(childSnapshot) {
  childKey  = childSnapshot.key;
  childData = childSnapshot.val();
  if (childKey != "purpose"){
    msg_id=childKey;
    console.log(msg_id);
    msg_data=childData;
    console.log(msg_data);
    name=msg_data['name'];
    message=msg_data['message'];
    likes=msg_data['likes'];
    name_with_tag="<h4> " + name + "<img class='user_tick' src='tick.png'> </h4>";
    msg_with_tag="<p class='msg_class'>" + message + "</p>";
    like_button="<button class='btn btn-warning' id=" + msg_id + " value="+ likes +" onclick='update_like(this.id)'>";
    span_with_tag="<span class='glyphicon glyphicon-thumbs-up'> LIKES: "+ likes +"</span> </button> <hr>";
    row= name_with_tag + msg_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;
  }
  });});}
getData();

function update_like(msg_id){
likes=document.getElementById(msg_id).value;
updated_likes=Number(likes) + 1;
firebase.database().ref(room_name).child(msg_id).update({
  likes:updated_likes
});
}

function logout(){
    localStorage.removeItem("u_n");    
    localStorage.removeItem("r_n");
    window.location="index.html";
  
  }

