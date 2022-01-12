
function GridCiudad() {
    let datatable = $('#gridCiudad').DataTable({
        "responsive": true,
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/Ciudad/GridCiudad',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Id", title: "Id", "visible": false },
            { "data": "IdPais", title: "IdPais", "visible": false },
            { "data": "NombrePais", title: "País" },
            { "data": "Nombre", title: "Ciudad" },
            { "data": "Activo", title: "Activo", "visible": false },
            { "data": "Estado", title: "Estado" },
            { "data": "NombreUsuario", title: "Usuario Creador", "visible": true },
            { "data": "FechaCreacion", title: "Fecha Creación", "visible": true },
            {
                data: null,
                defaultContent: '<button class="EditarCiudad btn btn-primary btn-sm">Editar</button>',
                className: '',
                orderable: false,
                width: 100,
            },
            {
                data: null,
                defaultContent: '<button class="EliminarCiudad btn btn-danger btn-sm">Eliminar</button>',
                className: '',
                orderable: false,
                width: 100,
            },
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
    $('#gridCiudad').on('click', '.EditarCiudad', function () {
        let data = datatable.row($(this).parents()).data();
        debugger;
        $('#ModalEditarCiudad').modal('show');
        $('#IdCiudad').text(data.Id);
        $('#SelectEPais').val(data.IdPais);
        $('#SelectEstadoCiudad').val(data.Activo);
        $('#InputENombreCiudad').val(data.Nombre);
    });
    $('#gridCiudad').on('click', '.EliminarCiudad', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEliminarCiudad').modal('show');
        $('#IdDCiudad').text(data.Id);
        $('#MensajeEliminarCiudad').text('Esta seguro de Eliminar la Ciudad (' + data.Nombre + ') ?');
    })
}

function CrearCiudad() {
    let Modulo = '/Ciudad/Ciudad';
    let User = Cookies.get('IdUserGestionSystem');
    let IdPais = $('#SelectPais').val()
    let NombreCiudad = $('#InputNombreCiudad').val()
    if (IdPais == null || IdPais == '' || IdPais == undefined || IdPais == -1) {
        Swal.fire('GestionSystem', 'Seleccione el País', 'info');
    } else if (NombreCiudad == null || NombreCiudad == '' || NombreCiudad == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre de la Ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Ciudad/CrearCiudad',
            data: { IdUser: User, Modulo: Modulo, IdPais: IdPais, NombreCiudad: NombreCiudad },
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

function GuardarCambiosCiudad() {
    debugger
    let Modulo = '/Ciudad/Ciudad';
    let User = Cookies.get('IdUserGestionSystem');
    let IdPais = $('#SelectEPais').val();
    let IdCiudad = $('#IdCiudad').text();
    let NombreCiudad = $('#InputENombreCiudad').val();
    let Activo = $('#SelectEstadoCiudad').val();
    if (IdPais == null || IdPais == '' || IdPais == undefined || IdPais == -1) {
        Swal.fire('GestionSystem', 'Seleccione el País', 'info');
    } else if (NombreCiudad == null || NombreCiudad == '' || NombreCiudad == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre de la Ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Ciudad/GuardarCambiosCiudad',
            data: { IdUser: User, Modulo: Modulo, IdPais: IdPais, IdCiudad: IdCiudad, NombreCiudad: NombreCiudad, Activo: Activo },
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


function ListaCiudad() {
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
                $("#SelectCiudad").empty().append('<option value="-1">Seleccione Ciudad</option>');
                $.each(resultado, function () {
                    $("#SelectCiudad").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function ListaECiudad() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Ciudad/ListaCiudad',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectECiudad").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectECiudad").empty().append('<option value="-1">Seleccione Ciudad</option>');
                $.each(resultado, function () {
                    $("#SelectECiudad").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}


function EliminarCiudad() {
    debugger
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/Ciudad/Ciudad';
    let IdCiudad = $('#IdDCiudad').text();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Ciudad/EliminarCiudad',
        data: {
            IdUser: IdUser,
            Modulo: Modulo,
            IdCiudad: IdCiudad
        },
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
