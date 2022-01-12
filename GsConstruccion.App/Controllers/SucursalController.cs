using GsConstruccion.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GsConstruccion.App.Controllers
{
    public class SucursalController : Controller
    {
        private readonly DataSucursal dataSucursal = new DataSucursal();
        // GET: Sucursal
        public ActionResult Sucursal()
        {
            return View();
        }

        public JsonResult CrearSucursal(string IdUser, string Modulo, int IdEmpresa, string NombreSucursal, string EmailSucursal, string TelefonoSucursal, string ContactoSucursal, string DireccionSucursal, int IdCiudad)
        {
            string resultado = dataSucursal.CrearSucursal(IdUser, Modulo, IdEmpresa, NombreSucursal, EmailSucursal, TelefonoSucursal, ContactoSucursal, DireccionSucursal, IdCiudad);
            return Json(resultado);
        }

        public ActionResult GridSucursal()
        {
            var data = dataSucursal.GridSucursal();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarCambiosSucursal(string IdUser, string Modulo, int IdEmpresa, int IdSucursal, string NombreSucursal, string EmailSucursal, string TelefonoSucursal, string ContactoSucursal, string DireccionSucursal, int IdCiudad, int Activo)
        {
            var resultado = dataSucursal.GuardarCambiosSucursal(IdUser, Modulo, IdEmpresa, IdSucursal, NombreSucursal, EmailSucursal, TelefonoSucursal, ContactoSucursal, DireccionSucursal, IdCiudad, Activo);
            return Json(resultado);
        }

        public JsonResult ListaSucursal()
        {
            var resultado = dataSucursal.ListaSucursal();
            return Json(resultado);
        }

        public JsonResult EliminarSucursal(string IdUser, string Modulo, int IdSucursal)
        {
            string resultado = dataSucursal.EliminarSucursal(IdUser, Modulo, IdSucursal);
            return Json(resultado);
        }
    }
}