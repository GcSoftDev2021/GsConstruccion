using GsConstruccion.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static GsConstruccion.Models.Rol;

namespace GsConstruccion.Data.DataEntities
{
    public class DataRol
    {
        readonly GsConstruccionEntities _conection = new GsConstruccionEntities();

        public string BuscarRolUsuario(string IdUser)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_BuscarRolUsuario @IdUser, @Resultado OUTPUT", varIdUser, varResultado);

                resultado = Convert.ToString(varResultado.Value);
            }
            catch (Exception ex)
            {
                resultado = "Error__" + ex.Message;
            }
            return resultado;
        }

        public List<ListaRol> ListaRol()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaRol>("SP_ListaRol").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<GridRol> GridRol()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridRol>("SP_GridRol").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string CrearRol(string IdUser, string Modulo, string NombreRol)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varNombreRol = new SqlParameter("@NombreRol", SqlDbType.VarChar) { Value = NombreRol };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearRol @IdUser, @Modulo, @NombreRol, @Resultado OUTPUT", varIdUser, varModulo, varNombreRol, varResultado);

                resultado = Convert.ToString(varResultado.Value);
            }
            catch (Exception ex)
            {
                var Rol = BuscarRolUsuario(IdUser);
                if (Rol == "Administrador")
                {
                    resultado = "Error__" + ex.Message;
                }
                else
                {
                    if (ex.Message.Contains("No se puede insertar"))
                    {
                        resultado = "Error__No se puede insertar valores duplicados, el Rol (" + NombreRol + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public string GuardarCambiosRol(string IdUser, string Modulo, int IdRol, string NombreRol, int Activo)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdRol = new SqlParameter("@IdRol", SqlDbType.Int) { Value = IdRol };
                var varNombreRol = new SqlParameter("@NombreRol", SqlDbType.VarChar) { Value = NombreRol };
                var varActivo = new SqlParameter("@Activo", SqlDbType.Int) { Value = Activo };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarCambiosRol @IdUser, @Modulo, @IdRol, @NombreRol, @Activo, @Resultado OUTPUT", varIdUser, varModulo, varIdRol, varNombreRol, varActivo, varResultado);

                resultado = Convert.ToString(varResultado.Value);
            }
            catch (Exception ex)
            {
                var Rol = BuscarRolUsuario(IdUser);
                if (Rol == "Administrador")
                {
                    resultado = "Error__" + ex.Message;
                }
                else
                {
                    if (ex.Message.Contains("No se puede insertar"))
                    {
                        resultado = "Error__No se puede insertar valores duplicados, el Rol (" + NombreRol + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public string EliminarRol(string IdUser, string Modulo, int IdRol)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdRol = new SqlParameter("@IdRol", SqlDbType.Int) { Value = IdRol };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarRol @IdUser, @Modulo, @IdRol, @Resultado OUTPUT", varIdUser, varModulo, varIdRol, varResultado);

                resultado = Convert.ToString(varResultado.Value);
            }
            catch (Exception ex)
            {
                var Rol = BuscarRolUsuario(IdUser);
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
