using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GsConstruccion.Models
{
    public class Modulo
    {
        public class ListaModulo
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

        public class GridModulo
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public string RutaPagina { get; set; }
            public int Activo { get; set; }
            public string Estado { get; set; }
            public string NombreUsuario { get; set; }
            public string FechaCreacion { get; set; }
        }
    }
}
