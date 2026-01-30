using Resources.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.PatientAggregate
{
    public class ClinicalHistory : BaseModel, IAggregateChild<Patient>
    {
        internal ClinicalHistory(DateTime dateQuery, string motive,
                                 string diagnostic, string observations,  decimal? totalCost, 
                                 bool? wasPaid, bool? isActive, int patientId = default, int id = default) : this()
        {
            Id = id;
            PatientId = patientId;
            DateQuery = dateQuery;
            Motive = motive;
            Diagnostic = diagnostic;
            Observations = observations;
            TotalCost = totalCost;
            WasPaid = wasPaid;
            IsActive = isActive;
        }

        internal ClinicalHistory(DateTime dateQuery, string motive,
                         string diagnostic, string observations, int? doctorId, int? statusId, decimal? totalCost,
                         bool? wasPaid, bool? isActive,  int patientId = default, int id = default) : this()
        {
            Id = id;
            PatientId = patientId;
            DateQuery = dateQuery;
            Motive = motive;
            Diagnostic = diagnostic;
            Observations = observations;
            TotalCost = totalCost;
            WasPaid = wasPaid;
            DoctorId = doctorId;
            StatusId = statusId;
            IsActive = isActive;
        }

        internal ClinicalHistory()
        {
        }

        /// <summary>
        /// Id
        /// </summary>
        [Column("nClinicalHistoryId")]
        [Required]
        public override int Id { get; protected set; }

        /// <summary>
        /// Venta Id
        /// </summary>
        [Column("nPatientId")]
        [Required]
        public int PatientId { get; private set; }

        /// <summary>
        /// Date of the consultation
        /// </summary>
        [Column("dDateQuery")]
        [Required]
        public DateTime DateQuery { get; private set; }

        /// <summary>
        /// Motive of the consultation
        /// </summary>
        [Column("sMotive")]
        public string Motive { get; private set; }

        /// <summary>
        /// Diagnosis
        /// </summary>
        [Column("sDiagnostic")]
        public string Diagnostic { get; private set; }

        /// <summary>
        /// Medical observations
        /// </summary>
        [Column("sObservations")]
        public string Observations { get; private set; }

        /// <summary>
        /// Total cost of the consultation
        /// </summary>
        [Column("tTotalCost")]
        public decimal? TotalCost { get; private set; }

        /// <summary>
        /// Indicates if it was paid
        /// </summary>
        [Column("bWasPaid")]
        public bool? WasPaid { get; private set; }

        /// <summary>
        /// Indicates if it was paid
        /// </summary>
        [Column("nStatusId")]
        public int? StatusId { get; private set; }

        /// <summary>
        /// Indicates if it was paid
        /// </summary>
        [Column("nDoctorId")]
        public int? DoctorId { get; private set; }

        /// <summary>
        /// Estado
        /// </summary>
        [Column("bIsActive")]
        public bool? IsActive { get; private set; }


        #region

        public static ClinicalHistory CreateClinicalHistory(DateTime dDateQuery, string sMotive, string sDiagnostic,      string sObservations,
                                                            decimal? tTotalCost, bool? bWasPaid)
        {
            return new ClinicalHistory(
                dateQuery: dDateQuery,
                motive: sMotive,
                diagnostic: sDiagnostic,
                observations: sObservations,
                totalCost: tTotalCost,
                wasPaid: bWasPaid,
                isActive: true
            );
        }

        public void setStatus(int id) 
        {
            StatusId = id;
        }

        public void updateClinicalHistory(string sMotive, string sDiagnostic, string sObservations,
                                                            decimal? tTotalCost, bool? bWasPaid)
        {
            Motive = sMotive;
            Diagnostic = sDiagnostic;
            Observations = sObservations;
            TotalCost = tTotalCost;
            WasPaid = bWasPaid;
        }



        #endregion


    }
}