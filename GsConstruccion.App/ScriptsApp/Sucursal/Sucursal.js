

function GridSucursal() {
    let datatable = $('#gridSucursal').DataTable({
        "responsive": true,
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/Sucursal/GridSucursal',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Id", title: "Id", "visible": false },
            { "data": "IdEmpresa", title: "IdEmpresa", "visible": false },
            { "data": "NombreEmpresa", title: "Empresa" },
            { "data": "Nombre", title: "Sucursal" },
            { "data": "Email", title: "Email" },
            { "data": "Telefono", title: "Telefono" },
            { "data": "Contacto", title: "Contacto" },
            { "data": "DireccionSucursal", title: "DireccionSucursal", "visible": false },
            { "data": "IdCiudad", title: "IdCiudad", "visible": false },
            { "data": "NombreCiudad", title: "NombreCiudad", "visible": false },
            {
                data: null,
                render: function (data, type, row) {
                    return row.DireccionSucursal + ' ' + row.NombreCiudad;
                },
                title: "Direccion"
            },
            { "data": "Activo", title: "Activo", "visible": false },
            { "data": "Estado", title: "Estado" },
            { "data": "NombreUsuario", title: "Usuario Creador", "visible": true },
            { "data": "FechaCreacion", title: "Fecha Creación", "visible": true },
            {
                data: null,
                defaultContent: '<button class="EditarSucursal btn btn-primary btn-sm">Editar</button>',
                className: '',
                orderable: false,
                width: 100,
            },
            {
                data: null,
                defaultContent: '<button class="EliminarSucursal btn btn-danger btn-sm">Eliminar</button>',
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
    $('#gridSucursal').on('click', '.EditarSucursal', function () {
        let data = datatable.row($(this).parents()).data();
        debugger;
        $('#ModalEditarSucursal').modal('show');
        $('#IdSucursal').text(data.Id);
        $('#SelectEEmpresa').val(data.IdEmpresa);
        $('#InputENombreSucursal').val(data.Nombre);
        $('#InputEEmailSucursal').val(data.Email);
        $('#InputETelefonoSucursal').val(data.Telefono);
        $('#InputEContactoSucursal').val(data.Contacto);
        $('#InputEDireccionSucursal').val(data.DireccionSucursal);
        $('#SelectECiudad').val(data.IdCiudad);
        $('#SelectEstadoSucursal').val(data.Activo);
    });
    $('#gridSucursal').on('click', '.EliminarSucursal', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEliminarSucursal').modal('show');
        $('#IdDSucursal').text(data.Id);
        $('#MensajeEliminarSucursal').text('Esta seguro de Eliminar la Sucursal (' + data.Nombre + ') ?');
    })
}

function CrearSucursal() {
    let Modulo = '/Sucursal/Sucursal';
    let User = Cookies.get('IdUserGestionSystem');
    let IdEmpresa = $('#SelectEmpresa').val()
    let NombreSucursal = $('#InputNombreSucursal').val();
    let EmailSucursal = $('#InputEmailSucursal').val();
    let TelefonoSucursal = $('#InputTelefonoSucursal').val();
    let ContactoSucursal = $('#InputContactoSucursal').val();
    let DireccionSucursal = $('#InputDireccionSucursal').val();
    let IdCiudad = $('#SelectCiudad').val();
    if (IdEmpresa == null || IdEmpresa == '' || IdEmpresa == undefined || IdEmpresa == -1) {
        Swal.fire('GestionSystem', 'Seleccione el Empresa', 'info');
    } else if (NombreSucursal == null || NombreSucursal == '' || NombreSucursal == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre de la Sucursal', 'info');
    } else if (IdCiudad == null || IdCiudad == '' || IdCiudad == undefined || IdCiudad == -1) {
        Swal.fire('GestionSystem', 'Seleccione la Ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Sucursal/CrearSucursal',
            data: {
                IdUser: User,
                Modulo: Modulo,
                IdEmpresa: IdEmpresa,
                NombreSucursal: NombreSucursal,
                EmailSucursal: EmailSucursal,
                TelefonoSucursal: TelefonoSucursal,
                ContactoSucursal: ContactoSucursal,
                DireccionSucursal: DireccionSucursal,
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
}

function GuardarCambiosSucursal() {
    debugger
    let Modulo = '/Sucursal/Sucursal';
    let User = Cookies.get('IdUserGestionSystem');
    let IdEmpresa = $('#SelectEEmpresa').val();
    let IdSucursal = $('#IdSucursal').text();
    let NombreSucursal = $('#InputENombreSucursal').val();
    let EmailSucursal = $('#InputEEmailSucursal').val();
    let TelefonoSucursal = $('#InputETelefonoSucursal').val();
    let ContactoSucursal = $('#InputEContactoSucursal').val();
    let DireccionSucursal = $('#InputEDireccionSucursal').val();
    let IdCiudad = $('#SelectECiudad').val();
    let Activo = $('#SelectEstadoSucursal').val();
    if (IdEmpresa == null || IdEmpresa == '' || IdEmpresa == undefined || IdEmpresa == -1) {
        Swal.fire('GestionSystem', 'Seleccione el Empresa', 'info');
    } else if (NombreSucursal == null || NombreSucursal == '' || NombreSucursal == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre de la Sucursal', 'info');
    } else if (IdCiudad == null || IdCiudad == '' || IdCiudad == undefined || IdCiudad == -1) {
        Swal.fire('GestionSystem', 'Seleccione la Ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Sucursal/GuardarCambiosSucursal',
            data: {
                IdUser: User,
                Modulo: Modulo,
                IdEmpresa: IdEmpresa,
                IdSucursal: IdSucursal,
                NombreSucursal: NombreSucursal,
                EmailSucursal: EmailSucursal,
                TelefonoSucursal: TelefonoSucursal,
                ContactoSucursal: ContactoSucursal,
                DireccionSucursal: DireccionSucursal,
                IdCiudad: IdCiudad,
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


function ListaSucursal() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Sucursal/ListaSucursal',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectSucursal").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectSucursal").empty().append('<option value="-1">Seleccione Sucursal</option>');
                $.each(resultado, function () {
                    $("#SelectSucursal").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function EliminarSucursal() {
    debugger
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/Sucursal/Sucursal';
    let IdSucursal = $('#IdDSucursal').text();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Sucursal/EliminarSucursal',
        data: {
            IdUser: IdUser,
            Modulo: Modulo,
            IdSucursal: IdSucursal
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