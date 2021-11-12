const firebaseConfig = {
  apiKey: "AIzaSyDsK9IIg-KMJeagVqOVxFapBMQosiWztUg",
  authDomain: "r10terrenosver8.firebaseapp.com",
  databaseURL: "https://r10terrenosver8-default-rtdb.firebaseio.com",
  projectId: "r10terrenosver8",
  storageBucket: "r10terrenosver8.appspot.com",
  messagingSenderId: "764007898173",
  appId: "1:764007898173:web:b163a7baac5c5d8d0dde54"
};

// Initialize Firebase
var userid;
var usuarioplisimprimite;

firebase.initializeApp(firebaseConfig)
function verAutenticacion(){
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userid = user.uid;
      verUsuario(user);
    } 
    else {
      console.log("No has iniciado sesion");
    }
    
  });
  
}


function verUsuario(user){
  user = firebase.auth().currentUser;
  if (user) {
    const uid = user.uid;
    idusuario = uid;
    return idusuario;
  }
}