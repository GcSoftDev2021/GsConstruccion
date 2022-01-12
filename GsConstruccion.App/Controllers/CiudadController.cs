using GsConstruccion.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GsConstruccion.App.Controllers
{
    public class CiudadController : Controller
    {
        private readonly DataCiudad dataCiudad = new DataCiudad();
        // GET: Ciudad
        public ActionResult Ciudad()
        {
            return View();
        }

        public JsonResult CrearCiudad(string IdUser, string Modulo, int IdPais, string NombreCiudad)
        {
            string resultado = dataCiudad.CrearCiudad(IdUser, Modulo, IdPais, NombreCiudad);
            return Json(resultado);
        }

        public ActionResult GridCiudad()
        {
            var data = dataCiudad.GridCiudad();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarCambiosCiudad(string IdUser, string Modulo, int IdPais, int IdCiudad, string NombreCiudad, int Activo)
        {
            var resultado = dataCiudad.GuardarCambiosCiudad(IdUser, Modulo, IdPais, IdCiudad, NombreCiudad, Activo);
            return Json(resultado);
        }

        public JsonResult ListaCiudad()
        {
            var resultado = dataCiudad.ListaCiudad();
            return Json(resultado);
        }

        public JsonResult EliminarCiudad(string IdUser, string Modulo, int IdCiudad)
        {
            string resultado = dataCiudad.EliminarCiudad(IdUser, Modulo, IdCiudad);
            return Json(resultado);
        }
    }
}