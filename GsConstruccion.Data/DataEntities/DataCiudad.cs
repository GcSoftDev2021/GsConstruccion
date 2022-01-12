using GsConstruccion.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static GsConstruccion.Models.Ciudad;

namespace GsConstruccion.Data.DataEntities
{
    public class DataCiudad
    {
        readonly GsConstruccionEntities _conection = new GsConstruccionEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearCiudad(string IdUser, string Modulo, int IdPais, string NombreCiudad)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdPais = new SqlParameter("@Idpais", SqlDbType.Int) { Value = IdPais };
                var varNombreCiudad = new SqlParameter("@NombreCiudad", SqlDbType.VarChar) { Value = NombreCiudad };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearCiudad @IdUser, @Modulo, @IdPais, @NombreCiudad, @Resultado OUTPUT", varIdUser, varModulo, varIdPais, varNombreCiudad, varResultado);

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
                        resultado = "Error__No se puede insertar valores duplicados, la Ciudad (" + NombreCiudad + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public List<GridCiudad> GridCiudad()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridCiudad>("SP_GridCiudad").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GuardarCambiosCiudad(string IdUser, string Modulo, int IdPais, int IdCiudad, string NombreCiudad, int Activo)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdPais = new SqlParameter("@IdPais", SqlDbType.Int) { Value = IdPais };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varNombreCiudad = new SqlParameter("@NombreCiudad", SqlDbType.VarChar) { Value = NombreCiudad };
                var varActivo = new SqlParameter("@Activo", SqlDbType.Int) { Value = Activo };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarCambiosCiudad @IdUser, @Modulo, @IdPais, @IdCiudad, @NombreCiudad, @Activo, @Resultado OUTPUT", varIdUser, varModulo, varIdPais, varIdCiudad, varNombreCiudad, varActivo, varResultado);

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
                        resultado = "Error__No se puede insertar valores duplicados, la Ciudad (" + NombreCiudad + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public List<ListaCiudad> ListaCiudad()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaCiudad>("SP_ListaCiudad").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string EliminarCiudad(string IdUser, string Modulo, int IdCiudad)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarCiudad @IdUser, @Modulo, @IdCiudad, @Resultado OUTPUT", varIdUser, varModulo, varIdCiudad, varResultado);

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
