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
            public string Identificacion { get; set; }
            public string Email { get; set; }
            public string Telefono { get; set; }
            public string Contacto { get; set; }
            public string Direccion { get; set; }
            public string Estado { get; set; }
        }

        public class CargarDatosDetalleEmpresa
        {               
            public string NombreEmpresa { get; set; }
            public string Identificacion { get; set; }
            public string Email { get; set; }
            public string Telefono { get; set; }
            public string Direccion { get; set; }
            public string NombreContacto { get; set; }
            public string Estado { get; set; }
        }

        public class CargarDatosEditarEmpresa
        {
            public string NombreEmpresa { get; set; }             
            public int IdTipoDocumento { get; set; }
            public string NumeroIdentificacion { get; set; }
            public string Email { get; set; }
            public string Telefono { get; set; }
            public string Direccion { get; set; }
            public int IdCiudad { get; set; }
            public string NombreContacto { get; set; }
            public string Estado { get; set; }
            public int Activo { get; set; }
        }
    }
}
