using Service.Models.Doctor;
using System;

namespace Service.Models.Patient
{
    public class ClinicalHistoryModel
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public DateTime DateQuery { get; set; }
        public string Motive { get; set; }
        public string Diagnostic { get; set; }
        public string Observations { get; set; }
        public decimal? TotalCost { get; set; }
        public bool? WasPaid { get; set; }
        public int StatusId { get; set; }
        public int DoctorId { get; set; }
        public bool? IsActive { get; set; }
        public PatientModel Patient { get; set; }
        public DoctorModel Doctor { get; set; }

    }
}
