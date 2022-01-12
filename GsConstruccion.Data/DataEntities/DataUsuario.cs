using GsConstruccion.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static GsConstruccion.Models.Usuario;

namespace GsConstruccion.Data.DataEntities
{
    public class DataUsuario
    {
        readonly GsConstruccionEntities _conection = new GsConstruccionEntities();
        private readonly DataRol dataRol = new DataRol();
        public List<DatosUsuario> DatosUsuario(string IdUser)
        {
            try
            {
                return _conection.Database.SqlQuery<DatosUsuario>("SP_DatosUsuario @IdUser",
                    new SqlParameter("@IdUser", IdUser)).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<GridHistorialIngresoUsuario> GridHistorialIngresoUsuario(string IdUser)
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridHistorialIngresoUsuario>("SP_GridHistorialIngresoUsuario @IdUser",
                    new SqlParameter("@IdUser", IdUser)).ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string CambiarPaswwordUsuario(string IdUser, string Modulo, string Password, string NuevoPassword)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varPassword = new SqlParameter("@Password", SqlDbType.VarChar) { Value = Password };
                var varNuevoPassword = new SqlParameter("@NuevoPassword", SqlDbType.VarChar) { Value = NuevoPassword };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CambiarPaswwordUsuario @IdUser, @Modulo, @Password, @NuevoPassword, @Resultado OUTPUT", varIdUser, varModulo, varPassword, varNuevoPassword, varResultado);

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

        public List<ListaUsuario> ListaUsuario()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaUsuario>("SP_ListaUsuario").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
