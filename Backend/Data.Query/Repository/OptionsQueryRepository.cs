using Dapper;
using Resources.Data.Query.Repository;
using Service.Models.Options;
using Service.Query.OptionsQuery;
using System.Data;

namespace Data.Query.Repository
{
    public class OptionsQueryRepository : BaseQueryRepository, IOptionsQueryRepository
    {
        public OptionsQueryRepository(string connectionString) : base(connectionString)
        {
        }

        public DiasnosticModel GetDiasnosticById(int id)
        {
            const string quote = "\"";

            var sql = @"SELECT 
                    " + quote + "nOptionsDiasnosticId" + quote + @" AS " + quote + "Id" + quote + @",
                    " + quote + "nOptionsId" + quote + @" AS " + quote + "OptionId" + quote + @",
                    " + quote + "sTitle" + quote + @" AS " + quote + "Title" + quote + @",
                    " + quote + "sDescription" + quote + @" AS " + quote + "Description" + quote + @",
                    " + quote + "sCode" + quote + @" AS " + quote + "Code" + quote + @",
                    " + quote + "fPicture" + quote + @" AS " + quote + "PictureByte" + quote + @",
                    " + quote + "bHasPicture" + quote + @" AS " + quote + "HasPicture" + quote + @",
                    " + quote + "bIsActive" + quote + @" AS " + quote + "IsActive" + quote + @"
                FROM " + quote + "OptionsDiasnostic" + quote + @"
                WHERE " + quote + "nOptionsDiasnosticId" + quote + @" = @Id";

            var value = ExecutionContext(connection =>
            {
                var result = connection.QueryFirstOrDefault<DiasnosticModel>(sql, new { Id = id }, commandType: CommandType.Text);
                return result;
            });

            return value;
        }
        public IEnumerable<DiasnosticModel> GetListDiasnosticById(int id)
        {
            const string quote = "\"";

            var sql = @"SELECT 
                    " + quote + "nOptionsDiasnosticId" + quote + @" AS " + quote + "Id" + quote + @",
                    " + quote + "nOptionsId" + quote + @" AS " + quote + "OptionId" + quote + @",
                    " + quote + "sTitle" + quote + @" AS " + quote + "Title" + quote + @",
                    " + quote + "sDescription" + quote + @" AS " + quote + "Description" + quote + @",
                    " + quote + "sCode" + quote + @" AS " + quote + "Code" + quote + @",
                    " + quote + "fPicture" + quote + @" AS " + quote + "PictureByte" + quote + @",
                    " + quote + "bHasPicture" + quote + @" AS " + quote + "HasPicture" + quote + @",
                    " + quote + "bIsActive" + quote + @" AS " + quote + "IsActive" + quote + @"
                FROM " + quote + "OptionsDiasnostic" + quote + @"
                WHERE " + quote + "nOptionsId" + quote + @" = @Id
                ORDER BY " + quote + "nOptionsDiasnosticId" + quote + " ASC";

            var values = ExecutionContext(connection =>
            {
                var returnValue = connection.Query<DiasnosticModel>(sql, new { Id = id }, commandType: CommandType.Text).ToList();
                return returnValue;
            });

            return values;
        }

        public IEnumerable<OptionsModel> GetListOptions(int limit, int page)
        {
            return null;
        }

        public IEnumerable<OptionsModel> GetListOptionsByShopping()
        {
            const string quote = "\"";
            var sql = @"SELECT  " + quote + "O" + quote + "." + quote + "nOptionsId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "O" + quote + "." + quote + "sTitle" + quote + " " + quote + "Title" + quote +
                             ", " + quote + "O" + quote + "." + quote + "sDescription" + quote + " " + quote + "Description" + quote +
                             ", " + quote + "O" + quote + "." + quote + "sCode" + quote + " " + quote + "Code" + quote +
                             ", " + quote + "O" + quote + "." + quote + "fPicture" + quote + " " + quote + "PictureByte" + quote +
                             ", " + quote + "O" + quote + "." + quote + "bHasPicture" + quote + " " + quote + "HasPicture" + quote +             
                             ", " + quote + "O" + quote + "." + quote + "bIsActive" + quote + " " + quote + "IsActive" + quote +             
                         " FROM " + quote + "Options" + quote + " " + quote + "O" + quote +
                      "ORDER BY " + quote + "O" + quote + "." + quote + "nOptionsId" + quote + "  ASC";

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<OptionsModel>(sql,  commandType: CommandType.Text).ToList();
                return returnVale;
            });
            return values;
        }

        public IEnumerable<TratamentModel> GetListTratamentById(int id)
        {
            const string quote = "\"";

            var sql = @"SELECT 
                    " + quote + "nOptionsTratamentId" + quote + @" AS " + quote + "Id" + quote + @",
                    " + quote + "nOptionsId" + quote + @" AS " + quote + "OptionId" + quote + @",
                    " + quote + "sTitle" + quote + @" AS " + quote + "Title" + quote + @",
                    " + quote + "sDescription" + quote + @" AS " + quote + "Description" + quote + @",
                    " + quote + "sCode" + quote + @" AS " + quote + "Code" + quote + @",
                    " + quote + "fPicture" + quote + @" AS " + quote + "PictureByte" + quote + @",
                    " + quote + "bHasPicture" + quote + @" AS " + quote + "HasPicture" + quote + @",
                    " + quote + "bIsActive" + quote + @" AS " + quote + "IsActive" + quote + @"
                FROM " + quote + "OptionsTratament" + quote + @"
                WHERE " + quote + "nOptionsId" + quote + @" = @Id
                ORDER BY " + quote + "nOptionsTratamentId" + quote + " ASC";

            var values = ExecutionContext(connection =>
            {
                var returnValue = connection.Query<TratamentModel>(sql, new { Id = id }, commandType: CommandType.Text).ToList();
                return returnValue;
            });

            return values;
        }

        public OptionsModel GetOptionsById(int id)
        {
            const string quote = "\"";
            var sql = @"SELECT " +
                            quote + "nOptionsId" + quote + " AS " + quote + "Id" + quote + ", " +
                            quote + "sTitle" + quote + " AS " + quote + "Title" + quote + ", " +
                            quote + "sDescription" + quote + " AS " + quote + "Description" + quote + ", " +
                            quote + "sCode" + quote + " AS " + quote + "Code" + quote + ", " +
                            quote + "fPicture" + quote + " AS " + quote + "PictureByte" + quote + ", " +
                            quote + "bHasPicture" + quote + " AS " + quote + "HasPicture" + quote + ", " +
                            quote + "bHasPicture" + quote + " AS " + quote + "HasPicture" + quote + ", " +
                            quote + "bIsActive" + quote + " AS " + quote + "IsActive" + quote +
                       " FROM " + quote + "Options" + quote +
                       " WHERE " + quote + "nOptionsId" + quote + " = @Id";

            var result = ExecutionContext(connection =>
            {
                var item = connection.QueryFirstOrDefault<OptionsModel>(sql, new { Id = id }, commandType: CommandType.Text);
                return item;
            });

            return result;
        }

        public OptionsModel GetOptionsImageById(int id)
        {
            return null;
        }
    }
}