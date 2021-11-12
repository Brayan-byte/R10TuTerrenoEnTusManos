function esperarbasedeDatos() {
  return new Promise(subido => {
    setTimeout(() => {
      userId = verUsuario();
      subido('subido');
    }, 1500);
  });
}

var userId;
var terrainid;
var terrenoID;
var precio; 
var ValorCustom; 
var dineroAPagar;
let abonoMensual;
let valorTotalCuenta;

var button_pay = document.getElementById("abonar");

button_pay.addEventListener('click',pagar);

window.onload = async function(){
  verAutenticacion();

  getFirestore();
  await esperarbasedeDatos();
  
  console.log(userId);
  fechaDePago();
  renderPrice();
  if(precio == 0 ){
    alert("CUENTA LIQUIDADA");
  }
}

function fechaDePago(){
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth()+2;
  var year = date.getFullYear();
  document.getElementById("date").innerHTML = day + "/" + month + "/" + year ;
}

function renderPrice(){
  abonoMensual = Math.round(precio/12);
  valorTotalCuenta = precio;

  document.getElementById("Abono_mensual").innerHTML = abonoMensual + "$";
  document.getElementById("Liquidar_cuenta").innerHTML = valorTotalCuenta + "$";
}



function pagar(){
  if(precio>0){
    var option=document.getElementsByName('metodo-pago');
  var caso;
  for (var i = 0, length = option.length; i < length; i++)
  {
   if (option[i].checked)
  {
  // do whatever you want with the checked radio
   caso = option[i].value;
  // only one radio can be logically checked, don't check the rest
   break;
  }
  }
  console.log(caso);
  if(caso === '1'){
    dineroAPagar = abonoMensual;
    actualizarDatos();
  }
  if(caso === '2' ){
    dineroAPagar = valorTotalCuenta;
    actualizarDatos();
  }
  if(caso === '3'){
    const input_value = document.getElementById("input_number");
    ValorCustom = parseInt(input_value.value);
    if(ValorCustom === null || isNaN(ValorCustom)){
      alert("Ingrese una cantidad");
    }
    else{
      dineroAPagar = ValorCustom;
      console.log(dineroAPagar);
      actualizarDatos();
    }

  }
  
  }

}

function renderTerrain(datos){
  
  let ul= document.createElement("ul");
  let li= document.createElement("li");
  let name = document.createElement("li");
  let priceTitle = document.createElement("li");
  let price = document.createElement("li");
  let image = document.createElement("img");
 

  ul.setAttribute('class',datos.id);
  image.setAttribute('src', datos.imagen);
  name.textContent = datos.Nombre;
  name.setAttribute('class',"Titulo");
  priceTitle.textContent = "Saldo pendiente: "
  priceTitle.setAttribute('class', "priceTitle");
  price.textContent =datos.Precio +" $";
  
  precio = datos.Precio;

  ul.appendChild(li.appendChild(name));
  ul.appendChild(li.appendChild(image));
  ul.appendChild(li.appendChild(priceTitle));
  ul.appendChild(li.appendChild(price));
  
 


  document.getElementById("terrenos_comprados").appendChild(ul);

}
function getFirestore(){
  var db = firebase.firestore();
  db.collection("Terrenos").get().then((snapshot) => {
    snapshot.forEach(doc =>{
      terrenoID = doc.id;
      if(doc.data().vendido == true){
        renderTerrain(doc.data());
      }
      
    })

});
}

function actualizarDatos(){
  var db = firebase.firestore();
  var TerrenosRef = db.collection("Terrenos").doc("FCVz4y2BrbJXpOf6ZpYa");
  if(dineroAPagar<=precio){
    alert("Se realizo el pago por la cantidad de:" + dineroAPagar);
    var NuevoPrecio = precio - dineroAPagar;
    // Set the "capital" field of the city 'DC'
    return TerrenosRef.update({
        Precio: NuevoPrecio
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }
  else{
    alert("ingrese una suma valida");
  }
 
}


