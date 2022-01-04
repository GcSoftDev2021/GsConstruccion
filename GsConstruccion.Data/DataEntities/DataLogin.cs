using GsConstruccion.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GsConstruccion.Data.DataEntities
{
    public class DataLogin
    {
        readonly GsConstruccionEntities _conection = new GsConstruccionEntities();
        //private readonly DataRol dataRol = new DataRol();
        public string IniciarSesion(string Usuario, string Password)
        {
            string resultado = String.Empty;
            try
            {
                var varUsuario = new SqlParameter("@Usuario", SqlDbType.VarChar) { Value = Usuario };
                var varPassword = new SqlParameter("@Password", SqlDbType.VarChar) { Value = Password };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_IniciarSesion @Usuario, @Password, @Resultado OUTPUT", varUsuario, varPassword, varResultado);

                resultado = Convert.ToString(varResultado.Value);
            }
            catch (Exception ex)
            {
                resultado = "Error__" + ex.Message;
            }
            return resultado;
        }
    }
}
