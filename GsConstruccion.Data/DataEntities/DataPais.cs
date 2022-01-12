using GsConstruccion.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static GsConstruccion.Models.Pais;

namespace GsConstruccion.Data.DataEntities
{
    public class DataPais
    {
        readonly GsConstruccionEntities _conection = new GsConstruccionEntities();
        private readonly DataRol dataRol = new DataRol();
        public string CrearPais(string IdUser, string Modulo, string NombrePais)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varNombrePais = new SqlParameter("@NombrePais", SqlDbType.VarChar) { Value = NombrePais };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearPais @IdUser, @Modulo, @NombrePais, @Resultado OUTPUT", varIdUser, varModulo, varNombrePais, varResultado);

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
                        resultado = "Error__No se puede insertar valores duplicados, el País (" + NombrePais + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public List<GridPais> GridPais()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridPais>("SP_GridPais").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GuardarCambiosPais(int IdPais, string IdUser, string Modulo, string NombrePais, int Activo)
        {
            string resultado = String.Empty;
            try
            {
                var varIdPais = new SqlParameter("@IdPais", SqlDbType.Int) { Value = IdPais };
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varNombrePais = new SqlParameter("@NombrePais", SqlDbType.VarChar) { Value = NombrePais };
                var varActivo = new SqlParameter("@Activo", SqlDbType.Int) { Value = Activo };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarCambiosPais @IdPais, @IdUser, @Modulo, @NombrePais, @Activo, @Resultado OUTPUT", varIdPais, varIdUser, varModulo, varNombrePais, varActivo, varResultado);

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
                        resultado = "Error__No se puede insertar valores duplicados, el País (" + NombrePais + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public List<ListaPais> ListaPais()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaPais>("SP_ListaPais").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public string EliminarPais(string IdUser, string Modulo, int IdPais)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdPais = new SqlParameter("@IdPais", SqlDbType.Int) { Value = IdPais };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarPais @IdUser, @Modulo, @IdPais, @Resultado OUTPUT", varIdUser, varModulo, varIdPais, varResultado);

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
