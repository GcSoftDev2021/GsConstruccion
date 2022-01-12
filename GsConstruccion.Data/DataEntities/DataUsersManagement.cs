using GsConstruccion.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static GsConstruccion.Models.UsersManagement;

namespace GsConstruccion.Data.DataEntities
{
    public class DataUsersManagement
    {
        readonly GsConstruccionEntities _conection = new GsConstruccionEntities();
        private readonly DataRol dataRol = new DataRol();
        public List<GridPermisoUsuario> GridPermisoUsuario()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridPermisoUsuario>("SP_GridPermisoUsuario").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string CrearPermisoUsuario(string IdUser,
            string Modulo,
            int IdUsuarioPermiso,
            int IdModuloPermiso,
            int Leer,
            int Crear,
            int Modificar,
            int Eliminar)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdUsuarioPermiso = new SqlParameter("@IdUsuarioPermiso", SqlDbType.Int) { Value = IdUsuarioPermiso };
                var varIdModuloPermiso = new SqlParameter("@IdModuloPermiso", SqlDbType.Int) { Value = IdModuloPermiso };
                var varLeer = new SqlParameter("@Leer", SqlDbType.Int) { Value = Leer };
                var varCrear = new SqlParameter("@CrearNuevo", SqlDbType.Int) { Value = Crear };
                var varModificar = new SqlParameter("@Modificar", SqlDbType.Int) { Value = Modificar };
                var varEliminar = new SqlParameter("@Eliminar", SqlDbType.Int) { Value = Eliminar };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearPermisoUsuario @IdUser, @Modulo, @IdUsuarioPermiso, @IdModuloPermiso, @Leer, @CrearNuevo, @Modificar, @Eliminar, @Resultado OUTPUT", varIdUser, varModulo, varIdUsuarioPermiso, varIdModuloPermiso, varLeer, varCrear, varModificar, varEliminar, varResultado);

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

        public string GuardarCambiosPermisoUsuario(
           string IdUser,
           string Modulo,
           int IdPermisoUsuario,
           int Leer,
           int Crear,
           int Modificar,
           int Eliminar)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdPermisoUsuario = new SqlParameter("@IdPermisoUsuario", SqlDbType.Int) { Value = IdPermisoUsuario };
                var varLeer = new SqlParameter("@Leer", SqlDbType.Int) { Value = Leer };
                var varCrear = new SqlParameter("@CrearNuevo", SqlDbType.Int) { Value = Crear };
                var varModificar = new SqlParameter("@Modificar", SqlDbType.Int) { Value = Modificar };
                var varEliminar = new SqlParameter("@Eliminar", SqlDbType.Int) { Value = Eliminar };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarCambiosPermisoUsuario @IdUser, @Modulo, @IdPermisoUsuario, @Leer, @CrearNuevo, @Modificar, @Eliminar, @Resultado OUTPUT", varIdUser, varModulo, varIdPermisoUsuario, varLeer, varCrear, varModificar, varEliminar, varResultado);

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

        public string EliminarPermisoUsuario(string IdUser, string Modulo, int IdPermisoUsuario)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdPermisoUsuario = new SqlParameter("@IdPermisoUsuario", SqlDbType.Int) { Value = IdPermisoUsuario };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarPermisoUsuario @IdUser, @Modulo, @IdPermisoUsuario, @Resultado OUTPUT", varIdUser, varModulo, varIdPermisoUsuario, varResultado);

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

        #region Metodos Usuario

        public List<GridUsuario> GridUsuario()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridUsuario>("SP_GridUsuario").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string CrearUsuario(
            string IdUser,
            string Modulo,
            string Usuario,
            string PasswordUser,
            string EmailUser,
            string NombreUsuario,
            int IdRol,
            DateTime FechaVigenciaUser)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varUsuario = new SqlParameter("@Usuario", SqlDbType.VarChar) { Value = Usuario };
                var varPasswordUser = new SqlParameter("@PasswordUser", SqlDbType.VarChar) { Value = PasswordUser };
                var varEmailUser = new SqlParameter("@EmailUser", SqlDbType.VarChar) { Value = EmailUser };
                var varNombreUsuario = new SqlParameter("@NombreUsuario", SqlDbType.VarChar) { Value = NombreUsuario };
                var varIdRol = new SqlParameter("@IdRol", SqlDbType.Int) { Value = IdRol };
                var varFechaVigenciaUser = new SqlParameter("@FechaVigenciaUser", SqlDbType.DateTime) { Value = FechaVigenciaUser };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearUsuario @IdUser, @Modulo, @Usuario, @PasswordUser, @EmailUser, @NombreUsuario, @IdRol, @FechaVigenciaUser, @Resultado OUTPUT", varIdUser, varModulo, varUsuario, varPasswordUser, varEmailUser, varNombreUsuario, varIdRol, varFechaVigenciaUser, varResultado);

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

        public string GuardarCambiosUsuario(
          string IdUser,
               string Modulo,
               int IdUsuario,
               string Usuario,
               string PasswordUser,
               string EmailUser,
               string NombreUsuario,
               int IdRol,
               DateTime FechaVigenciaUser,
               int Activo)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdUsuario = new SqlParameter("@IdUsuario", SqlDbType.Int) { Value = IdUsuario };
                var varUsuario = new SqlParameter("@Usuario", SqlDbType.VarChar) { Value = Usuario };
                var varPasswordUser = new SqlParameter("@PasswordUser", SqlDbType.VarChar) { Value = PasswordUser };
                var varEmailUser = new SqlParameter("@EmailUser", SqlDbType.VarChar) { Value = EmailUser };
                var varNombreUsuario = new SqlParameter("@NombreUsuario", SqlDbType.VarChar) { Value = NombreUsuario };
                var varIdRol = new SqlParameter("@IdRol", SqlDbType.Int) { Value = IdRol };
                var varFechaVigenciaUser = new SqlParameter("@FechaVigenciaUser", SqlDbType.DateTime) { Value = FechaVigenciaUser };
                var varActivo = new SqlParameter("@Activo", SqlDbType.Int) { Value = Activo };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarCambiosUsuario @IdUser, @Modulo, @IdUsuario, @Usuario, @PasswordUser, @EmailUser, @NombreUsuario, @IdRol, @FechaVigenciaUser, @Activo, @Resultado OUTPUT", varIdUser, varModulo, varIdUsuario, varUsuario, varPasswordUser, varEmailUser, varNombreUsuario, varIdRol, varFechaVigenciaUser, varActivo, varResultado);

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

        public string EliminarUsuario(string IdUser, string Modulo, int IdUsuario)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varModulo = new SqlParameter("@Modulo", SqlDbType.VarChar) { Value = Modulo };
                var varIdUsuario = new SqlParameter("@IdUsuario", SqlDbType.Int) { Value = IdUsuario };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarUsuario @IdUser, @Modulo, @IdUsuario, @Resultado OUTPUT", varIdUser, varModulo, varIdUsuario, varResultado);

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
        #endregion
    }
}
