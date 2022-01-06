using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GsConstruccion.Models
{
    public class Empresa
    {
        public class GridEmpresa
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public int IdTipoDocumento { get; set; }
            public string TipoDocumento { get; set; }
            public string IdentificacionEmpresa { get; set; }
            public string Email { get; set; }
            public string Telefono { get; set; }
            public string Contacto { get; set; }
            public string DireccionEmpresa { get; set; }
            public int IdCiudad { get; set; }
            public string NombreCiudad { get; set; }
            public int Activo { get; set; }
            public string Estado { get; set; }
            public string NombreUsuario { get; set; }
            public string FechaCreacion { get; set; }
        }
    }
}
