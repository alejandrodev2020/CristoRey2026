using Dapper;
using Resources.Data.Query.Repository;
using Service.Models.Doctor;
using Service.Models.Patient;
using Service.Query.DoctorQuery;
using System.Data;

namespace Data.Query.Repository
{
    public class DoctorQueryRepository : BaseQueryRepository, IDoctorQueryRepository
    {
        public DoctorQueryRepository(string connectionString) : base(connectionString)
        {
        }

        public DoctorModel GetAuthUserByCiAndPhone(string ci, string phone)
        {
            const string quote = "\"";
            const string quoteString = "\'";
            var sql = @"SELECT  " + quote + "D" + quote + "." + quote + "nDoctorId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sFirstName" + quote + " " + quote + "FirstName" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sLastName" + quote + " " + quote + "LastName" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sPhone" + quote + " " + quote + "Phone" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sCi" + quote + " " + quote + "Ci" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sPhoto" + quote + " " + quote + "PhotoByte" + quote +
                             ", " + quote + "D" + quote + "." + quote + "bIsActive" + quote + " " + quote + "IsActive" + quote +
                         " FROM " + quote + "Doctor" + quote + " " + quote + "D" + quote +               
                         "WHERE " + quote + "D" + quote + "." + quote + "sCi" + quote + "=" + quoteString + ci + quoteString +
                            "AND" + quote + "D" + quote + "." + quote + "sPhone" + quote + "=" + quoteString + phone + quoteString;

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<DoctorModel>(sql).LastOrDefault();
                return returnVale;
            });
            return values;
        }

        public IEnumerable<DoctorModel> GetListProvider()
        {
            const string quote = "\"";
            var sql = @"SELECT  " + quote + "nDoctorId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "sFirstName" + quote + " " + quote + "FirstName" + quote +
                             ", " + quote + "sLastName" + quote + " " + quote + "LastName" + quote +
                             ", " + quote + "sPhone" + quote + " " + quote + "Phone" + quote +
                             ", " + quote + "sPhoto" + quote + " " + quote + "PhotoByte" + quote +
                             ", " + quote + "sCi" + quote + " " + quote + "Ci" + quote +
                             ", " + quote + "sNit" + quote + " " + quote + "Nit" + quote +
                             ", " + quote + "sCompany" + quote + " " + quote + "BusinessName" + quote +

                                                          ", " + quote + "sUbication" + quote + " " + quote + "Ubication" + quote +
                             ", " + quote + "nLatitude" + quote + " " + quote + "Latitude" + quote +
                             ", " + quote + "nLongitude" + quote + " " + quote + "Longitude" + quote +
                             ", " + quote + "sLink" + quote + " " + quote + "Link" + quote +


                             ", " + quote + "bIsEmergency" + quote + " " + quote + "IsEmergency" + quote +
                             ", " + quote + "bIsActive" + quote + " " + quote + "IsActive" + quote +
                         " FROM " + quote + "Doctor" + quote + " " + quote + "P" + quote +
                         "ORDER BY" + quote + "nDoctorId" + quote + "  ASC";

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<DoctorModel>(sql).ToList();
                return returnVale;
            });
            return values;
        }

        public DoctorModel GetProviderById(int id)
        {

            const string quote = "\"";
            var sql = @"SELECT  " + quote + "nDoctorId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "sFirstName" + quote + " " + quote + "FirstName" + quote +
                             ", " + quote + "sLastName" + quote + " " + quote + "LastName" + quote +
                             ", " + quote + "sPhone" + quote + " " + quote + "Phone" + quote +
                             ", " + quote + "sCi" + quote + " " + quote + "Ci" + quote +
                             ", " + quote + "sNit" + quote + " " + quote + "Nit" + quote +
                             ", " + quote + "sPhoto" + quote + " " + quote + "PhotoByte" + quote +
                             ", " + quote + "sCompany" + quote + " " + quote + "BusinessName" + quote +
                             
                             ", " + quote + "sUbication" + quote + " " + quote + "Ubication" + quote +
                             ", " + quote + "nLatitude" + quote + " " + quote + "Latitude" + quote +
                             ", " + quote + "nLongitude" + quote + " " + quote + "Longitude" + quote +
                             ", " + quote + "sLink" + quote + " " + quote + "Link" + quote +


                             ", " + quote + "bIsActive" + quote + " " + quote + "IsActive" + quote +
                         " FROM " + quote + "Doctor" + quote + " " + quote + "P" + quote +
                         "WHERE " + quote + "nDoctorId" + quote + "=" + id;

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<DoctorModel>(sql).SingleOrDefault();
                return returnVale;
            });
            return values;
        }

        public DoctorModel GetUserNameValidate(string ci)
        {
            const string quote = "\"";
            const string quoteString = "\'";
            var sql = @"SELECT  " + quote + "D" + quote + "." + quote + "nDoctorId" + quote + " " + quote + "Id" + quote +
                         " FROM " + quote + "Doctor" + quote + " " + quote + "D" + quote +
                         "WHERE " + quote + "D" + quote + "." + quote + "sCi" + quote + "=" + quoteString + ci + quoteString;

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<DoctorModel>(sql).LastOrDefault();
                return returnVale;
            });
            return values;
        }

        public IEnumerable<ClinicalHistoryModel> GetListClinicalHistoryByDoctorId(int id)
        {
            const string quote = "\"";
            var sql = @"SELECT  " + quote + "CH" + quote + "." + quote + "nClinicalHistoryId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "CH" + quote + "." + quote + "nPatientId" + quote + " " + quote + "PatientId" + quote +
                             ", " + quote + "CH" + quote + "." + quote + "dDateQuery" + quote + " " + quote + "DateQuery" + quote +
                             ", " + quote + "CH" + quote + "." + quote + "sMotive" + quote + " " + quote + "Motive" + quote +
                             ", " + quote + "CH" + quote + "." + quote + "sDiagnostic" + quote + " " + quote + "Diagnostic" + quote +
                             ", " + quote + "CH" + quote + "." + quote + "sObservations" + quote + " " + quote + "Observations" + quote +
                             ", " + quote + "CH" + quote + "." + quote + "tTotalCost" + quote + " " + quote + "TotalCost" + quote +
                             ", " + quote + "CH" + quote + "." + quote + "bWasPaid" + quote + " " + quote + "WasPaid" + quote +
                             ", " + quote + "CH" + quote + "." + quote + "nStatusId" + quote + " " + quote + "StatusId" + quote +
                             ", " + quote + "CH" + quote + "." + quote + "bIsActive" + quote + " " + quote + "IsActive" + quote +

                             ", " + quote + "P" + quote + "." + quote + "nPatientId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "P" + quote + "." + quote + "sFirstName" + quote + " " + quote + "FirstName" + quote +
                             ", " + quote + "P" + quote + "." + quote + "sLastName" + quote + " " + quote + "LastName" + quote +
                             ", " + quote + "P" + quote + "." + quote + "sPhone" + quote + " " + quote + "Phone" + quote +
                             ", " + quote + "P" + quote + "." + quote + "sCi" + quote + " " + quote + "Ci" + quote +
                             ", " + quote + "P" + quote + "." + quote + "sNit" + quote + " " + quote + "Nit" + quote +
                             ", " + quote + "P" + quote + "." + quote + "sPhoto" + quote + " " + quote + "Photo" + quote +
                             ", " + quote + "P" + quote + "." + quote + "sUbication" + quote + " " + quote + "Ubication" + quote +
                             ", " + quote + "P" + quote + "." + quote + "nPatientZoneId" + quote + " " + quote + "PatientZoneId" + quote +
                             ", " + quote + "P" + quote + "." + quote + "bHasPhoto" + quote + " " + quote + "HasPhoto" + quote +
                             ", " + quote + "P" + quote + "." + quote + "sCompany" + quote + " " + quote + "Company" + quote +
                             ", " + quote + "P" + quote + "." + quote + "nLatitude" + quote + " " + quote + "Latitude" + quote +
                             ", " + quote + "P" + quote + "." + quote + "nLongitude" + quote + " " + quote + "Longitude" + quote +
                             ", " + quote + "P" + quote + "." + quote + "sReference" + quote + " " + quote + "Reference" + quote +
                             ", " + quote + "P" + quote + "." + quote + "sLink" + quote + " " + quote + "Link" + quote +
                             ", " + quote + "P" + quote + "." + quote + "sCodeVerified" + quote + " " + quote + "CodeVerified" + quote +
                             ", " + quote + "P" + quote + "." + quote + "bIsVerified" + quote + " " + quote + "IsVerified" + quote +
                             ", " + quote + "P" + quote + "." + quote + "nDepartamentId" + quote + " " + quote + "DepartamentId" + quote +
                             ", " + quote + "P" + quote + "." + quote + "nCityId" + quote + " " + quote + "CityId" + quote +
                             ", " + quote + "P" + quote + "." + quote + "nGenderId" + quote + " " + quote + "GenderId" + quote +
                             ", " + quote + "P" + quote + "." + quote + "nUsercode" + quote + " " + quote + "Usercode" + quote +
                             ", " + quote + "P" + quote + "." + quote + "dCreate" + quote + " " + quote + "Create" + quote +
                             ", " + quote + "P" + quote + "." + quote + "dCompDate" + quote + " " + quote + "CompDate" + quote +
                             ", " + quote + "P" + quote + "." + quote + "bIsActive" + quote + " " + quote + "IsActive" + quote +


                             ", " + quote + "D" + quote + "." + quote + "nDoctorId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sFirstName" + quote + " " + quote + "FirstName" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sLastName" + quote + " " + quote + "LastName" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sPhone" + quote + " " + quote + "Phone" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sCi" + quote + " " + quote + "Ci" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sNit" + quote + " " + quote + "Nit" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sCompany" + quote + " " + quote + "BusinessName" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sUbication" + quote + " " + quote + "Ubication" + quote +
                             ", " + quote + "D" + quote + "." + quote + "nLatitude" + quote + " " + quote + "Latitude" + quote +
                             ", " + quote + "D" + quote + "." + quote + "nLongitude" + quote + " " + quote + "Longitude" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sLink" + quote + " " + quote + "Link" + quote +


                     " FROM " + quote + "ClinicalHistory" + quote + " " + quote + "CH" + quote +
                "INNER JOIN " + quote + "Patient" + quote + " " + quote + "P" + quote +
                       " ON " + quote + "CH" + quote + "." + quote + "nPatientId" + quote + " = " + quote + "P" + quote + "." + quote + "nPatientId" + quote +

               "LEFT JOIN " + quote + "Doctor" + quote + " " + quote + "D" + quote +
                       " ON " + quote + "D" + quote + "." + quote + "nDoctorId" + quote + " = " + quote + "CH" + quote + "." + quote + "nDoctorId" + quote +


                    " WHERE " + quote + "CH" + quote + "." + quote + "nDoctorId" + quote + " = @DoctorId" +
                 " ORDER BY " + quote + "CH" + quote + "." + quote + "nClinicalHistoryId" + quote + " ASC";

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<ClinicalHistoryModel,
                                                  PatientModel,
                                                  DoctorModel,
                                                  ClinicalHistoryModel>(sql, (clinicalHistory, patient, doctor) =>
                                                  {
                                                      clinicalHistory.Patient = patient;
                                                      clinicalHistory.Doctor = doctor;
                                                      return clinicalHistory;
                                                  }, new { DoctorId = id }, commandType: CommandType.Text, splitOn: "Id").ToList();
                return returnVale;
            });
            return values;
        }
    }
}