const getHtmlPaises = (paises) => {

    let html ="";

    if(paises.error){
        
        Swal.fire("Atencion", paises.error , "error");

    }

    if(paises.length > 0){

    html = `<table class="table table-striped table-bordered table-hover dt-responsive tablas">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Region</th>
        <th scope="col">Sub-Region</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
  `;

 paises.forEach(usuario => {

        html += `<tr>
         <th scope="row">${usuario.id}</th>
         <td>${usuario.nombre}</td>
         <td>${usuario.region}</td>
         <td>${usuario.sub_region}</td>
         <td>
         <button type="button" class="btn btn-outline-warning btn-sm btnEditarPais" onClick="">Editar</button>
         <button type="button" class="btn btn-outline-danger btn-sm btnEliminarPais"  nombreUsuario="${usuario.nombre + " " + usuario.region}" idUsuario="${usuario.id}" onClick="eliminarPais(event)" >Eliminar</button>
         </td>
       </tr>`     

    });

    html += `  
   
     </tbody>
   </table>`;

} 

    return html;

}

btnPais.addEventListener('click', async (e) => {

    e.preventDefault();

    contenidoMostrar.innerHTML = '<div class="alert alert-secondary" role="alert">Lista de Paises</div>';
    const divTabla = document.createElement("div");
    divTabla.classList.add("divTabla")
    contenidoMostrar.appendChild(divTabla);

    divTabla.innerHTML = "";

    const ext = '/v1/paisesFiltro/';
    const cuerpo = {};

    const metodo = 'POST';

    let paises = await fetcheo(url, ext, cuerpo, metodo);

    if(paises.error){Swal.fire("Atencion", paises.error , "error");}
        if (paises) {

            const tabla = getHtmlPaises(paises);
            divTabla.innerHTML = tabla;


        } else if (paises.error) { Swal.fire("Atencion", paises.error , "error"); }
        else { Swal.fire("Atencion", paises.error , "error"); }

});

async function eliminarPais(e) {

  e.preventDefault();

  const idUsuario = await e.target.attributes.idUsuario.value;
  const nombreUsuario = await e.target.attributes.nombreUsuario.value;

  Swal.fire({
      title: `¿Está segur@ de borrar a ${nombreUsuario}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Borrar`,
      denyButtonText: `NOOO !`,
  }).then(async (result) => {
      if (result.isConfirmed) {
          try {

              const ext = '/v1/paises/';
              const cuerpo = {
                  "id": idUsuario
              };

              const metodo = 'DELETE';

              const eliminarUsuario = await fetcheo(url, ext, cuerpo, metodo);

              if (eliminarUsuario.mensaje) {

                  Swal.fire("Eliminado!", "Usuario Eliminado Correctamente.", "success");
                  document.querySelector(".divTabla").innerHTML = "";


              } else if (eliminarUsuario.error) { Swal.fire("Atencion", eliminarUsuario.error, "error"); }

          } catch (err) {
              Swal.fire("Atencion", error, "error");
          }

      } else if (result.isDenied) {
          Swal.fire("Cancelado!", "Operacion Cancelada", "info");
      }
  })

};