function CrearEmpresa() {
    let Modulo = '/Empresa/Empresa';
    let User = Cookies.get('IdUser');
    let NombreEmpresa = $('#InputNombre').val();
    let IdTipoDocumento = $('#SelectTipoDocumento').val();
    let IdentificacionEmpresa = $('#InputNumeroDocumento').val();
    let EmailEmpresa = $('#InputEmail').val();
    let TelefonoEmpresa = $('#InputTelefono').val();
    let ContactoEmpresa = $('#InputNombreContacto').val();
    let DireccionEmpresa = $('#InputDireccion').val();
    let IdCiudad = $('#SelectCiudad').val();
    if (NombreEmpresa == null || NombreEmpresa == '' || NombreEmpresa == undefined) {
        Swal.fire('GS Construcción dice:', 'Ingrese Nombre de la Empresa', 'info');
    } else if (IdTipoDocumento == null || IdTipoDocumento == '' || IdTipoDocumento == undefined || IdTipoDocumento == -1) {
        Swal.fire('GS Construcción dice:', 'Seleccione el Tipo de Documento', 'info');
    } else if (IdentificacionEmpresa == null || IdentificacionEmpresa == '' || IdentificacionEmpresa == undefined) {
        Swal.fire('GS Construcción dice:', 'Ingrese la Identificación de la Empresa', 'info');
    } else if (IdCiudad == null || IdCiudad == '' || IdCiudad == undefined || IdCiudad == -1) {
        Swal.fire('GS Construcción dice:', 'Seleccione la Ciudad', 'info');
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
                        title: 'GS Construcción dice:',
                        text: valor[1],
                        icon: 'success',
                    }).then((result) => {
                        location.reload();
                    })
                } else {
                    Swal.fire('GS Construcción dice:', valor[1], 'info');
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
            //{ "data": "NombreUsuario", title: "Usuario Creador", "visible": true },
            //{ "data": "FechaCreacion", title: "Fecha Creación", "visible": true },
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