function traer(queQuieroBuscar){
    fetch('http://www.omdbapi.com/?' + queQuieroBuscar + '&plot=short&apikey=TU-KEY') //Pone tu key aca
    .then (data => data.json())
    .then(data => {
        //console.log(data);
        let datos = (!data.hasOwnProperty("Search") ? data : data.Search);
        var lista = "";
        if(!data.hasOwnProperty("Search")){
            lista+=`<tr><th scope='row'>1</th><td>${datos.Title}</td><td>${datos.Year}</td><td><img src=${datos.Poster} alt="Poster ${datos.Title}" onclick="verMasInfo('${datos.imdbID}');" ></td></tr>`;
        }
        else{
            for(i=0; i<datos.length; i++){
                lista+=`<tr><th scope='row'>${i+1}</th><td>${datos[i].Title}</td><td>${datos[i].Year}</td><td><img src=${datos[i].Poster} alt="Poster ${datos[i].Title}" onclick="verMasInfo('${datos[i].imdbID}');"></td></tr>`;
            }
        }

        document.getElementById("contenido").innerHTML = `
        <table class="table table-striped table-dark">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Año</th>
            <th scope="col">Poster</th>
        </tr>
        </thead>
        <tbody>`
        + lista +
        `</tbody>
        </table>
        `;
    })
}

function verMasInfo(idObjeto){
    infoExtraABuscar = "&i=" + idObjeto;
    console.log('http://www.omdbapi.com/?' + infoExtraABuscar + '&plot=short&apikey=TU-KEY'); //Pone tu key aca
    fetch('http://www.omdbapi.com/?' + infoExtraABuscar + '&plot=short&apikey=TU-KEY') //Pone tu key aca
    .then (data => data.json())
    .then(data => {
        console.log(data);
        textitoModal.innerHTML = `
        <h4>Plot</h4>
        ${data.Plot}
        </br>
        <h4>Actores</h4>
        ${data.Actors}
        <h4>Género</h4>
        ${data.Genre}
        `;
        $('#modalMuestraDatos').modal('show')
    })
}

function cerrarModal(){
    $('#modalMuestraDatos').modal('hide')
}

function agarrarLoQueMeIngresan(){
    var año = document.getElementById("año").value;
    var nombre = document.getElementById("name").value;
    var tipo = document.getElementById("tipo").value;
    var queQuieroBuscar = "s=" + nombre + (tipo!=null ? "&type=" + tipo : "") + (año!=null ? "&y=" + año : "");
    traer(queQuieroBuscar);
}