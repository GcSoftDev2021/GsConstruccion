using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GsConstruccion.Models
{
    public class Usuario
    {
        public class DatosUsuario
        {
            public string RutaImagenUsuario { get; set; }
            public string Usuario { get; set; }
            public string RolUsuario { get; set; }
            public string NombreUsuario { get; set; }
            public string EmailUsuario { get; set; }
            public string FechaCreacion { get; set; }
            public string Vigencia { get; set; }
        }

        public class GridHistorialIngresoUsuario
        {
            public string FechaIngreso { get; set; }
            public string Usuario { get; set; }
        }

        public class ListaUsuario
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }
    }
}
