using Service.Models.Options;

namespace Service.Query.OptionsQuery
{
    public interface IOptionsQueryRepository
    {
        public OptionsModel GetOptionsById(int id);
        public IEnumerable<OptionsModel> GetListOptions(int limit, int page);
        public IEnumerable<OptionsModel> GetListOptionsByShopping();
        public IEnumerable<DiasnosticModel> GetListDiasnosticById(int id);
        public IEnumerable<TratamentModel> GetListTratamentById(int id);
        public DiasnosticModel GetDiasnosticById(int id);
        public TratamentModel GetTratamentById(int id);
        public byte[] GetPhotoTratamentById(int id);
        public byte[] GetPhotoDiasnosticById(int id);
        public byte[] GetPhotoOptionsById(int id);
    }
}
