//Script para registro de usuarios con correo
const user_register = document.getElementById("register_button_2");
user_register.addEventListener('click',register);

const delete_user = document.getElementById("return");
delete_user.addEventListener('click', returnPage);


function register(){
  const email = document.getElementById("user_email").value;
  const confirmEmail = document.getElementById("confirm_user_email").value;
  const password = document.getElementById("user_password").value;
  const reEntryPassword = document.getElementById("user_password_confirm").value;
  let emailOk = false;
  let passwordOk = false;

  if(email === confirmEmail){
    emailOk = true;
  }
  else{
    document.getElementById("error_message").innerHTML = "Email incorrecto o no coincide";
  }

  if(password === reEntryPassword){
    passwordOk = true;
  }
  else{
    document.getElementById("error_message").innerHTML = "Password incorrecto o no coincide";
  }

  if(passwordOk && emailOk){
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      //alert("Usuario registrado correctamente");
      window.location.href="/html/userDataRegister.html";
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode);
      console.log(errorMessage);
    });  
  }
  }

function returnPage(){
  window.location.href = "/index.html";
}