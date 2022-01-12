using GsConstruccion.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GsConstruccion.App.Controllers
{
    public class RolController : Controller
    {
        private readonly DataRol dataRol = new DataRol();
        // GET: Rol
        public ActionResult Rol()
        {
            return View();
        }

        public JsonResult BuscarRolUsuario(string IdUser)
        {
            string resultado = dataRol.BuscarRolUsuario(IdUser);
            return Json(resultado);
        }

        public JsonResult ListaRol()
        {
            var resultado = dataRol.ListaRol();
            return Json(resultado);
        }

        public ActionResult GridRol()
        {
            var data = dataRol.GridRol();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CrearRol(string IdUser, string Modulo, string NombreRol)
        {
            string resultado = dataRol.CrearRol(IdUser, Modulo, NombreRol);
            return Json(resultado);
        }

        public JsonResult GuardarCambiosRol(string IdUser, string Modulo, int IdRol, string NombreRol, int Activo)
        {
            string resultado = dataRol.GuardarCambiosRol(IdUser, Modulo, IdRol, NombreRol, Activo);
            return Json(resultado);
        }

        public JsonResult EliminarRol(string IdUser, string Modulo, int IdRol)
        {
            string resultado = dataRol.EliminarRol(IdUser, Modulo, IdRol);
            return Json(resultado);
        }
    }
}