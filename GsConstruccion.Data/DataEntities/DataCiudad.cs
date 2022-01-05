using GsConstruccion.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static GsConstruccion.Models.Ciudad;

namespace GsConstruccion.Data.DataEntities
{
    public class DataCiudad
    {
        readonly GsConstruccionEntities _conection = new GsConstruccionEntities();

        //private readonly DataRol dataRol = new DataRol();

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
    }
}
