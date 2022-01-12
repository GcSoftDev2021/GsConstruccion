using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GsConstruccion.Models
{
    public class UsersManagement
    {
        public class GridPermisoUsuario
        {
            public int Id { get; set; }
            public string Usuario { get; set; }
            public string Modulo { get; set; }
            public int IdLeer { get; set; }
            public string EstadoLeer { get; set; }
            public int IdCrear { get; set; }
            public string EstadoCrear { get; set; }
            public int IdEditar { get; set; }
            public string EstadoEditar { get; set; }
            public int IdEliminar { get; set; }
            public string EstadoEliminar { get; set; }
            public string NombreUsuario { get; set; }
            public string FechaCreacion { get; set; }
        }

        public class GridUsuario
        {
            public int Id { get; set; }
            public string Usuario { get; set; }
            public string Email { get; set; }
            public string NombreUsuario { get; set; }
            public int IdRol { get; set; }
            public string NombreRol { get; set; }
            public string ImagenPerfil { get; set; }
            public string FechaCreacion { get; set; }
            public string FechaVigencia { get; set; }
            public int Activo { get; set; }
            public string Estado { get; set; }
        }
    }
}
