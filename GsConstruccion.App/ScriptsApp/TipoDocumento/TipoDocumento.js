

function CrearTipoDocumento() {
    let Modulo = '/TipoDocumento/TipoDocumento';
    let User = Cookies.get('IdUserGestionSystem');
    let NombreTipoDocumento = $('#InputNombreTipoDocumento').val();
    let Descripcion = $('#InputDescripcionTipoDocumento').val();
    if (NombreTipoDocumento == null || NombreTipoDocumento == '' || NombreTipoDocumento == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre del Tipo Documento', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/TipoDocumento/CrearTipoDocumento',
            data: { IdUser: User, Modulo: Modulo, NombreTipoDocumento: NombreTipoDocumento, Descripcion: Descripcion },
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


function GridTipoDocumento() {
    let datatable = $('#gridTipoDocumento').DataTable({
        "responsive": true,
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/TipoDocumento/GridTipoDocumento',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Id", title: "Id", "visible": false },
            { "data": "Nombre", title: "TipoDocumento" },
            { "data": "Descripcion", title: "Descripción" },
            { "data": "Activo", title: "Activo", "visible": false },
            { "data": "Estado", title: "Estado" },
            { "data": "NombreUsuario", title: "Usuario Creador", "visible": true },
            { "data": "FechaCreacion", title: "Fecha Creación", "visible": true },
            {
                data: null,
                defaultContent: '<button class="EditarTipoDocumento btn btn-primary btn-sm">Editar</button>',
                className: '',
                orderable: false,
                width: 100,
            },
            {
                data: null,
                defaultContent: '<button class="EliminarTipoDocumento btn btn-danger btn-sm">Eliminar</button>',
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
    $('#gridTipoDocumento').on('click', '.EditarTipoDocumento', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEditarTipoDocumento').modal('show');
        $('#IdTipoDocumento').text(data.Id);
        $('#SelectEstadoTipoDocumento').val(data.Activo);
        $('#InputENombreTipoDocumento').val(data.Nombre);
        $('#InputEDescripcionTipoDocumento').val(data.Descripcion);
    });
    $('#gridTipoDocumento').on('click', '.EliminarTipoDocumento', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEliminarTipoDocumento').modal('show');
        $('#IdDTipoDocumento').text(data.Id);
        $('#MensajeEliminarTipoDocumento').text('Esta seguro de Eliminar el Tipo Documento (' + data.Nombre + ') ?');
    })
}

function GuardarCambiosTipoDocumento() {
    let Modulo = '/TipoDocumento/TipoDocumento';
    let User = Cookies.get('IdUserGestionSystem');
    let IdTipoDocumento = $('#IdTipoDocumento').text();
    let NombreTipoDocumento = $('#InputENombreTipoDocumento').val();
    let Descripcion = $('#InputEDescripcionTipoDocumento').val();
    let Activo = $('#SelectEstadoTipoDocumento').val();
    if (NombreTipoDocumento == '' || NombreTipoDocumento == null || NombreTipoDocumento == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre del Tipo Documento', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/TipoDocumento/GuardarCambiosTipoDocumento',
            data: { IdTipoDocumento: IdTipoDocumento, IdUser: User, Modulo: Modulo, NombreTipoDocumento: NombreTipoDocumento, Descripcion: Descripcion, Activo: Activo },
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

function ListaTipoDocumento() {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/TipoDocumento/ListaTipoDocumento',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectTipoDocumento").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectTipoDocumento").empty().append('<option value="-1">Seleccione Documento</option>');
                $.each(resultado, function () {
                    $("#SelectTipoDocumento").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function ListaETipoDocumento() {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/TipoDocumento/ListaTipoDocumento',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectETipoDocumento").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectETipoDocumento").empty().append('<option value="-1">Seleccione Documento</option>');
                $.each(resultado, function () {
                    $("#SelectETipoDocumento").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function EliminarTipoDocumento() {
    debugger
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/TipoDocumento/TipoDocumento';
    let IdTipoDocumento = $('#IdDTipoDocumento').text();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/TipoDocumento/EliminarTipoDocumento',
        data: {
            IdUser: IdUser,
            Modulo: Modulo,
            IdTipoDocumento: IdTipoDocumento
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