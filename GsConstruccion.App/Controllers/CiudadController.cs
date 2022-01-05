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
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListaCiudad()
        {
            var resultado = dataCiudad.ListaCiudad();
            return Json(resultado);
        }
    }
}