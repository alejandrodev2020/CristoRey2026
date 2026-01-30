using Dapper;
using Resources.Data.Query.Repository;
using Service.Models.Classifier;
using Service.Models.Doctor;
using Service.Models.Patient;
using Service.Query.PatientQuery;
using System.Data;

namespace Data.Query.Repository
{
    public class PatientQueryRepository : BaseQueryRepository, IPatientQueryRepository
    {
        public PatientQueryRepository(string connectionString) : base(connectionString)
        {
        }

        public IEnumerable<PatientModel> GetListPatient(int? doctorId)
        {
            const string quote = "\"";
            var sql = @"SELECT  " + quote + "P" + quote + "." + quote + "nPatientId" + quote + " " + quote + "Id" + quote +
                         ", " + quote + "P" + quote + "." + quote + "sFirstName" + quote + " " + quote + "FirstName" + quote +
                         ", " + quote + "P" + quote + "." + quote + "sLastName" + quote + " " + quote + "LastName" + quote +
                         ", " + quote + "P" + quote + "." + quote + "sPhone" + quote + " " + quote + "Phone" + quote +
                         ", " + quote + "P" + quote + "." + quote + "sCi" + quote + " " + quote + "Ci" + quote +
                         ", " + quote + "P" + quote + "." + quote + "sNit" + quote + " " + quote + "Nit" + quote +
                         ", " + quote + "P" + quote + "." + quote + "sPhoto" + quote + " " + quote + "File" + quote +
                         ", " + quote + "P" + quote + "." + quote + "sUbication" + quote + " " + quote + "Ubication" + quote +
                         ", " + quote + "P" + quote + "." + quote + "sCompany" + quote + " " + quote + "Company" + quote +
                         ", " + quote + "P" + quote + "." + quote + "nPatientZoneId" + quote + " " + quote + "PatientZoneId" + quote +
                         ", " + quote + "P" + quote + "." + quote + "bHasPhoto" + quote + " " + quote + "HasPhoto" + quote +
                         ", " + quote + "P" + quote + "." + quote + "nLatitude" + quote + " " + quote + "Latitude" + quote +
                         ", " + quote + "P" + quote + "." + quote + "nLongitude" + quote + " " + quote + "Longitude" + quote +
                         ", " + quote + "P" + quote + "." + quote + "sReference" + quote + " " + quote + "Reference" + quote +
                         ", " + quote + "P" + quote + "." + quote + "sLink" + quote + " " + quote + "Link" + quote +
                         ", " + quote + "P" + quote + "." + quote + "sCodeVerified" + quote + " " + quote + "CodeVerified" + quote +
                         ", " + quote + "P" + quote + "." + quote + "bIsVerified" + quote + " " + quote + "IsVerified" + quote +
                         ", " + quote + "P" + quote + "." + quote + "nDepartamentId" + quote + " " + quote + "DepartamentId" + quote +
                         ", " + quote + "P" + quote + "." + quote + "nCityId" + quote + " " + quote + "CityId" + quote +
                         ", " + quote + "P" + quote + "." + quote + "nGenderId" + quote + " " + quote + "GenderId" + quote +
                         ", " + quote + "P" + quote + "." + quote + "nDoctorId" + quote + " " + quote + "DoctorId" + quote +
                         ", " + quote + "P" + quote + "." + quote + "bIsActive" + quote + " " + quote + "IsActive" + quote +
                         ", " + quote + "P" + quote + "." + quote + "nUsercode" + quote + " " + quote + "Usercode" + quote +
                         ", " + quote + "P" + quote + "." + quote + "dCreate" + quote + " " + quote + "Create" + quote +
                         ", " + quote + "P" + quote + "." + quote + "dCompDate" + quote + " " + quote + "CompDate" + quote +
                         ", " + quote + "Z" + quote + "." + quote + "nClientZoneId" + quote + " " + quote + "Id" + quote +
                         ", " + quote + "Z" + quote + "." + quote + "sDescription" + quote + " " + quote + "Name" + quote +
                         ", " + quote + "Z" + quote + "." + quote + "sDescription" + quote + " " + quote + "Description" + quote +
                         ", " + quote + "Z" + quote + "." + quote + "bStatus" + quote + " " + quote + "IsActive" + quote +
                     " FROM " + quote + "Patient" + quote + " " + quote + "P" + quote +
                " LEFT JOIN " + quote + "ClientZone" + quote + " " + quote + "Z" + quote +
                     " ON " + quote + "Z" + quote + "." + quote + "nClientZoneId" + quote + " = " + quote + "P" + quote + "." + quote + "nPatientZoneId" + quote +
                " WHERE ( " +
                        "   " + quote + "P" + quote + "." + quote + "nDoctorId" + quote + " = @DoctorId " +
                        "   OR EXISTS ( " +
                        "       SELECT 1 FROM " + quote + "ClinicalHistory" + quote + " CH " +
                        "       WHERE CH." + quote + "nPatientId" + quote + " = " + quote + "P" + quote + "." + quote + "nPatientId" + quote +
                        "         AND CH." + quote + "nDoctorId" + quote + " = @DoctorId " +
                        "         AND CH." + quote + "nStatusId" + quote + " = 2 " +
                        "   ) " +
                        "   OR @DoctorId IS NULL " +
                        " ) ";


            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<PatientModel,
                                                  BaseClassifierModel,
                                                  PatientModel>(sql,(client, zone) =>
                                                  {
                                                      client.Zone = zone;
                                                      return client;
                                                  }, param: new { DoctorId = doctorId }, 
                                                  commandType: CommandType.Text, splitOn: "Id").ToList();
                return returnVale;
            });
            return values;
        }
        public byte[] GetPhoto(int id)
        {
            const string quote = "\"";
            var sql = @"SELECT  " + quote + "sPhoto" + quote + " " + quote + "File" + quote +
                         " FROM " + quote + "Client" + quote + " " + quote + "C" + quote +
                         "WHERE " + quote + "nClientId" + quote + "=" + id;

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<PatientModel>(sql).SingleOrDefault();
                return returnVale;
            });
            return values.File;
        }



        public PatientModel GetPatientById(int id)
        {
            const string quote = "\"";
            var sql = @"SELECT  " + quote + "P" + quote + "." + quote + "nPatientId" + quote + " " + quote + "Id" + quote +
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
                         ", " + quote + "PZ" + quote + "." + quote + "nClientZoneId" + quote + " " + quote + "Id" + quote +
                         ", " + quote + "PZ" + quote + "." + quote + "sDescription" + quote + " " + quote + "Name" + quote +
                         ", " + quote + "PZ" + quote + "." + quote + "sDescription" + quote + " " + quote + "Description" + quote +
                         ", " + quote + "PZ" + quote + "." + quote + "bStatus" + quote + " " + quote + "IsActive" + quote +
                     " FROM " + quote + "Patient" + quote + " " + quote + "P" + quote +
                     " INNER JOIN " + quote + "ClientZone" + quote + " " + quote + "PZ" + quote +
                     " ON " + quote + "PZ" + quote + "." + quote + "nClientZoneId" + quote + " = " + quote + "P" + quote + "." + quote + "nPatientZoneId" + quote +
                     " WHERE " + quote + "P" + quote + "." + quote + "nPatientId" + quote + " = " + id;

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<PatientModel,
                                                  BaseClassifierModel,
                                                  PatientModel>(sql, (client, zone) =>
                                                  {
                                                      client.Zone = zone;
                                                      return client;
                                                  }, commandType: CommandType.Text, splitOn: "Id").SingleOrDefault();
                return returnVale;
            });

            return values;
        }


        public PatientModel GetCiValidate(string ci)
        {
            const string quote = "\"";

            var sql = @"SELECT " + quote + "P" + quote + "." + quote + "nPatientId" + quote + " " + quote + "Id" + quote +
                      " FROM " + quote + "Patient" + quote + " " + quote + "P" + quote +
                      " WHERE " + quote + "P" + quote + "." + quote + "sCi" + quote + " = @Ci";

            var values = ExecutionContext(connection =>
            {
                var returnValue = connection.Query<PatientModel>(sql, new { Ci = ci }).LastOrDefault();
                return returnValue;
            });

            return values;
        }

        public PatientModel GetAuthPatientByCiAndPhone(string ci, string phone)
        {
            const string quote = "\"";
            var sql = @"SELECT  " + quote + "P" + quote + "." + quote + "nPatientId" + quote + " " + quote + "Id" + quote +
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
                         ", " + quote + "PZ" + quote + "." + quote + "nClientZoneId" + quote + " " + quote + "Id" + quote +
                         ", " + quote + "PZ" + quote + "." + quote + "sDescription" + quote + " " + quote + "Name" + quote +
                         ", " + quote + "PZ" + quote + "." + quote + "sDescription" + quote + " " + quote + "Description" + quote +
                         ", " + quote + "PZ" + quote + "." + quote + "bStatus" + quote + " " + quote + "IsActive" + quote +
                     " FROM " + quote + "Patient" + quote + " " + quote + "P" + quote +
                     " INNER JOIN " + quote + "ClientZone" + quote + " " + quote + "PZ" + quote +
                     " ON " + quote + "PZ" + quote + "." + quote + "nClientZoneId" + quote + " = " + quote + "P" + quote + "." + quote + "nPatientZoneId" + quote +
                     " WHERE " + quote + "P" + quote + "." + quote + "sCi" + quote + " = @Ci" +
                     " AND " + quote + "P" + quote + "." + quote + "sPhone" + quote + " = @Phone";

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<PatientModel,
                                                  BaseClassifierModel,
                                                  PatientModel>(sql, (client, zone) =>
                                                  {
                                                      client.Zone = zone;
                                                      return client;
                                                  }, new { Ci = ci, Phone = phone }, commandType: CommandType.Text, splitOn: "Id").SingleOrDefault();

                return returnVale;
            });

            return values;
        }

        public IEnumerable<ClinicalHistoryModel> GetListClinicalHistoryByPatientId(int id, int? doctorId)
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
                   " WHERE " + quote + "CH" + quote + "." + quote + "nPatientId" + quote + " = @PatientId" +
                        " AND (" +
                        "     " + quote + "CH" + quote + "." + quote + "nDoctorId" + quote + " = @DoctorId " +
                        "     OR @DoctorId IS NULL" +
                        " )" +
                 " ORDER BY " + quote + "CH" + quote + "." + quote + "nClinicalHistoryId" + quote + " DESC";

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<ClinicalHistoryModel,
                                                  PatientModel,
                                                  DoctorModel,
                                                  ClinicalHistoryModel >(sql, (clinicalHistory, patient, doctor) =>
                                                  {
                                                      clinicalHistory.Patient = patient;
                                                      clinicalHistory.Doctor = doctor;
                                                      return clinicalHistory;
                                                  }, new { PatientId = id, DoctorId = doctorId }, commandType: CommandType.Text, splitOn: "Id").ToList();
                return returnVale;
            });
            return values;
        }


    }
}