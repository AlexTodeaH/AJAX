// Ocultamos y mostramos un formulario segun quiera hacer log In o sign Up

$('ul.opciones li').click(function(){
	var tab = $(this).attr('data-tab');

	$('ul.opciones li').removeClass('current');
	$('.registro').removeClass('current');

	$(this).addClass('current');
	$(tab).addClass('current');
});



// Cuando se carga el index se comprueba si existe una cookie de un usuario conectado y lo escribe, si no 
// da la opcion de conectarse o registrarse.

/*
if(getCookie('conectado')){
	$(".usuario").html("<a>"+getCookie('conectado')+"</a><a id=\"logOut\">Log Out</a>");
} else {
	$(".usuario").html("<a href=\"logIn.html\">Log In / Sign Up</a>");
}
*/

// Se comprueba que las dos contraseñas son iguales

$("#confPassword").on('keyup',function() {
	if ($(this).val() != $(".password").val()) {
		$(this).setCustomValidity("Las contraseñas no coinciden.");
	} else { 
    $(this).setCustomValidity("");
	}
});



// Cuando elija los campos direccion y pais aparecerá el campo de la tarjeta de crédito

$("input[name=direccion]").on('keyup',function() {
  if ($(this).val() != "") {
    $('.tarjeta').css('display','inherit');
  } else { 
    $('.tarjeta').css('display','none');
  }
});

// Cuando se registre guardamos las cookies con su nombre y contraseña

$("#signUp").click(function(){
		setCookie('nombre',$("input[name=nombre]").val());
		setCookie('password',SHA256($("input.password").val()));
	});

// Comprobamos que el usuario y la contraseña coinciden y creamos otra cookie conectado con el nombre del usuario

$("#conect").click(function(){
	if($("input[name=user]").val() == getCookie('nombre') && SHA256($("input[name=password]").val()) == getCookie('password')){
		setCookie('conectado',$("input[name=user]").val());
	} else {
		alert("Usuario incorrecto");
	}
});

// Cuando se desconecta borramos la cookie 'conectado'

$("#logOut").click(function(){
    dropCookie('conectado');
    location.reload();
});

// Funcion para crear las cookies dado nombre y valor

function setCookie(nombre,valor){
	document.cookie = nombre + "=" + valor + ";path=/";
}

// Funcion para obtener el valor de la cookie dado un nombre

function getCookie(nombre){
	var biscuit = nombre + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(biscuit) == 0) return c.substring(biscuit.length,c.length);
    }
    return null;
}

// Funcion para borrar una cookie dado un nombre

function dropCookie(name) {
    setCookie(name,"",-1);
}



//     DISEÑO DE INTERFACES WEB

var slideIndex = 1;

showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

// Según el tamaño de la pantalla mostramos menos o más fotos en el carousel

function showDivs(n) {

  var i;
  var x = $(".mySlides");

if ( $(window).width() < 685) {

  if (n > x.length - 1) {slideIndex = 0}    
  if (n < 0) {slideIndex = x.length-1}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  } 
  x[slideIndex].style.display = "inline";  

  } else if ( $(window).width() >= 685 && $(window).width() < 990 ) {

  if (n > x.length-1) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length-1}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "inline";  
  x[slideIndex].style.display = "inline";  

  } else if ($(window).width() >= 990) {

  if (n > x.length-2) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length-2}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "inline";  
  x[slideIndex].style.display = "inline";  
  x[slideIndex+1].style.display = "inline";  

  }
}

// Comprueba si se ha modificado el tamaño de la pantalla para volver a llamar a la función

$(window).on('resize', function() {
  showDivs(slideIndex);
});

// Efecto aparición de las imágenes

window.onscroll = scroll;

// Creamos la función con la que controlaremos según a qué distancia nos encontremos haciendo
// scroll aparecerá una imagen o otra

function scroll(){

// Le añadimos dos condiciones que borre la clase de la animación para que cuando vuelva a bajar
// vuelva a aparecer la animación

	if($(document).scrollTop() < 450){
		$(".aparecerD").removeClass("come-in-right");
    } 
    if($(document).scrollTop() < 200){
		$(".aparecerI").removeClass("come-in-left");
    } 

// La segunda imagen que está más abajo le añadimos la animación de aparición desde la derecha y
// para la primera imagen la animación de aparición desde la izquierda

    if($(document).scrollTop() > 770){ 
		$(".aparecerD").addClass("come-in-right"); 
    }
    if($(document).scrollTop() > 330){ 
		$(".aparecerI").addClass("come-in-left"); 
    }
}

// Si ha cerrado la pestaña de información de las cookies evitaremos que vuelva a aparecer

$(".cerrar").click(function(){
	setCookie('cookies','aceptadas');
	$(".cookies").css('display','none');
});

if(getCookie('cookies')=='aceptadas'){
	$(".cookies").css('display','none');
}

// Añadimos todos los paises al select

var urlCountries = "https://raw.githubusercontent.com/umpirsky/country-list/master/data/es/country.json";

var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
        alert('Algo fue mal.');
      }
    };
    xhr.send();
  });
};

getJSON(urlCountries).then(function(data) { 
 for(let i in data)   {   

    var option = document.createElement("option");  
    var texto = document.createTextNode(data[i]);
    option.appendChild(texto);
    select.appendChild(option);
    document.getElementById('pais').appendChild(option);    
 }
}, function(status) {
  alert('Algo fue mal.');
});



//               AJAX DATALIST

$('#ajax').on('keyup',function () {

var request = new XMLHttpRequest();

var texto = this.value;

document.getElementById('json-datalist').innerHTML = "";

request.onreadystatechange = function() {

  if (request.readyState === 4 && request.status === 200) {

      var jsonOptions = JSON.parse(this.responseText).productos;
  
      for(var i=0;i<jsonOptions.length;i++){

      var producto = jsonOptions[i].nombre;

      if(producto.toUpperCase().indexOf(texto.toUpperCase()) != -1){

          var option = document.createElement('option');

          option.appendChild(document.createTextNode(producto));

          document.getElementById('json-datalist').appendChild(option);
        }

      }
      
      $('#ajax').placeholder = "Buscar";

    } else {

      $('#ajax').placeholder = "Ha ocurrido un error :(";

    }
  };

$('#ajax').placeholder = "Loading options...";

request.open('GET', 'db.json', true);
request.send();

});