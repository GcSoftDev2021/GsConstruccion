using GsConstruccion.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GsConstruccion.App.Controllers
{
    public class UsuarioController : Controller
    {
        private readonly DataUsuario dataUsuario = new DataUsuario();
        // GET: InformacionUsuario
        public ActionResult InformacionUsuario()
        {
            return View();
        }

        public JsonResult DatosUsuario(string IdUser)
        {
            var resultado = dataUsuario.DatosUsuario(IdUser);
            return Json(resultado);
        }

        public ActionResult GridHistorialIngresoUsuario(string IdUser)
        {
            var data = dataUsuario.GridHistorialIngresoUsuario(IdUser);
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CambiarPaswwordUsuario(string IdUser, string Modulo, string Password, string NuevoPassword)
        {
            var resultado = dataUsuario.CambiarPaswwordUsuario(IdUser, Modulo, Password, NuevoPassword);
            return Json(resultado);
        }

        public JsonResult ListaUsuario()
        {
            var resultado = dataUsuario.ListaUsuario();
            return Json(resultado);
        }
    }
}