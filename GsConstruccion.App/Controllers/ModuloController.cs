using GsConstruccion.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GsConstruccion.App.Controllers
{
    public class ModuloController : Controller
    {
        private readonly DataModulo dataModulo = new DataModulo();
        // GET: Modulo
        public ActionResult Modulo()
        {
            return View();
        }

        public JsonResult ListaModulo()
        {
            var resultado = dataModulo.ListaModulo();
            return Json(resultado);
        }

        public ActionResult GridModulo()
        {
            var data = dataModulo.GridModulo();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CrearModulo(string IdUser, string Modulo, string NombreModulo, string UrlPagina)
        {
            string resultado = dataModulo.CrearModulo(IdUser, Modulo, NombreModulo, UrlPagina);
            return Json(resultado);
        }

        public JsonResult GuardarCambiosModulo(string IdUser, string Modulo, int IdModulo, string NombreModulo, string UrlPagina, int Activo)
        {
            string resultado = dataModulo.GuardarCambiosModulo(IdUser, Modulo, IdModulo, NombreModulo, UrlPagina, Activo);
            return Json(resultado);
        }

        public JsonResult EliminarModulo(string IdUser, string Modulo, int IdModulo)
        {
            string resultado = dataModulo.EliminarModulo(IdUser, Modulo, IdModulo);
            return Json(resultado);
        }
    }
}