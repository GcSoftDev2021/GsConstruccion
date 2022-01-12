
function BuscarRolUsuario(IdUser) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Rol/BuscarRolUsuario',
        data: { IdUser: IdUser },
        success: function (resultado) {
            return resultado;
        }
    });
}


function ListaRol() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Rol/ListaRol',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectRol").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectRol").empty().append('<option value="-1">Seleccione Rol</option>');
                $.each(resultado, function () {
                    $("#SelectRol").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function GridRol() {
    let datatable = $('#gridRol').DataTable({
        "responsive": true,
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/Rol/GridRol',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Id", title: "Id", "visible": false },
            { "data": "Nombre", title: "Rol" },
            { "data": "Activo", title: "Activo", "visible": false },
            { "data": "Estado", title: "Estado" },
            {
                data: null,
                defaultContent: '<button class="EditarRol btn btn-primary btn-sm">Editar</button>',
                className: '',
                orderable: false,
                width: 100,
            },
            {
                data: null,
                defaultContent: '<button class="EliminarRol btn btn-danger btn-sm">Eliminar</button>',
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
    $('#gridRol').on('click', '.EditarRol', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEditarRol').modal('show');
        $('#IdRol').text(data.Id);
        $('#SelectEstadoRol').val(data.Activo);
        $('#InputENombreRol').val(data.Nombre);
    });
    $('#gridRol').on('click', '.EliminarRol', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEliminarRol').modal('show');
        $('#IdDRol').text(data.Id);
        $('#MensajeEliminarRol').text('Esta seguro de Eliminar el Rol (' + data.Nombre + ') ?');
    })
}


function CrearRol() {
    var Modulo = '/UsersManagement/RolUsers';
    var IdUser = Cookies.get('IdUserGestionSystem');
    let NombreRol = $('#InputNombreRol').val()
    if (NombreRol == null || NombreRol == '' || NombreRol == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre del Rol', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Rol/CrearRol',
            data: {
                IdUser: IdUser,
                Modulo: Modulo,
                NombreRol: NombreRol
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

function GuardarCambiosRol() {
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/UsersManagement/RolUsers';
    let IdRol = $('#IdRol').text();
    let NombreRol = $('#InputENombreRol').val();
    let Activo = $('#SelectEstadoRol').val();
    if (NombreRol == null || NombreRol == '' || NombreRol == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre del Rol', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Rol/GuardarCambiosRol',
            data: {
                IdUser: IdUser,
                Modulo: Modulo,
                IdRol: IdRol,
                NombreRol: NombreRol,
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

function EliminarRol() {
    debugger
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/UsersManagement/RolUsers';
    let IdRol = $('#IdDRol').text();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Rol/EliminarRol',
        data: {
            IdUser: IdUser,
            Modulo: Modulo,
            IdRol: IdRol
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