using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GsConstruccion.Models
{
    public class Ciudad
    {
        public class GridCiudad
        {
            public int Id { get; set; }
            public int IdPais { get; set; }
            public string NombrePais { get; set; }
            public string Nombre { get; set; }
            public int Activo { get; set; }
            public string Estado { get; set; }
            public string NombreUsuario { get; set; }
            public string FechaCreacion { get; set; }
        }

        public class ListaCiudad
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }
    }
}
