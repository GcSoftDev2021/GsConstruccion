using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GsConstruccion.Models
{
    public class Pais
    {
        public class GridPais
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public int Activo { get; set; }
            public string Estado { get; set; }
            public string NombreUsuario { get; set; }
            public string FechaCreacion { get; set; }
        }

        public class ListaPais
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }
    }
}
