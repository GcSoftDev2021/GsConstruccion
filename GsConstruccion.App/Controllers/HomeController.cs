using GsConstruccion.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GsConstruccion.App.Controllers
{
    public class HomeController : Controller
    {
        private readonly DataHome dataHome = new DataHome();
        // GET: Home
        public ActionResult Inicio()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public JsonResult ValidarIngresoPagina(string IdUser, string Modulo)
        {
            var resultado = dataHome.ValidarIngresoPagina(IdUser, Modulo);
            return Json(resultado);
        }

    }
}