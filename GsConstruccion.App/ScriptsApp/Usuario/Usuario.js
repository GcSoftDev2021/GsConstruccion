
function DatosUsuario() {
    let IdUser = Cookies.get('IdUserGestionSystem');
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Usuario/DatosUsuario',
        data: { IdUser: IdUser },
        success: function (resultado) {
            $("#ImagePerfilUsuario").empty().append('<img src="' + resultado[0].RutaImagenUsuario + '" style="width:150px" />');
            $('#Usuario').text(resultado[0].Usuario);
            $('#RolUsuario').text(resultado[0].RolUsuario);
            $('#NombreUsuario').text(resultado[0].NombreUsuario);
            $('#EmailUsuario').text(resultado[0].EmailUsuario);
            $('#FechaCreacion').text(resultado[0].FechaCreacion);
            $('#Vigencia').text(resultado[0].Vigencia);
        },
    });
}

function GridHistorialIngresoUsuario() {
    let IdUser = Cookies.get('IdUserGestionSystem');
    $('#gridHistorialIngresoUsuario').DataTable({
        "responsive": true,
        "order": [[1, "desc"]],
        destroy: true,
        "ajax": {
            "url": '/Usuario/GridHistorialIngresoUsuario' + '?IdUser=' + IdUser,
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Usuario", title: "Usuario" },
            { "data": "FechaIngreso", title: "Fecha Ingreso" },
        ],
        dom: 'Bfrtlip',
        buttons: [
            //'copy', 'csv',
            'excel', 'pdf', 'print'
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json"
        },
        lengthMenu: [
            [5, 25, 50, -1],
            ['5 Filas', '25 Filas', '50 Filas', 'Ver Todo']
        ],
    });
}

function CambiarPaswwordUsuario() {
    let Modulo = '/Usuario/InformacionUsuario';
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Password = $('#InputPasswordAnterior').val();
    let NuevoPassword = $('#InputPasswordNuevo').val();
    let VereficarPassword = $('#InputPasswordNuevoVerificacion').val();
    if (Password == null || Password == '' || Password == undefined) {
        Swal.fire('GestionSystem', 'Ingrese la contraseña anterior', 'info');
    } else if (NuevoPassword == null || NuevoPassword == '' || NuevoPassword == undefined) {
        Swal.fire('GestionSystem', 'Ingrese la nueva contraseña', 'info');
    } else if (VereficarPassword == null || VereficarPassword == '' || VereficarPassword == undefined) {
        Swal.fire('GestionSystem', 'El campo confirmar Contraseña no puede estar vacio', 'info');
    } else if (NuevoPassword != VereficarPassword) {
        Swal.fire('GestionSystem', 'La contraseña nueva y la confirmación de contraseña no coinciden por favor valide', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Usuario/CambiarPaswwordUsuario',
            data: { IdUser: IdUser, Modulo: Modulo, Password: Password, NuevoPassword: NuevoPassword },
            success: function (resultado) {
                valor = resultado.split('__');
                if (valor[0] == 'OK') {
                    Swal.fire({
                        title: 'GestionSystem',
                        text: valor[1],
                        icon: 'success',
                    }).then((result) => {
                        location.reload();
                    })
                } else {
                    Swal.fire('GestionSystem', valor[1], 'info');
                }
            }
        });
    }
}

function ListaUsuario() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Usuario/ListaUsuario',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectUsuario").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectUsuario").empty().append('<option value="-1">Seleccione Usuario</option>');
                $.each(resultado, function () {
                    $("#SelectUsuario").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}