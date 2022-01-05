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