using GsConstruccion.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static GsConstruccion.Models.Empresa;

namespace GsConstruccion.Data.DataEntities
{
    public class DataEmpresa
    {
        readonly GsConstruccionEntities _conection = new GsConstruccionEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearEmpresa(string IdUser, string Modulo, string NombreEmpresa, int IdTipoDocumento, string IdentificacionEmpresa, string EmailEmpresa, string TelefonoEmpresa, string ContactoEmpresa, string DireccionEmpresa, int IdCiudad)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varNombreEmpresa = new SqlParameter("@NombreEmpresa", SqlDbType.VarChar) { Value = NombreEmpresa };
                var varIdTipoDocumento = new SqlParameter("@IdTipoDocumento", SqlDbType.Int) { Value = IdTipoDocumento };
                var varIdentificacionEmpresa = new SqlParameter("@IdentificacionEmpresa", SqlDbType.VarChar) { Value = IdentificacionEmpresa };
                var varEmailEmpresa = new SqlParameter("@EmailEmpresa", SqlDbType.VarChar) { Value = EmailEmpresa };
                var varTelefonoEmpresa = new SqlParameter("@TelefonoEmpresa", SqlDbType.VarChar) { Value = TelefonoEmpresa };
                var varContactoEmpresa = new SqlParameter("@ContactoEmpresa", SqlDbType.VarChar) { Value = ContactoEmpresa };
                var varDireccionEmpresa = new SqlParameter("@DireccionEmpresa", SqlDbType.VarChar) { Value = DireccionEmpresa };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearEmpresa @IdUser, @Modulo, @NombreEmpresa, @IdTipoDocumento, @IdentificacionEmpresa, @EmailEmpresa, @TelefonoEmpresa, @ContactoEmpresa, @DireccionEmpresa, @IdCiudad, @Resultado OUTPUT", varIdUser, varModulo, varNombreEmpresa, varIdTipoDocumento, varIdentificacionEmpresa, varEmailEmpresa, varTelefonoEmpresa, varContactoEmpresa, varDireccionEmpresa, varIdCiudad, varResultado);

                resultado = Convert.ToString(varResultado.Value);
            }
            catch (Exception ex)
            {
                var Rol = dataRol.BuscarRolUsuario(IdUser);
                if (Rol == "Administrador")
                {
                    resultado = "Error__" + ex.Message;
                }
                else
                {
                    if (ex.Message.Contains("No se puede insertar"))
                    {
                        resultado = "Error__No se puede insertar valores duplicados, la Empresa (" + NombreEmpresa + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public List<GridEmpresa> GridEmpresa()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridEmpresa>("SP_GridEmpresa").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<CargarDatosDetalleEmpresa> CargarDatosDetalleEmpresa(int Id)
        {
            try
            {
                var response = _conection.Database.SqlQuery<CargarDatosDetalleEmpresa>("SP_CargarDatosDetalleEmpresa @Id", new SqlParameter("@Id", Id)).ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
