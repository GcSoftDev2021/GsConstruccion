function ListaERol() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Rol/ListaRol',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectERol").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectERol").empty().append('<option value="-1">Seleccione Rol</option>');
                $.each(resultado, function () {
                    $("#SelectERol").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function GridPermisoUsuario() {
    let datatable = $('#gridPermisoUsuario').DataTable({
        "responsive": true,
        "order": [[1, "desc"]],
        destroy: true,
        "ajax": {
            "url": '/UsersManagement/GridPermisoUsuario',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Id", title: "Id", "visible": false },
            { "data": "Usuario", title: "Usuario" },
            { "data": "Modulo", title: "Modulo" },
            { "data": "IdLeer", title: "IdLeer", "visible": false },
            { "data": "EstadoLeer", title: "Visualizar" },
            { "data": "IdCrear", title: "IdCrear", "visible": false },
            { "data": "EstadoCrear", title: "Crear" },
            { "data": "IdEditar", title: "IdEditar", "visible": false },
            { "data": "EstadoEditar", title: "Editar" },
            { "data": "IdEliminar", title: "IdEliminar", "visible": false },
            { "data": "EstadoEliminar", title: "Eliminar" },
            { "data": "NombreUsuario", title: "Usuario Creador", "visible": true },
            { "data": "FechaCreacion", title: "Fecha Creación", "visible": true },
            {
                data: null,
                defaultContent: '<button class="EditarPermisoUsuario btn btn-primary btn-sm">Editar</button>',
                className: '',
                orderable: false,
                width: 100,
            },
            {
                data: null,
                defaultContent: '<button class="EliminarPermisoUsuario btn btn-danger btn-sm">Eliminar</button>',
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
    $('#gridPermisoUsuario').on('click', '.EditarPermisoUsuario', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEditarPermisoUsuario').modal('show');
        $('#IdPermisoUsuario').text(data.Id);
        $('#EInputNombreUsuario').val(data.Usuario);
        $('#ENombreModulo').val(data.Modulo);
        $('#SelectEAccionLeer').val(data.IdLeer);
        $('#SelectEAccionCrear').val(data.IdCrear);
        $('#SelectEAccionEditar').val(data.IdEditar);
        $('#SelectEAccionEliminar').val(data.IdEliminar);
    });
    $('#gridPermisoUsuario').on('click', '.EliminarPermisoUsuario', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEliminarPermisoUsuario').modal('show');
        $('#IdDPermisoUsuario').text(data.Id);
        $('#MensajeEliminarPermiso').text('Esta seguro de Eliminar los permisos del modulo (' + data.Modulo + ') para el Usuario (' + data.Usuario + ') ?');
    })
}

function CrearPermisoUsuario() {
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/UsersManagement/PermisoUsers';
    let IdUsuarioPermiso = $('#SelectUsuario').val();
    let IdModuloPermiso = $('#SelectModulo').val();
    let Leer = $('#SelectAccionLeer').val();
    let Crear = $('#SelectAccionCrear').val();
    let Modificar = $('#SelectAccionEditar').val();
    let Eliminar = $('#SelectAccionEliminar').val();
    if (IdUsuarioPermiso == null || IdUsuarioPermiso == '' || IdUsuarioPermiso == undefined || IdUsuarioPermiso == -1) {
        Swal.fire('GestionSystem', 'Seleccione el Usuario', 'info');
    } else if (IdModuloPermiso == null || IdModuloPermiso == '' || IdModuloPermiso == undefined || IdModuloPermiso == -1) {
        Swal.fire('GestionSystem', 'Seleccione el Modulo', 'info');
    } else {

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/UsersManagement/CrearPermisoUsuario',
            data: {
                IdUser: IdUser,
                Modulo: Modulo,
                IdUsuarioPermiso: IdUsuarioPermiso,
                IdModuloPermiso: IdModuloPermiso,
                Leer: Leer,
                Crear: Crear,
                Modificar: Modificar,
                Eliminar: Eliminar
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

function GuardarCambiosPermisoUsuario() {
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/UsersManagement/PermisoUsers';
    let IdPermisoUsuario = $('#IdPermisoUsuario').text();
    let Leer = $('#SelectEAccionLeer').val();
    let Crear = $('#SelectEAccionCrear').val();
    let Modificar = $('#SelectEAccionEditar').val();
    let Eliminar = $('#SelectEAccionEliminar').val();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/UsersManagement/GuardarCambiosPermisoUsuario',
        data: {
            IdUser: IdUser,
            Modulo: Modulo,
            IdPermisoUsuario: IdPermisoUsuario,
            Leer: Leer,
            Crear: Crear,
            Modificar: Modificar,
            Eliminar: Eliminar
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

function EliminarPermisoUsuario() {
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/UsersManagement/PermisoUsers';
    let IdPermisoUsuario = $('#IdDPermisoUsuario').text();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/UsersManagement/EliminarPermisoUsuario',
        data: {
            IdUser: IdUser,
            Modulo: Modulo,
            IdPermisoUsuario: IdPermisoUsuario
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

function GridUsuario() {
    let datatable = $('#gridUsuario').DataTable({
        "responsive": true,
        "order": [[1, "desc"]],
        destroy: true,
        "ajax": {
            "url": '/UsersManagement/GridUsuario',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Id", title: "Id", "visible": false },
            {
                title: "Imagen",
                "data": "ImagenPerfil", "aTargets": [0],
                "render": function (data) {
                    return '<img src="' + data + '" width="50" border-radius:50%/>';
                }
            },
            { "data": "Usuario", title: "Usuario" },
            { "data": "Email", title: "Email" },
            { "data": "NombreUsuario", title: "Nombre" },
            { "data": "IdRol", title: "IdRol", "visible": false },
            { "data": "NombreRol", title: "Rol" },
            { "data": "FechaCreacion", title: "FeCha Creación" },
            { "data": "FechaVigencia", title: "Fecha Vigencia" },
            { "data": "Activo", title: "Activo", "visible": false },
            { "data": "Estado", title: "Estado" },
            {
                data: null,
                defaultContent: '<button class="EditarUsuario btn btn-primary btn-sm">Editar</button>',
                className: '',
                orderable: false,
                width: 100,
            },
            {
                data: null,
                defaultContent: '<button class="EliminarUsuario btn btn-danger btn-sm">Eliminar</button>',
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
    $('#gridUsuario').on('click', '.EditarUsuario', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEditarUsuario').modal('show');
        $('#IdUsuario').text(data.Id);
        $('#InputEUser').val(data.Usuario);
        $('#InputEEmailUser').val(data.Email);
        $('#InputENombreUsuario').val(data.NombreUsuario);
        $('#SelectERol').val(data.IdRol);
        $('#InputEFechaVigenciaUser').val(data.FechaVigencia);
        $('#SelectEstadoUsuario').val(data.Activo);
    });
    $('#gridUsuario').on('click', '.EliminarUsuario', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEliminarUsuario').modal('show');
        $('#IdDUsuario').text(data.Id);
        $('#MensajeEliminarUsuario').text('Esta seguro de Eliminar el Usuario (' + data.Usuario + ')?');
    })
}

function CrearUsuario() {
    debugger
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/UsersManagement/Users';
    let Usuario = $('#InputUser').val();
    let PasswordUser = $('#InputPasswordUser').val();
    let EmailUser = $('#InputEmailUser').val();
    let NombreUsuario = $('#InputNombreUsuario').val();
    let IdRol = $('#SelectRol').val();
    let FechaVigenciaUser = $('#InputFechaVigenciaUser').val();
    if (Usuario == null || Usuario == '' || Usuario == undefined) {
        Swal.fire('GestionSystem', 'Ingrese el Usuario para Inicio de Sesión en la Aplicación', 'info');
    } else if (PasswordUser == null || PasswordUser == '' || PasswordUser == undefined) {
        Swal.fire('GestionSystem', 'Ingrese la Contraseña para Inicio de Sesión en la Aplicación', 'info');
    } else if (NombreUsuario == null || NombreUsuario == '' || NombreUsuario == undefined) {
        Swal.fire('GestionSystem', 'Ingrese el Nombre Personal del Usuario', 'info');
    } else if (IdRol == null || IdRol == '' || IdRol == undefined || IdRol == -1) {
        Swal.fire('GestionSystem', 'Seleccione el Rol para el Usuario', 'info');
    } else if (FechaVigenciaUser == null || FechaVigenciaUser == '' || FechaVigenciaUser == undefined) {
        Swal.fire('GestionSystem', 'Ingrese la Fecha de Vigencia para el Usuario', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/UsersManagement/CrearUsuario',
            data: {
                IdUser: IdUser,
                Modulo: Modulo,
                Usuario: Usuario,
                PasswordUser: PasswordUser,
                EmailUser: EmailUser,
                NombreUsuario: NombreUsuario,
                IdRol: IdRol,
                FechaVigenciaUser: FechaVigenciaUser
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


function GuardarCambiosUsuario() {
    debugger
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/UsersManagement/Users';
    let IdUsuario = $('#IdUsuario').text();
    let Usuario = $('#InputEUser').val();
    let PasswordUser = $('#InputEPasswordUser').val();
    let EmailUser = $('#InputEEmailUser').val();
    let NombreUsuario = $('#InputENombreUsuario').val();
    let IdRol = $('#SelectERol').val();
    let FechaVigenciaUser = $('#InputEFechaVigenciaUser').val();
    let Activo = $('#SelectEstadoUsuario').val();
    if (Usuario == null || Usuario == '' || Usuario == undefined) {
        Swal.fire('GestionSystem', 'Ingrese el Usuario de Ingreso a la Aplicación', 'info');
    } else if (NombreUsuario == null || NombreUsuario == '' || NombreUsuario == undefined) {
        Swal.fire('GestionSystem', 'Ingrese el Nombre Personal del Usuario', 'info');
    } else if (IdRol == null || IdRol == '' || IdRol == undefined || IdRol == -1) {
        Swal.fire('GestionSystem', 'Seleccione el Rol para el Usuario', 'info');
    } else if (FechaVigenciaUser == null || FechaVigenciaUser == '' || FechaVigenciaUser == undefined) {
        Swal.fire('GestionSystem', 'Ingrese la Fecha de Vigencia para el Usuario', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/UsersManagement/GuardarCambiosUsuario',
            data: {
                IdUser: IdUser,
                Modulo: Modulo,
                IdUsuario: IdUsuario,
                Usuario: Usuario,
                PasswordUser: PasswordUser,
                EmailUser: EmailUser,
                NombreUsuario: NombreUsuario,
                IdRol: IdRol,
                FechaVigenciaUser: FechaVigenciaUser,
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

function EliminarUsuario() {
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/UsersManagement/Users';
    let IdUsuario = $('#IdDUsuario').text();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/UsersManagement/EliminarUsuario',
        data: {
            IdUser: IdUser,
            Modulo: Modulo,
            IdUsuario: IdUsuario
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