using GsConstruccion.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static GsConstruccion.Models.TipoDocumento;

namespace GsConstruccion.Data.DataEntities
{
    public class DataTipoDocumento
    {
        readonly GsConstruccionEntities _conection = new GsConstruccionEntities();
        private readonly DataRol dataRol = new DataRol();
        public string CrearTipoDocumento(string IdUser, string Modulo, string NombreTipoDocumento, string Descripcion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varNombreTipoDocumento = new SqlParameter("@NombreTipoDocumento", SqlDbType.VarChar) { Value = NombreTipoDocumento };
                var varDescripcion = new SqlParameter("@Descripcion", SqlDbType.VarChar) { Value = Descripcion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearTipoDocumento @IdUser, @Modulo, @NombreTipoDocumento, @Descripcion, @Resultado OUTPUT", varIdUser, varModulo, varNombreTipoDocumento, varDescripcion, varResultado);

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
                        resultado = "Error__No se puede insertar valores duplicados, la Tipo Documento (" + NombreTipoDocumento + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public List<GridTipoDocumento> GridTipoDocumento()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridTipoDocumento>("SP_GridTipoDocumento").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GuardarCambiosTipoDocumento(int IdTipoDocumento, string IdUser, string Modulo, string NombreTipoDocumento, string Descripcion, int Activo)
        {
            string resultado = String.Empty;
            try
            {
                var varIdTipoDocumento = new SqlParameter("@IdTipoDocumento", SqlDbType.Int) { Value = IdTipoDocumento };
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varNombreTipoDocumento = new SqlParameter("@NombreTipoDocumento", SqlDbType.VarChar) { Value = NombreTipoDocumento };
                var varDescripcion = new SqlParameter("@Descripcion", SqlDbType.VarChar) { Value = Descripcion };
                var varActivo = new SqlParameter("@Activo", SqlDbType.Int) { Value = Activo };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarCambiosTipoDocumento @IdTipoDocumento, @IdUser, @Modulo, @NombreTipoDocumento, @Descripcion, @Activo, @Resultado OUTPUT", varIdTipoDocumento, varIdUser, varModulo, varNombreTipoDocumento, varDescripcion, varActivo, varResultado);

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
                        resultado = "Error__No se puede insertar valores duplicados, la Tipo Documento (" + NombreTipoDocumento + ") ya Existe";
                    }
                    else
                    {
                        resultado = "Error__En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public List<ListaTipoDocumento> ListaTipoDocumento()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaTipoDocumento>("SP_ListaTipoDocumento").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public string EliminarTipoDocumento(string IdUser, string Modulo, int IdTipoDocumento)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdTipoDocumento = new SqlParameter("@IdTipoDocumento", SqlDbType.Int) { Value = IdTipoDocumento };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarTipoDocumento @IdUser, @Modulo, @IdTipoDocumento, @Resultado OUTPUT", varIdUser, varModulo, varIdTipoDocumento, varResultado);

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
