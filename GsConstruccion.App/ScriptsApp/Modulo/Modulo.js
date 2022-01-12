function ListaModulo() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Modulo/ListaModulo',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectModulo").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectModulo").empty().append('<option value="-1">Seleccione Modulo</option>');
                $.each(resultado, function () {
                    $("#SelectModulo").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function GridModulo() {
    let datatable = $('#gridModulo').DataTable({
        "responsive": true,
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/Modulo/GridModulo',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Id", title: "Id", "visible": false },
            { "data": "Nombre", title: "Modulo" },
            { "data": "RutaPagina", title: "Url Página" },
            { "data": "Activo", title: "Activo", "visible": false },
            { "data": "Estado", title: "Estado" },
            { "data": "NombreUsuario", title: "Usuario Creador", "visible": true },
            { "data": "FechaCreacion", title: "Fecha Creación", "visible": true },
            {
                data: null,
                defaultContent: '<button class="EditarModulo btn btn-primary btn-sm">Editar</button>',
                className: '',
                orderable: false,
                width: 100,
            },
            {
                data: null,
                defaultContent: '<button class="EliminarModulo btn btn-danger btn-sm">Eliminar</button>',
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
    $('#gridModulo').on('click', '.EditarModulo', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEditarModulo').modal('show');
        $('#IdModulo').text(data.Id);
        $('#SelectEstadoModulo').val(data.Activo);
        $('#InputENombreModulo').val(data.Nombre);
        $('#InputERutaPagina').val(data.RutaPagina);
    });
    $('#gridModulo').on('click', '.EliminarModulo', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEliminarModulo').modal('show');
        $('#IdDModulo').text(data.Id);
        $('#MensajeEliminarModulo').text('Esta seguro de Eliminar el Modulo (' + data.Nombre + ') ?');
    })
}

function CrearModulo() {
    var Modulo = '/Modulo/Modulo';
    var IdUser = Cookies.get('IdUserGestionSystem');
    let NombreModulo = $('#InputNombreModulo').val()
    let UrlPagina = $('#InputRutaPagina').val()
    if (NombreModulo == null || NombreModulo == '' || NombreModulo == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre del Modulo', 'info');
    } else if (UrlPagina == null || UrlPagina == '' || UrlPagina == undefined) {
        Swal.fire('GestionSystem', 'Ingrese la Url de la Página', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Modulo/CrearModulo',
            data: {
                IdUser: IdUser,
                Modulo: Modulo,
                NombreModulo: NombreModulo,
                UrlPagina: UrlPagina
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
}

function GuardarCambiosModulo() {
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/Modulo/Modulo';
    let IdModulo = $('#IdModulo').text();
    let NombreModulo = $('#InputENombreModulo').val()
    let UrlPagina = $('#InputERutaPagina').val()
    let Activo = $('#SelectEstadoModulo').val()
    if (NombreModulo == null || NombreModulo == '' || NombreModulo == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre del Modulo', 'info');
    } else if (UrlPagina == null || UrlPagina == '' || UrlPagina == undefined) {
        Swal.fire('GestionSystem', 'Ingrese la Url de la Página', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Modulo/GuardarCambiosModulo',
            data: {
                IdUser: IdUser,
                Modulo: Modulo,
                IdModulo: IdModulo,
                NombreModulo: NombreModulo,
                UrlPagina: UrlPagina,
                Activo: Activo
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
}

function EliminarModulo() {
    debugger
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/Modulo/Modulo';
    let IdModulo = $('#IdDModulo').text();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Modulo/EliminarModulo',
        data: {
            IdUser: IdUser,
            Modulo: Modulo,
            IdModulo: IdModulo
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