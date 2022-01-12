using GsConstruccion.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static GsConstruccion.Models.Sucursal;

namespace GsConstruccion.Data.DataEntities
{
    public class DataSucursal
    {
        readonly GsConstruccionEntities _conection = new GsConstruccionEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearSucursal(string IdUser, string Modulo, int IdEmpresa, string NombreSucursal, string EmailSucursal, string TelefonoSucursal, string ContactoSucursal, string DireccionSucursal, int IdCiudad)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdEmpresa = new SqlParameter("@IdEmpresa", SqlDbType.Int) { Value = IdEmpresa };
                var varNombreSucursal = new SqlParameter("@NombreSucursal", SqlDbType.VarChar) { Value = NombreSucursal };
                var varEmailSucursal = new SqlParameter("@EmailSucursal", SqlDbType.VarChar) { Value = EmailSucursal };
                var varTelefonoSucursal = new SqlParameter("@TelefonoSucursal", SqlDbType.VarChar) { Value = TelefonoSucursal };
                var varContactoSucursal = new SqlParameter("@ContactoSucursal", SqlDbType.VarChar) { Value = ContactoSucursal };
                var varDireccionSucursal = new SqlParameter("@DireccionSucursal", SqlDbType.VarChar) { Value = DireccionSucursal };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearSucursal @IdUser, @Modulo, @IdEmpresa, @NombreSucursal, @EmailSucursal, @TelefonoSucursal, @ContactoSucursal, @DireccionSucursal, @IdCiudad, @Resultado OUTPUT", varIdUser, varModulo, varIdEmpresa, varNombreSucursal, varEmailSucursal, varTelefonoSucursal, varContactoSucursal, varDireccionSucursal, varIdCiudad, varResultado);

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
                        resultado = "Error__No se puede insertar valores duplicados, la Sucursal (" + NombreSucursal + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public List<GridSucursal> GridSucursal()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridSucursal>("SP_GridSucursal").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GuardarCambiosSucursal(string IdUser, string Modulo, int IdEmpresa, int IdSucursal, string NombreSucursal, string EmailSucursal, string TelefonoSucursal, string ContactoSucursal, string DireccionSucursal, int IdCiudad, int Activo)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdEmpresa = new SqlParameter("@IdEmpresa", SqlDbType.Int) { Value = IdEmpresa };
                var varIdSucursal = new SqlParameter("@IdSucursal", SqlDbType.Int) { Value = IdSucursal };
                var varNombreSucursal = new SqlParameter("@NombreSucursal", SqlDbType.VarChar) { Value = NombreSucursal };
                var varEmailSucursal = new SqlParameter("@EmailSucursal", SqlDbType.VarChar) { Value = EmailSucursal };
                var varTelefonoSucursal = new SqlParameter("@TelefonoSucursal", SqlDbType.VarChar) { Value = TelefonoSucursal };
                var varContactoSucursal = new SqlParameter("@ContactoSucursal", SqlDbType.VarChar) { Value = ContactoSucursal };
                var varDireccionSucursal = new SqlParameter("@DireccionSucursal", SqlDbType.VarChar) { Value = DireccionSucursal };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varActivo = new SqlParameter("@Activo", SqlDbType.Int) { Value = Activo };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarCambiosSucursal @IdUser, @Modulo, @IdEmpresa, @IdSucursal, @NombreSucursal, @EmailSucursal, @TelefonoSucursal, @ContactoSucursal, @DireccionSucursal, @IdCiudad, @Activo, @Resultado OUTPUT", varIdUser, varModulo, varIdEmpresa, varIdSucursal, varNombreSucursal, varEmailSucursal, varTelefonoSucursal, varContactoSucursal, varDireccionSucursal, varIdCiudad, varActivo, varResultado);

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
                        resultado = "Error__No se puede insertar valores duplicados, la Sucursal (" + NombreSucursal + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public List<ListaSucursal> ListaSucursal()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaSucursal>("SP_ListaSucursal").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string EliminarSucursal(string IdUser, string Modulo, int IdSucursal)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdSucursal = new SqlParameter("@IdSucursal", SqlDbType.Int) { Value = IdSucursal };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarSucursal @IdUser, @Modulo, @IdSucursal, @Resultado OUTPUT", varIdUser, varModulo, varIdSucursal, varResultado);

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
                    resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                }
            }
            return resultado;
        }
    }
}
