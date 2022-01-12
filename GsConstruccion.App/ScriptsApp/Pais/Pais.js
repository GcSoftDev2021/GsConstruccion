

function CrearPais() {
    let Modulo = '/Pais/Pais';
    let User = Cookies.get('IdUserGestionSystem');
    let NombrePais = $('#InputNombrePais').val()
    if (NombrePais == null || NombrePais == '' || NombrePais == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre del País', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Pais/CrearPais',
            data: { IdUser: User, Modulo: Modulo, NombrePais: NombrePais },
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


function GridPais() {
    let datatable = $('#gridPais').DataTable({
        "responsive": true,
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/Pais/GridPais',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Id", title: "Id", "visible": false },
            { "data": "Nombre", title: "Pais" },
            { "data": "Activo", title: "Activo", "visible": false },
            { "data": "Estado", title: "Estado" },
            { "data": "NombreUsuario", title: "Usuario Creador", "visible": true },
            { "data": "FechaCreacion", title: "Fecha Creación", "visible": true },
            {
                data: null,
                defaultContent: '<button class="EditarPais btn btn-primary btn-sm">Editar</button>',
                className: '',
                orderable: false,
                width: 100,
            },
            {
                data: null,
                defaultContent: '<button class="EliminarPais btn btn-danger btn-sm">Eliminar</button>',
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
    $('#gridPais').on('click', '.EditarPais', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEditarPais').modal('show');
        $('#IdPais').text(data.Id);
        $('#SelectEstadoPais').val(data.Activo);
        $('#EInputNombrePais').val(data.Nombre);
    });
    $('#gridPais').on('click', '.EliminarPais', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEliminarPais').modal('show');
        $('#IdDPais').text(data.Id);
        $('#MensajeEliminarPais').text('Esta seguro de Eliminar el País (' + data.Nombre + ') ?');
    })
}

function GuardarCambiosPais() {
    let Modulo = '/Pais/Pais';
    let User = Cookies.get('IdUserGestionSystem');
    let IdPais = $('#IdPais').text();
    let NombrePais = $('#EInputNombrePais').val();
    let Activo = $('#SelectEstadoPais').val();
    if (NombrePais == '' || NombrePais == null || NombrePais == undefined) {
        Swal.fire('GestionSystem', 'Ingrese Nombre del País', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Pais/GuardarCambiosPais',
            data: { IdPais: IdPais, IdUser: User, Modulo: Modulo, NombrePais: NombrePais, Activo: Activo },
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

function ListaPais() {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Pais/ListaPais',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectPais").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectPais").empty().append('<option value="-1">Seleccione País</option>');
                $.each(resultado, function () {
                    $("#SelectPais").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function ListaEPais() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Pais/ListaPais',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectEPais").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectEPais").empty().append('<option value="-1">Seleccione País</option>');
                $.each(resultado, function () {
                    $("#SelectEPais").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}


function EliminarPais() {
    debugger
    let IdUser = Cookies.get('IdUserGestionSystem');
    let Modulo = '/Pais/Pais';
    let IdPais = $('#IdDPais').text();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Pais/EliminarPais',
        data: {
            IdUser: IdUser,
            Modulo: Modulo,
            IdPais: IdPais
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