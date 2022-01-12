

function CrearEmpresa() {
    let Modulo = '/Empresa/Empresa';
    let User = Cookies.get('IdUserGestionSystem');
    let NombreEmpresa = $('#InputNombreEmpresa').val();
    let IdTipoDocumento = $('#SelectTipoDocumento').val();
    let IdentificacionEmpresa = $('#InputNumeroIdentificacionEmpresa').val();
    let EmailEmpresa = $('#InputEmailEmpresa').val();
    let TelefonoEmpresa = $('#InputTelefonoEmpresa').val();
    let ContactoEmpresa = $('#InputContactoEmpresa').val();
    let DireccionEmpresa = $('#InputDireccionEmpresa').val();
    let IdCiudad = $('#SelectCiudad').val();
    if (NombreEmpresa == null || NombreEmpresa == '' || NombreEmpresa == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre de la Empresa', 'info');
    } else if (IdTipoDocumento == null || IdTipoDocumento == '' || IdTipoDocumento == undefined || IdTipoDocumento == -1) {
        Swal.fire('GestionSystem', 'Seleccione el Tipo de Documento', 'info');
    } else if (IdentificacionEmpresa == null || IdentificacionEmpresa == '' || IdentificacionEmpresa == undefined) {
        Swal.fire('GestionSystem', 'Ingrese la Identificación de la Empresa', 'info');
    } else if (IdCiudad == null || IdCiudad == '' || IdCiudad == undefined || IdCiudad == -1) {
        Swal.fire('GestionSystem', 'Seleccione la Ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Empresa/CrearEmpresa',
            data: {
                IdUser: User,
                Modulo: Modulo,
                NombreEmpresa: NombreEmpresa,
                IdTipoDocumento: IdTipoDocumento,
                IdentificacionEmpresa: IdentificacionEmpresa,
                EmailEmpresa: EmailEmpresa,
                TelefonoEmpresa: TelefonoEmpresa,
                ContactoEmpresa: ContactoEmpresa,
                DireccionEmpresa: DireccionEmpresa,
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


function GridEmpresa() {
    let datatable = $('#gridEmpresa').DataTable({
        "responsive": true,
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/Empresa/GridEmpresa',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Id", title: "Id", "visible": false },
            { "data": "Nombre", title: "Empresa" },
            { "data": "IdTipoDocumento", title: "IdTipoDocumento", "visible": false },
            { "data": "TipoDocumento", title: "TipoDocumento", "visible": false },
            { "data": "IdentificacionEmpresa", title: "Identificacion", "visible": false },
            {
                data: null,
                render: function (data, type, row) {
                    return row.TipoDocumento + ' ' + row.IdentificacionEmpresa;
                },
                title: "Identificación"
            },
            { "data": "Email", title: "Email" },
            { "data": "Telefono", title: "Telefono" },
            { "data": "Contacto", title: "Contacto" },
            { "data": "DireccionEmpresa", title: "DireccionEmpresa", "visible": false },
            { "data": "IdCiudad", title: "IdCiudad", "visible": false },
            { "data": "NombreCiudad", title: "NombreCiudad", "visible": false },
            {
                data: null,
                render: function (data, type, row) {
                    return row.DireccionEmpresa + ' ' + row.NombreCiudad;
                },
                title: "Direccion"
            },
            { "data": "Activo", title: "Activo", "visible": false },
            { "data": "Estado", title: "Estado" },
            { "data": "NombreUsuario", title: "Usuario Creador", "visible": true },
            { "data": "FechaCreacion", title: "Fecha Creación", "visible": true },
            {
                data: null,
                defaultContent: '<button class="EditarEmpresa btn btn-primary btn-sm">Editar</button>',
                className: '',
                orderable: false,
                width: 100,
            },
            {
                data: null,
                defaultContent: '<button class="EliminarEmpresa btn btn-danger btn-sm">Eliminar</button>',
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
    $('#gridEmpresa').on('click', '.EditarEmpresa', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEditarEmpresa').modal('show');
        $('#IdEmpresa').text(data.Id);
        $('#InputENombreEmpresa').val(data.Nombre);
        $('#SelectETipoDocumento').val(data.IdTipoDocumento);
        $('#InputENumeroIdentificacionEmpresa').val(data.IdentificacionEmpresa);
        $('#InputEEmailEmpresa').val(data.Email);
        $('#InputETelefonoEmpresa').val(data.Telefono);
        $('#InputEContactoEmpresa').val(data.Contacto);
        $('#InputEDireccionEmpresa').val(data.DireccionEmpresa);
        $('#SelectECiudad').val(data.IdCiudad);
        $('#SelectEstadoEmpresa').val(data.Activo);


    });
    $('#gridEmpresa').on('click', '.EliminarEmpresa', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEliminarEmpresa').modal('show');
        $('#IdDEmpresa').text(data.Id);
        $('#MensajeEliminarEmpresa').text('Esta seguro de Eliminar la Empresa (' + data.Nombre + ') ?');
    })
}

function GuardarCambiosEmpresa() {
    let Modulo = '/Empresa/Empresa';
    let User = Cookies.get('IdUserGestionSystem');
    let IdEmpresa = $('#IdEmpresa').text();
    let NombreEmpresa = $('#InputENombreEmpresa').val();
    let IdTipoDocumento = $('#SelectETipoDocumento').val();
    let IdentificacionEmpresa = $('#InputENumeroIdentificacionEmpresa').val();
    let EmailEmpresa = $('#InputEEmailEmpresa').val();
    let TelefonoEmpresa = $('#InputETelefonoEmpresa').val();
    let ContactoEmpresa = $('#InputEContactoEmpresa').val();
    let DireccionEmpresa = $('#InputEDireccionEmpresa').val();
    let IdCiudad = $('#SelectECiudad').val();
    let Activo = $('#SelectEstadoEmpresa').val();
    if (NombreEmpresa == null || NombreEmpresa == '' || NombreEmpresa == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre de la Empresa', 'info');
    } else if (IdTipoDocumento == null || IdTipoDocumento == '' || IdTipoDocumento == undefined || IdTipoDocumento == -1) {
        Swal.fire('GestionSystem', 'Seleccione el Tipo de Documento', 'info');
    } else if (IdentificacionEmpresa == null || IdentificacionEmpresa == '' || IdentificacionEmpresa == undefined) {
        Swal.fire('GestionSystem', 'Ingrese la Identificación de la Empresa', 'info');
    } else if (IdCiudad == null || IdCiudad == '' || IdCiudad == undefined || IdCiudad == -1) {
        Swal.fire('GestionSystem', 'Seleccione la Ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Empresa/GuardarCambiosEmpresa',
            data: {
                IdUser: User,
                Modulo: Modulo,
                IdEmpresa: IdEmpresa,
                NombreEmpresa: NombreEmpresa,
                IdTipoDocumento: IdTipoDocumento,
                IdentificacionEmpresa: IdentificacionEmpresa,
                EmailEmpresa: EmailEmpresa,
                TelefonoEmpresa: TelefonoEmpresa,
                ContactoEmpresa: ContactoEmpresa,
                DireccionEmpresa: DireccionEmpresa,
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

function ListaEmpresa() {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Empresa/ListaEmpresa',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectEmpresa").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectEmpresa").empty().append('<option value="-1">Seleccione Empresa</option>');
                $.each(resultado, function () {
                    $("#SelectEmpresa").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}


function ListaEEmpresa() {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Empresa/ListaEmpresa',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectEEmpresa").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectEEmpresa").empty().append('<option value="-1">Seleccione Empresa</option>');
                $.each(resultado, function () {
                    $("#SelectEEmpresa").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function EliminarEmpresa() {
    debugger
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/Empresa/Empresa';
    let IdEmpresa = $('#IdDEmpresa').text();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Empresa/EliminarEmpresa',
        data: {
            IdUser: IdUser,
            Modulo: Modulo,
            IdEmpresa: IdEmpresa
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




