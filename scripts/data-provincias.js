const droplistProvincia = document.getElementById("slt-provincia"),
  droplistLocalidad = document.getElementById("slt-minu");

fetch("https://apis.datos.gob.ar/georef/api/provincias")
  .then((response) => {
    if (!response.ok) {
      throw new Error("La solicitud no fue exitosa");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const parametros=data.paramatros;
    const provincias = data.provincias;

    provincias.forEach((provincia) => {
      const option = document.createElement("option");
      option.value = data.parametros.nombre;
      option.textContent = provincia.nombre;
      droplistProvincia.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error al hacer la solicitud:", error);
  });

droplistProvincia.addEventListener("change", function () {
  var nombreprovincia = droplistProvincia.value,
    i = 0;
  console.log(nombreprovincia);
  while (droplistLocalidad.options.length > 0) {
    droplistLocalidad.remove(0);
    
  }
  fetch(
    `https://apis.datos.gob.ar/georef/api/municipios?provincia=${nombreprovincia}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const minicipios = data.municipios;

      minicipios.forEach((minicipio) => {
        const option = document.createElement("option");
        option.value = minicipio.id;
        option.textContent = minicipio.nombre;
        droplistLocalidad.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error al hacer la solicitud:", error);
    });
});
