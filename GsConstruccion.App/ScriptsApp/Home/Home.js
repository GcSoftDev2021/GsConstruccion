﻿function BuscarCookie() {
    let IdUser = Cookies.get('IdUser');
    if (IdUser == '' || IdUser == undefined || IdUser == null) {
        Swal.fire({
            title: 'GS Construcción',
            text: "Su Sesión ya expiro, por favor vuelva a Ingresar",
            icon: 'info',
        }).then((result) => {
            window.location.href = '/Login/Login';
        })
    }
}

function CerrarSesion() {
    Cookies.remove('IdUser');
    window.location.href = '/Login/Login';
}

function IrPagina(Url) {
    debugger;
    let User = Cookies.get('IdUser');
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Home/ValidarIngresoPagina',
        data: { IdUser: User, Modulo: Url },
        success: function (resultado) {
            if (resultado == 'OK') {
                window.location.href = Url;
            } else {
                Swal.fire('GS Construcción', resultado, 'info');
            }
        }
    });
}

function BuscarIdUsuario() {
    let IdUser = Cookies.get('IdUser');
    return IdUser;
}