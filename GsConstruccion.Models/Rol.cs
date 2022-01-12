using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GsConstruccion.Models
{
    public class Rol
    {
        public class ListaRol
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

        public class GridRol
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public int Activo { get; set; }
            public string Estado { get; set; }
        }
    }
}
