using GsConstruccion.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GsConstruccion.App.Controllers
{
    public class LoginController : Controller
    {
        private readonly DataLogin dataLogin = new DataLogin();
        // GET: Login          

        public JsonResult IniciarSesion(string Usuario, string Password)
        {
            string resultado = dataLogin.IniciarSesion(Usuario, Password);
            return Json(resultado);
        }
    }
}