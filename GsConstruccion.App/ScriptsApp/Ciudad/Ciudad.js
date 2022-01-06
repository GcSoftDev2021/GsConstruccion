﻿function ListaCiudad() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Ciudad/ListaCiudad',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectCiudad").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectCiudad").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectCiudad").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}
