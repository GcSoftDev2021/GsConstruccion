using GsConstruccion.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static GsConstruccion.Models.Modulo;

namespace GsConstruccion.Data.DataEntities
{
    public class DataModulo
    {
        readonly GsConstruccionEntities _conection = new GsConstruccionEntities();
        private readonly DataRol dataRol = new DataRol();
        public List<ListaModulo> ListaModulo()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaModulo>("SP_ListaModulo").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<GridModulo> GridModulo()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridModulo>("SP_GridModulo").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string CrearModulo(string IdUser, string Modulo, string NombreModulo, string UrlPagina)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varNombreModulo = new SqlParameter("@NombreModulo", SqlDbType.VarChar) { Value = NombreModulo };
                var varUrlPagina = new SqlParameter("@UrlPagina", SqlDbType.VarChar) { Value = UrlPagina };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearModulo @IdUser, @Modulo, @NombreModulo, @UrlPagina, @Resultado OUTPUT", varIdUser, varModulo, varNombreModulo, varUrlPagina, varResultado);

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
                        resultado = "Error__No se puede insertar valores duplicados, el Modulo (" + NombreModulo + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public string GuardarCambiosModulo(string IdUser, string Modulo, int IdModulo, string NombreModulo, string UrlPagina, int Activo)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdModulo = new SqlParameter("@IdModulo", SqlDbType.Int) { Value = IdModulo };
                var varNombreModulo = new SqlParameter("@NombreModulo", SqlDbType.VarChar) { Value = NombreModulo };
                var varUrlPagina = new SqlParameter("@UrlPagina", SqlDbType.VarChar) { Value = UrlPagina };
                var varActivo = new SqlParameter("@Activo", SqlDbType.Int) { Value = Activo };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarCambiosModulo @IdUser, @Modulo, @IdModulo, @NombreModulo, @UrlPagina, @Activo, @Resultado OUTPUT", varIdUser, varModulo, varIdModulo, varNombreModulo, varUrlPagina, varActivo, varResultado);

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
                        resultado = "Error__No se puede insertar valores duplicados, el Modulo (" + NombreModulo + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public string EliminarModulo(string IdUser, string Modulo, int IdModulo)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdModulo = new SqlParameter("@IdModulo", SqlDbType.Int) { Value = IdModulo };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarModulo @IdUser, @Modulo, @IdModulo, @Resultado OUTPUT", varIdUser, varModulo, varIdModulo, varResultado);

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
