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

//               AJAX DATALIST

$('#ajax').on('keyup',function () {

var request = new XMLHttpRequest();

var texto = this.value;

document.getElementById('json-datalist').innerHTML = "";

request.onreadystatechange = function() {

  if (request.readyState === 4 && request.status === 200) {

      var jsonOptions = JSON.parse(this.responseText);

      jsonOptions.forEach(function(producto){

          var option = document.createElement('option');

          option.appendChild(document.createTextNode(producto.nombre));

          document.getElementById('json-datalist').appendChild(option);
        });

      $('#ajax').placeholder = "Buscar";

      } else {

      $('#ajax').placeholder = "Ha ocurrido un error :(";

    }
  };

$('#ajax').placeholder = "Loading options...";

request.open('GET', 'https://my-json-server.typicode.com/alextodeah/AJAX/productos?q='+this.value, true);
request.send();

});