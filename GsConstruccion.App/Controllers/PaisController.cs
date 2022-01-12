using GsConstruccion.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GsConstruccion.App.Controllers
{
    public class PaisController : Controller
    {
        private readonly DataPais dataPais = new DataPais();

        // GET: Pais
        public ActionResult Pais()
        {
            return View();
        }

        public JsonResult CrearPais(string IdUser, string Modulo, string NombrePais)
        {
            string resultado = dataPais.CrearPais(IdUser, Modulo, NombrePais);
            return Json(resultado);
        }

        public ActionResult GridPais()
        {
            var data = dataPais.GridPais();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarCambiosPais(int IdPais, string IdUser, string Modulo, string NombrePais, int Activo)
        {
            var resultado = dataPais.GuardarCambiosPais(IdPais, IdUser, Modulo, NombrePais, Activo);
            return Json(resultado);
        }

        public JsonResult ListaPais()
        {
            var resultado = dataPais.ListaPais();
            return Json(resultado);
        }

        public JsonResult EliminarPais(string IdUser, string Modulo, int IdPais)
        {
            string resultado = dataPais.EliminarPais(IdUser, Modulo, IdPais);
            return Json(resultado);
        }
    }
}