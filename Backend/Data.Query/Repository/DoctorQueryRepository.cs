using Dapper;
using OpenAI;
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



        public IEnumerable<DoctorModel> GetListDoctor(bool? isEmergency, bool? onlyActive, bool? requiresPhoto, int limit, int page)
        {
            if (limit <= 0)
                limit = 10;

            if (page < 0)
                page = 0;

            var currentPage = page * limit;

            const string quote = "\"";
            var includePhoto = requiresPhoto != false;

            var sql = @"SELECT " + quote + "D" + quote + "." + quote + "nDoctorId" + quote + " AS " + quote + "Id" + quote +
                      ", " + quote + "D" + quote + "." + quote + "sFirstName" + quote + " AS " + quote + "FirstName" + quote +
                      ", " + quote + "D" + quote + "." + quote + "sLastName" + quote + " AS " + quote + "LastName" + quote +
                      ", " + quote + "D" + quote + "." + quote + "sPhone" + quote + " AS " + quote + "Phone" + quote +
                      (includePhoto
                          ? ", " + quote + "D" + quote + "." + quote + "sPhoto" + quote + " AS " + quote + "PhotoByte" + quote
                          : ", NULL AS " + quote + "PhotoByte" + quote) +
                      ", " + quote + "D" + quote + "." + quote + "sCi" + quote + " AS " + quote + "Ci" + quote +
                      ", " + quote + "D" + quote + "." + quote + "sNit" + quote + " AS " + quote + "Nit" + quote +
                      ", " + quote + "D" + quote + "." + quote + "sSpecialty" + quote + " AS " + quote + "Specialty" + quote +
                      ", " + quote + "D" + quote + "." + quote + "sUbication" + quote + " AS " + quote + "Ubication" + quote +
                      ", " + quote + "D" + quote + "." + quote + "nLatitude" + quote + " AS " + quote + "Latitude" + quote +
                      ", " + quote + "D" + quote + "." + quote + "nLongitude" + quote + " AS " + quote + "Longitude" + quote +
                      ", " + quote + "D" + quote + "." + quote + "sLink" + quote + " AS " + quote + "Link" + quote +
                      ", " + quote + "D" + quote + "." + quote + "bIsEmergency" + quote + " AS " + quote + "IsEmergency" + quote +
                      ", " + quote + "D" + quote + "." + quote + "bIsActive" + quote + " AS " + quote + "IsActive" + quote +
                      " FROM " + quote + "Doctor" + quote + " " + quote + "D" + quote;

            var where = new List<string>();

            if (isEmergency.HasValue)
            {
                where.Add(quote + "D" + quote + "." + quote + "bIsEmergency" + quote + " = @IsEmergency");
            }

            if (onlyActive != false)
            {
                where.Add(quote + "D" + quote + "." + quote + "bIsActive" + quote + " = TRUE");
            }

            if (where.Any())
            {
                sql += " WHERE " + string.Join(" AND ", where);
            }

            sql += " ORDER BY " + quote + "D" + quote + "." + quote + "nDoctorId" + quote + " ASC";
            sql += " LIMIT @Limit OFFSET @Page";

            var values = ExecutionContext(connection =>
            {
                var returnValue = connection.Query<DoctorModel>(
                    sql,
                    new
                    {
                        IsEmergency = isEmergency,
                        Limit = limit,
                        Page = currentPage
                    },
                    commandType: CommandType.Text
                ).ToList();

                return returnValue;
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
                             ", " + quote + "sSpecialty" + quote + " " + quote + "Specialty" + quote +
                             ", " + quote + "bIsEmergency" + quote + " " + quote + "IsEmergency" + quote +                             
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

        public IEnumerable<ClinicalHistoryModel> GetListClinicalHistoryByDoctorId(int id, DateTime? dateQuery)
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
                             ", " + quote + "P" + quote + "." + quote + "sPhoto" + quote + " " + quote + "File" + quote +
                             ", " + quote + "P" + quote + "." + quote + "sUbication" + quote + " " + quote + "Ubication" + quote +
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
                             ", " + quote + "D" + quote + "." + quote + "sSpecialty" + quote + " " + quote + "Specialty" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sUbication" + quote + " " + quote + "Ubication" + quote +
                             ", " + quote + "D" + quote + "." + quote + "nLatitude" + quote + " " + quote + "Latitude" + quote +
                             ", " + quote + "D" + quote + "." + quote + "nLongitude" + quote + " " + quote + "Longitude" + quote +
                             ", " + quote + "D" + quote + "." + quote + "sLink" + quote + " " + quote + "Link" + quote +

                     " FROM " + quote + "ClinicalHistory" + quote + " " + quote + "CH" + quote +

                     " INNER JOIN " + quote + "Patient" + quote + " " + quote + "P" + quote +
                     " ON " + quote + "CH" + quote + "." + quote + "nPatientId" + quote +
                     " = " + quote + "P" + quote + "." + quote + "nPatientId" + quote +

                     " LEFT JOIN " + quote + "Doctor" + quote + " " + quote + "D" + quote +
                     " ON " + quote + "D" + quote + "." + quote + "nDoctorId" + quote +
                     " = " + quote + "CH" + quote + "." + quote + "nDoctorId" + quote +

                     " WHERE " + quote + "CH" + quote + "." + quote + "nDoctorId" + quote + " = @DoctorId";

            // 👇 NUEVO FILTRO POR FECHA
            if (dateQuery.HasValue)
            {
                sql += " AND DATE(" + quote + "CH" + quote + "." + quote + "dDateQuery" + quote + ") = @DateQuery";
            }

            sql += " ORDER BY " + quote + "CH" + quote + "." + quote + "nClinicalHistoryId" + quote + " ASC";

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<ClinicalHistoryModel,
                                                  PatientModel,
                                                  DoctorModel,
                                                  ClinicalHistoryModel>(
                    sql,
                    (clinicalHistory, patient, doctor) =>
                    {
                        clinicalHistory.Patient = patient;
                        clinicalHistory.Doctor = doctor;
                        return clinicalHistory;
                    },
                    new
                    {
                        DoctorId = id,
                        DateQuery = dateQuery?.Date
                    },
                    commandType: CommandType.Text,
                    splitOn: "Id").ToList();

                return returnVale;
            });

            return values;
        }

        public IEnumerable<DoctorAppointmentHourModel> GetAppointmentHourByDoctorId(int id, DateTime date)
        {
            const string quote = "\"";
            var sql = @"SELECT " +
                             " CAST(" + quote + "CH" + quote + "." + quote + "dDateQuery" + quote + " AT TIME ZONE 'America/La_Paz' AS time) " + quote + "Hour" + quote +
                      " FROM " + quote + "ClinicalHistory" + quote + " " + quote + "CH" + quote +
                      " WHERE " + quote + "CH" + quote + "." + quote + "nDoctorId" + quote + " = @DoctorId" +
                        " AND " + quote + "CH" + quote + "." + quote + "dDateQuery" + quote + " >= @DateFrom" +
                        " AND " + quote + "CH" + quote + "." + quote + "dDateQuery" + quote + " < @DateTo" +
                      " ORDER BY " + quote + "CH" + quote + "." + quote + "dDateQuery" + quote + " ASC";

            var values = ExecutionContext(connection =>
            {
                var returnValue = connection.Query<DoctorAppointmentHourModel>(
                    sql,
                    new
                    {
                        DoctorId = id,
                        DateFrom = date.Date,
                        DateTo = date.Date.AddDays(1)
                    },
                    commandType: CommandType.Text
                ).ToList();

                return returnValue;
            });

            return values;
        }

        public DoctorModel GetDoctorByAuthUserId(int id)
        {
            const string quote = "\"";

            var sql = @"SELECT  " + quote + "nDoctorId" + quote + " AS " + quote + "Id" + quote +
                             ", " + quote + "sFirstName" + quote + " AS " + quote + "FirstName" + quote +
                             ", " + quote + "sLastName" + quote + " AS " + quote + "LastName" + quote +
                             ", " + quote + "sPhone" + quote + " AS " + quote + "Phone" + quote +
                             ", " + quote + "sCi" + quote + " AS " + quote + "Ci" + quote +
                             ", " + quote + "sNit" + quote + " AS " + quote + "Nit" + quote +
                             ", " + quote + "sPhoto" + quote + " AS " + quote + "PhotoByte" + quote +
                             ", " + quote + "sSpecialty" + quote + " AS " + quote + "Specialty" + quote +
                             ", " + quote + "sUbication" + quote + " AS " + quote + "Ubication" + quote +
                             ", " + quote + "nLatitude" + quote + " AS " + quote + "Latitude" + quote +
                             ", " + quote + "nLongitude" + quote + " AS " + quote + "Longitude" + quote +
                             ", " + quote + "sLink" + quote + " AS " + quote + "Link" + quote +
                             ", " + quote + "bIsActive" + quote + " AS " + quote + "IsActive" + quote +
                         " FROM " + quote + "Doctor" + quote + " " + quote + "D" + quote +
                         " WHERE " + quote + "D" + quote + "." + quote + "nAuthUserId" + quote + " = @AuthUserId";

            var values = ExecutionContext(connection =>
            {
                var result = connection.Query<DoctorModel>(sql, new { AuthUserId = id }).SingleOrDefault();
                return result;
            });

            return values;
        }
    }
}