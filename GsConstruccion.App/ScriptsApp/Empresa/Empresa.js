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
            { "data": "Identificacion", title: "Identificacion"},           
            { "data": "Email", title: "Email", "visible": false },
            { "data": "Telefono", title: "Telefono" },
            { "data": "Contacto", title: "Contacto", "visible": false },
            { "data": "Direccion", title: "Direccion"},  
            { "data": "Estado", title: "Estado" },            
            {
                data: null,
                defaultContent: '<button class="DetalleEmpresa btn btn-warning btn-sm">Detalle</button>',
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
   
    //$('#gridEmpresa').on('click', '.EliminarEmpresa', function () {
    //    let data = datatable.row($(this).parents()).data();
    //    $('#ModalEliminarEmpresa').modal('show');
    //    $('#IdDEmpresa').text(data.Id);
    //    $('#MensajeEliminarEmpresa').text('Esta seguro de Eliminar la Empresa (' + data.Nombre + ') ?');
    //})

    $('#gridEmpresa').on('click', '.DetalleEmpresa', function () {
        let data = datatable.row($(this).parents()).data();
        PaginaDetalle(data.Id);
    })
}

function PaginaDetalle(Id) {
    window.location.href = '/Empresa/Detalle_Empresa' + '?Id=' + Id;
}

function CargarDatosDetalleEmpresa() {    
    var Id = gup('Id');
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Empresa/CargarDatosDetalleEmpresa',
        data: {
            Id: Id  
        },
        success: function (data) {            
                $('#NombreEmpresa').text(data.data[0].NombreEmpresa);
                $('#Identificacion').text(data.data[0].Identificacion);
                $('#Email').text(data.data[0].Email);
                $('#Telefono').text(data.data[0].Telefono);
                $('#Direccion').text(data.data[0].Direccion);
                $('#NombreContacto').text(data.data[0].NombreContacto);
                $('#Estado').text(data.data[0].Estado);           
        }
    });     
}

function PaginaEditar() {
    var Id = gup('Id');
    window.location.href = '/Empresa/Editar_Empresa' + '?Id=' + Id;
}

function CargarDatosEditarEmpresa() {
    var Id = gup('Id');
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Empresa/CargarDatosEditarEmpresa',
        data: {
            Id: Id
        },
        success: function (data) {
            $('#InputNombre').val(data.data[0].NombreEmpresa);
            $('#SelectTipoDocumento').val(data.data[0].IdTipoDocumento);
            $('#InputNumeroDocumento').val(data.data[0].NumeroIdentificacion);
            $('#InputEmail').val(data.data[0].Email);
            $('#InputTelefono').val(data.data[0].Telefono);
            $('#InputDireccion').val(data.data[0].Direccion);
            $('#SelectCiudad').val(data.data[0].IdCiudad);
            $('#InputNombreContacto').val(data.data[0].NombreContacto);
            $('#SelectEstado').val(data.data[0].Activo);
        }
    });
}
