function esperarbasedeDatos() {
  return new Promise(subido => {
    setTimeout(() => {
      userId = verUsuario();
      subido('subido');
    }, 1500);
  });
}

var userId;
var edit = document.getElementById("edit_data");
edit.addEventListener('click',editDataUser );

var save = document.getElementById("save_data");
save.addEventListener('click',saveDataUser );

window.onload = async function(){
  verAutenticacion();


  await esperarbasedeDatos();
  console.log(userId);
  getDatabase(userId);

}


function editDataUser(){
  document.getElementById("user_name").disabled  = false;
  document.getElementById("user_last_name").disabled  = false;
  document.getElementById("user_age").disabled  = false;
  document.getElementById("user_phone").disabled  = false;
  document.getElementById("user_gender").disabled  = false;
  document.getElementById("save_data").hidden = false;

}

function saveDataUser(){
  const name = document.getElementById("user_name").value;
  const lastName  = document.getElementById("user_last_name").value;
  const age = document.getElementById("user_age").value;
  const phone = document.getElementById("user_phone").value;
  const gender = document.getElementById("user_gender").value;

  updateData(name,lastName,age,phone,gender,userId);
  location.reload();
}


function getDatabase(userId){
  var database = firebase.database().ref('users/' + userId);
  database.on('value', (snapshot)=>{
    const name = snapshot.val().username;
    const lastname = snapshot.val().userLastName;
    const age = snapshot.val().userAge;
    const phone = snapshot.val().userPhoneNumer;
    const gender = snapshot.val().userGender;
    document.getElementById("user_name").value = name;
    document.getElementById("user_last_name").value = lastname;
    document.getElementById("user_age").value = age;
    document.getElementById("user_phone").value = phone;
    document.getElementById("user_gender").value = gender;
  })
}

function updateData(name,lastName,age,phone,gender,userId){
  var postData = {
    username: name,
    userLastName: lastName,
    userAge : age,
    userPhoneNumer:phone,
    userGender: gender
  };
  var updates = {};
  updates['/users/' + userId] = postData;

  return firebase.database().ref().update(updates);

}
