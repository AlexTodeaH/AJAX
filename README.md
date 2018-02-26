# Busqueda AJAX

Realizamos búsquedas con distintas entradas y aparecen todos los productos que coinciden algún caracter ( no es sensible a caracteres ). Está hecho con __jsonServer__ en local pero para que se pueda ver en __gitHub pages__ he creado un servidor online que permite __GitHub__ con __jsonServer__ añadiendo la dirección de mi _json_ en __GitHub__ a la _URL: https://my-json-server.typicode.com/_.

![Búsqueda](https://github.com/AlexTodeaH/AJAX/blob/master/Busqueda.PNG)

![Búsqueda](https://github.com/AlexTodeaH/AJAX/blob/master/Busqueda_2.PNG)


```JavaScript
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
```

## Inserción de paises

Como implementación extra he insertado los paises del formulario 
mediante __AJAX__. Cogemos los paises de una __URL__ con un _JSON_ y
lo recorremos mientras vamos creando elementos y añadiéndole el valor del nombre del país.

```JavaScript
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
```