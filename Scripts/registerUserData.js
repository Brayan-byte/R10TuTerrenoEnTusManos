function esperarbasedeDatos() {
  return new Promise(subido => {
    setTimeout(() => {
      subido('subido');
      window.location.href = "/html/home.html";
    }, 1500);
  });
}


const registrarDatos = document.getElementById("enviar");
registrarDatos.addEventListener('click',subirDatos);

const database = firebase.database();

var userId;
window.onload=function(){
  verAutenticacion();
}

async function subirDatos(evt){
  evt.preventDefault();
  const name = document.getElementById("user_name").value;
  const lastName = document.getElementById("user_lastName").value;
  const age = document.getElementById("user_age").value;
  const phoneNumber = document.getElementById("user_cellPhone").value;
  const gender = document.getElementById("user_gender").value;
  
  const user = firebase.auth().currentUser;

  if (user) {
    uid = user;
    console.log(uid);
  } else {
  console.log("No has iniciado sesion");
  }
  
    userId = verUsuario();
    writeUserData(userId, name, lastName, age,phoneNumber,gender);
    const cambiarPagina = await esperarbasedeDatos();
    

}

function writeUserData(userId, name, lastName, age,phoneNumber,gender) {
  
  database.ref('/users/' + userId).set({
    username: name,
    userLastName: lastName,
    userAge : age,
    userPhoneNumer:phoneNumber,
    userGender: gender
  });
  alert("Datos subidos correctamente");
}




