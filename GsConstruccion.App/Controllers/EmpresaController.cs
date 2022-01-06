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

        public ActionResult Crear_Empresa()
        {
            return View();
        }

        public ActionResult Lista_Empresa()
        {
            return View();
        }

        public ActionResult Editar_Empresa()
        {
            return View();
        }

        public ActionResult Detalle_Empresa()
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

        public ActionResult CargarDatosDetalleEmpresa(int Id)
        {
            var data = dataEmpresa.CargarDatosDetalleEmpresa(Id);
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CargarDatosEditarEmpresa(int Id)
        {
            var data = dataEmpresa.CargarDatosEditarEmpresa(Id);
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }
    }
}