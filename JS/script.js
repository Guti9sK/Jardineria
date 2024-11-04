$(document).ready(function () {
  class Formulario {
    nombre;
    apellido;
    email;
    edad;
    provincia;
    ciudad;
    tipoDeReclamo;
    detallesDelReclamo;
  }

  var d = new Formulario();

  function LlenarClaseFormulario() {
    // dada la instancia de la clase Formulario creada globalmente, inicialzamos la instancia con los valores que el usuario ingresó en los Formularios
    // La idea es que esta clase Formulario nos sirva como contenedor de nuestros datos para hacer el SUBMIT posteriormente y emvar los datos (por ej al back-end)

    d.nombre = $("#nombre").val();
    d.apellido = $("#apellido").val();
    d.email = $("#email").val();
    d.edad = $("#edad").val();
    d.provincia = $("#provincia").val();
    d.ciudad = $("#ciudad").val();
    d.tipoDeReclamo = $("#tipoDeReclamo option:selected").val();
    d.detallesDelReclamo = $("#detalles").val();

    // muestra por pantalla los datos cargados anteriormente, dando al usuario la posibilidad de verificarlos y si está todo bien realizar la confirmación y envío.
    $("#nombreConfirmar").val(d.nombre);
    $("#apellidoConfirmar").val(d.apellido);
    $("#provinciaConfirmar").val(d.provincia);
    $("#ciudadConfirmar").val(d.ciudad);
    $("#emailConfirmar").val(d.email);
    $("#edadConfirmar").val(d.edad);
    $("#tipoDeReclamoConfirmar").val(d.tipoDeReclamo);
    $("#detalleConfirmar").val(d.detallesDelReclamo);

    $("#segundoForm").addClass("d-none"); //ocultamos la vista 2
    $("#confirmar").removeClass("d-none"); //mostramos la vista de confirmación
  }

  (() => {
    "use strict";

    var bloque1 = $("#primerForm");
    var bloque2 = $("#segundoForm");

    // Obtén todos los formularios que quieres validar
    const forms = $(".needs-validation");

    Array.from(forms).forEach((form) => {
      form.addEventListener("submit", (event) => {
        //comienza la validación de los datos (si no puede validar datos no avanza al siguiente Formulario)
        if (form.checkValidity() == false) {
          // hubo error en la entra de datos, no pasó la validacion
          alert("complete todos los campos, por favor");
          event.stopPropagation(); //evita enviar el Formulario (submit)
          event.preventDefault(); //evita enviar el Formulario (submit)
          form.classList.add("was-validated"); //clase que cambia el color de los inputs a verde y/o rojo según corresponda. Esto lo maneja Bootstrap automáticamente.
        } else {
          // no existe error en los datos de entrada del formulario

          form.classList.add("was-validated"); //clase que cambia el color de los inputs a verde

          event.stopPropagation();
          event.preventDefault();

          switch (form.id) {
            case "primerForm":
              bloque1.addClass("d-none");
              bloque2.removeClass("d-none");
              break;
            case "segundoForm":
              LlenarClaseFormulario();
              break;
            case "formContacto":
              alert("Datos guardados correctamente");
              break;
          }
        }
      });
    });
  })();

  const inputQuantity = document.querySelector(".input-quantity");
  const btnIncrement = document.querySelector("#increment");
  const btnDecrement = document.querySelector("#decrement");

  let valueByDefault = parseInt(inputQuantity.value);

  // Funciones Click

  btnIncrement.addEventListener("click", () => {
    valueByDefault += 1;
    inputQuantity.value = valueByDefault;
  });

  btnDecrement.addEventListener("click", () => {
    if (valueByDefault === 1) {
      return;
    }

    valueByDefault -= 1;
    inputQuantity.value = valueByDefault;
  });

  $("#btnPrevForm").click(function () {
    $("#primerForm").removeClass("d-none"); //mostramos la vista anterior
    $("#segundoForm").addClass("d-none"); //ocultamos la vista actual
  });

  $("#btnVolverConfirma").click(function () {
    $("#primerForm").removeClass("d-none"); //mostramos la vista anterior
    $("#confirmar").addClass("d-none"); //ocultamos la vista actual
  });

  $("#btnConfirmarDatos").click(function () {
    $("#contenedorJson").removeClass("d-none");

    // envio de datos.   ----> muestra los datos cargados en la instancia Formulario
    // f es la instancia de la case Formulario{} de alcance global
    $("#json").html(JSON.stringify(d, null, 4));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const $boton = document.querySelector("#btnExportarPDF");
  $boton.addEventListener("click", () => {
    // <-- Aquí puedes elegir cualquier elemento del DOM para Exportar a PDF  -->
    // const $elementoParaConvertir = document.body;

    //  <-- Descomentar la linea siguiente y probar exportar solamente la tabla -->
    const $elementoParaConvertir = document.querySelector("#confirmar");

    html2pdf()
      .set({
        margin: 0,
        filename: "documento.pdf",
        image: {
          type: "png",
          quality: 0.98,
        },
        html2canvas: {
          scale: 3,
          letterRendering: true,
          scrollY: 0,
        },
        jsPDF: {
          unit: "in",
          format: "a3",
          orientation: "portrait",
        },
      })
      .from($elementoParaConvertir)
      .save()
      .catch((err) => console.log(err));
  });
});
