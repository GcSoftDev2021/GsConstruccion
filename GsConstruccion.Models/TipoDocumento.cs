using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GsConstruccion.Models
{
    public class TipoDocumento
    {
        public class GridTipoDocumento
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public string Descripcion { get; set; }
            public int Activo { get; set; }
            public string Estado { get; set; }
            public string NombreUsuario { get; set; }
            public string FechaCreacion { get; set; }
        }

        public class ListaTipoDocumento
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }
    }
}
