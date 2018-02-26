// Ocultamos y mostramos un formulario segun quiera hacer log In o sign Up

$('ul.opciones li').click(function(){
  var tab = $(this).attr('data-tab');

  $('ul.opciones li').removeClass('current');
  $('.registro').removeClass('current');

  $(this).addClass('current');
  $(tab).addClass('current');
});

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

// AÑADIR MEDIANTE AJAX LOS PAISES AL SELECT

var urlCountries = "https://raw.githubusercontent.com/umpirsky/country-list/master/data/es/country.json";

var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
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
        document.getElementById('pais').appendChild(option);    
    }

}, function(status) {
  alert('Algo fue mal.');
});
