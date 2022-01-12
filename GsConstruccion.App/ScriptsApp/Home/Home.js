function BuscarCookie() {
    let IdUser = Cookies.get('IdUserGestionSystem');
    if (IdUser == '' || IdUser == undefined || IdUser == null) {
        Swal.fire({
            title: 'Gestion System',
            text: "Su Sesión ya expiro, por favor vuelva a Ingresar",
            icon: 'info',
        }).then((result) => {
            window.location.href = '/Home/Login';
        })
    }
}

function CerrarSesion() {
    Cookies.remove('IdUserGestionSystem');
    window.location.href = '/Home/Login';
}

function IrPagina(Url) {
    debugger;
    let User = Cookies.get('IdUserGestionSystem');
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Home/ValidarIngresoPagina',
        data: { IdUser: User, Modulo: Url },
        success: function (resultado) {
            if (resultado == 'OK') {
                window.location.href = Url;
            } else {
                Swal.fire('GestionSystem', resultado, 'info');
            }
        }
    });
}

function BuscarIdUsuario() {
    let IdUser = Cookies.get('IdUserGestionSystem');
    return IdUser;
}