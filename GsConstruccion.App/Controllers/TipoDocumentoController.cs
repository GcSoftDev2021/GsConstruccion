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
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListaTipoDocumento()
        {
            var resultado = dataTipoDocumento.ListaTipoDocumento();
            return Json(resultado);
        }
    }
}