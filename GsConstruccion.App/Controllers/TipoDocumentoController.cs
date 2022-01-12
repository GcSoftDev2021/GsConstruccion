using GsConstruccion.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GsConstruccion.App.Controllers
{
    public class TipoDocumentoController : Controller
    {
        private readonly DataTipoDocumento dataTipoDocumento = new DataTipoDocumento();
        // GET: TipoDocumento
        public ActionResult TipoDocumento()
        {
            return View();
        }

        // GET: TipoDocumento

        public JsonResult CrearTipoDocumento(string IdUser, string Modulo, string NombreTipoDocumento, string Descripcion)
        {
            string resultado = dataTipoDocumento.CrearTipoDocumento(IdUser, Modulo, NombreTipoDocumento, Descripcion);
            return Json(resultado);
        }

        public ActionResult GridTipoDocumento()
        {
            var data = dataTipoDocumento.GridTipoDocumento();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarCambiosTipoDocumento(int IdTipoDocumento, string IdUser, string Modulo, string NombreTipoDocumento, string Descripcion, int Activo)
        {
            var resultado = dataTipoDocumento.GuardarCambiosTipoDocumento(IdTipoDocumento, IdUser, Modulo, NombreTipoDocumento, Descripcion, Activo);
            return Json(resultado);
        }

        public JsonResult ListaTipoDocumento()
        {
            var resultado = dataTipoDocumento.ListaTipoDocumento();
            return Json(resultado);
        }

        public JsonResult EliminarTipoDocumento(string IdUser, string Modulo, int IdTipoDocumento)
        {
            string resultado = dataTipoDocumento.EliminarTipoDocumento(IdUser, Modulo, IdTipoDocumento);
            return Json(resultado);
        }
    }
}