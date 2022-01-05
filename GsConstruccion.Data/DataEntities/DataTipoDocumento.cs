using GsConstruccion.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static GsConstruccion.Models.TipoDocumento;

namespace GsConstruccion.Data.DataEntities
{
    public class DataTipoDocumento
    {
        readonly GsConstruccionEntities _conection = new GsConstruccionEntities();

        //private readonly DataRol dataRol = new DataRol();

        public List<ListaTipoDocumento> ListaTipoDocumento()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaTipoDocumento>("SP_ListaTipoDocumentoIdentificacion").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

    }
}
