function Ingresar() {
    let Usuario = $('#InputUsuario').val()
    let Password = $('#InputPassword').val()
    if (Usuario == '' || Usuario == null || Usuario == undefined) {
        Swal.fire('GS Construcción dice:', 'Por favor ingrese el nombre de Usuario!', 'warning');
    }
    else if (Password == '' || Password == null || Password == undefined) {
        Swal.fire('GS Construcción dice:', 'Por favor ingrese la contraseña!', 'warning');
    }
    else {
        $.ajax({
            type: 'POST',
            dataType: 'Json',
            url: '/Login/IniciarSesion',
            data: { Usuario: Usuario, Password: Password },
            success: function (resultado) {
                valor = resultado.split('__');
                if (valor[0] == 'OK') {
                    Cookies.set('IdUser', valor[1]);
                    //Cookies.set('IdUser', valor[1], { expires: 20 });
                    window.location.href = '/Home/Inicio';
                    //window.location.href = '/Home/Inicio' + '?User=' + valor[1];
                } else {
                    Swal.fire('GS Construcción dice:', valor[1], 'info');
                }
            },
        });
    }
}
