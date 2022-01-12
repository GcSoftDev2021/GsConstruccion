using GsConstruccion.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GsConstruccion.App.Controllers
{
    public class EmpresaController : Controller
    {
        private readonly DataEmpresa dataEmpresa = new DataEmpresa();
        // GET: Empresa
        public ActionResult Empresa()
        {
            return View();
        }

        public JsonResult CrearEmpresa(string IdUser, string Modulo, string NombreEmpresa, int IdTipoDocumento, string IdentificacionEmpresa, string EmailEmpresa, string TelefonoEmpresa, string ContactoEmpresa, string DireccionEmpresa, int IdCiudad)
        {
            string resultado = dataEmpresa.CrearEmpresa(IdUser, Modulo, NombreEmpresa, IdTipoDocumento, IdentificacionEmpresa, EmailEmpresa, TelefonoEmpresa, ContactoEmpresa, DireccionEmpresa, IdCiudad);
            return Json(resultado);
        }

        public ActionResult GridEmpresa()
        {
            var data = dataEmpresa.GridEmpresa();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarCambiosEmpresa(string IdUser, string Modulo, int IdEmpresa, string NombreEmpresa, int IdTipoDocumento, string IdentificacionEmpresa, string EmailEmpresa, string TelefonoEmpresa, string ContactoEmpresa, string DireccionEmpresa, int IdCiudad, int Activo)
        {
            var resultado = dataEmpresa.GuardarCambiosEmpresa(IdUser, Modulo, IdEmpresa, NombreEmpresa, IdTipoDocumento, IdentificacionEmpresa, EmailEmpresa, TelefonoEmpresa, ContactoEmpresa, DireccionEmpresa, IdCiudad, Activo);
            return Json(resultado);
        }

        public JsonResult ListaEmpresa()
        {
            var resultado = dataEmpresa.ListaEmpresa();
            return Json(resultado);
        }

        public JsonResult EliminarEmpresa(string IdUser, string Modulo, int IdEmpresa)
        {
            string resultado = dataEmpresa.EliminarEmpresa(IdUser, Modulo, IdEmpresa);
            return Json(resultado);
        }
    }
}