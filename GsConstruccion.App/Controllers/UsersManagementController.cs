using GsConstruccion.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GsConstruccion.App.Controllers
{
    public class UsersManagementController : Controller
    {
        private readonly DataUsersManagement dataUsersManagement = new DataUsersManagement();
        // GET: UsersManagement
        public ActionResult Users()
        {
            return View();
        }

        public ActionResult PermisoUsers()
        {
            return View();
        }

        public ActionResult RolUsers()
        {
            return View();
        }

        public ActionResult GridPermisoUsuario()
        {
            var data = dataUsersManagement.GridPermisoUsuario();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CrearPermisoUsuario(
            string IdUser,
            string Modulo,
            int IdUsuarioPermiso,
            int IdModuloPermiso,
            int Leer,
            int Crear,
            int Modificar,
            int Eliminar)
        {
            string resultado = dataUsersManagement.CrearPermisoUsuario(
                IdUser,
                Modulo,
                IdUsuarioPermiso,
                IdModuloPermiso,
                Leer,
                Crear,
                Modificar,
                Eliminar);
            return Json(resultado);
        }

        public JsonResult GuardarCambiosPermisoUsuario(
           string IdUser,
           string Modulo,
           int IdPermisoUsuario,
           int Leer,
           int Crear,
           int Modificar,
           int Eliminar)
        {
            string resultado = dataUsersManagement.GuardarCambiosPermisoUsuario(
                IdUser,
                Modulo,
                IdPermisoUsuario,
                Leer,
                Crear,
                Modificar,
                Eliminar);
            return Json(resultado);
        }

        public JsonResult EliminarPermisoUsuario(string IdUser, string Modulo, int IdPermisoUsuario)
        {
            string resultado = dataUsersManagement.EliminarPermisoUsuario(IdUser, Modulo, IdPermisoUsuario);
            return Json(resultado);
        }

        public ActionResult GridUsuario()
        {
            var data = dataUsersManagement.GridUsuario();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CrearUsuario(
            string IdUser,
            string Modulo,
            string Usuario,
            string PasswordUser,
            string EmailUser,
            string NombreUsuario,
            int IdRol,
            DateTime FechaVigenciaUser)
        {
            string resultado = dataUsersManagement.CrearUsuario(
                IdUser,
                Modulo,
                Usuario,
                PasswordUser,
                EmailUser,
                NombreUsuario,
                IdRol,
                FechaVigenciaUser);
            return Json(resultado);
        }

        public JsonResult GuardarCambiosUsuario(
            string IdUser,
               string Modulo,
               int IdUsuario,
               string Usuario,
               string PasswordUser,
               string EmailUser,
               string NombreUsuario,
               int IdRol,
               DateTime FechaVigenciaUser,
               int Activo)
        {
            string resultado = dataUsersManagement.GuardarCambiosUsuario(IdUser,
               Modulo,
               IdUsuario,
               Usuario,
               PasswordUser,
               EmailUser,
               NombreUsuario,
               IdRol,
               FechaVigenciaUser,
               Activo);
            return Json(resultado);
        }

        public JsonResult EliminarUsuario(string IdUser, string Modulo, int IdUsuario)
        {
            string resultado = dataUsersManagement.EliminarUsuario(IdUser, Modulo, IdUsuario);
            return Json(resultado);
        }
    }
}