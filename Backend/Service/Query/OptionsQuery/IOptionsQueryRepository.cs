using Service.Models.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Query.OptionsQuery
{
    public interface IOptionsQueryRepository
    {
        public OptionsModel GetOptionsById(int id);
        public OptionsModel GetOptionsImageById(int id);
        public IEnumerable<OptionsModel> GetListOptions(int limit, int page);
        public IEnumerable<OptionsModel> GetListOptionsByShopping();
        public IEnumerable<DiasnosticModel> GetListDiasnosticById(int id);
        public IEnumerable<TratamentModel> GetListTratamentById(int id);
        public DiasnosticModel GetDiasnosticById(int id);
    }
}
