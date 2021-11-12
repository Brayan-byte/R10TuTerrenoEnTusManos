
const logIn = document.getElementById("login_button");
logIn.addEventListener('click',inicioSesion);

const Register = document.getElementById("register_button");
Register.addEventListener('click',RegisterUser);


function inicioSesion(){
  const email = document.getElementById("input_user").value;
  const password = document.getElementById("input_password").value;
  
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(userCredential);
    window.location.href="/html/home.html"
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  }
  );
}

function RegisterUser(){
  window.location.href = "/html/userEmailRegister.html"
}



