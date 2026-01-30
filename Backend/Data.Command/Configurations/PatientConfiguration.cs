using Domain.Entities.AuthAggregate;
using Domain.Entities.DoctorAggregate;
using Domain.Entities.PatientAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Command.Configurations
{
    public class PatientConfiguration : IEntityTypeConfiguration<Patient>
    {
        public void Configure(EntityTypeBuilder<Patient> builder)
        {
            builder.ToTable("Patient");

            builder.HasKey(p => p.Id);

            // ==============================
            // OBLIGATORIOS
            // ==============================

            builder.Property(p => p.FirstName)
                   .HasColumnName("sFirstName")
                   .HasMaxLength(40)
                   .IsRequired();

            builder.Property(p => p.LastName)
                   .HasColumnName("sLastName")
                   .HasMaxLength(40)
                   .IsRequired();

            builder.Property(p => p.Phone)
                   .HasColumnName("sPhone")
                   .HasMaxLength(20)
                   .IsRequired();

            builder.Property(p => p.Ci)
                   .HasColumnName("sCi")
                   .HasMaxLength(30)
                   .IsRequired();

            builder.Property(p => p.AuthUserId)
                   .HasColumnName("nAuthUserId")
                   .IsRequired();

            // ==============================
            // OPCIONALES (NULLABLE)
            // ==============================

            builder.Property(p => p.Photo)
                   .HasColumnName("sPhoto")
                   .IsRequired(false);

            builder.Property(p => p.Ubication)
                   .HasColumnName("sUbication")
                   .HasMaxLength(200)
                   .IsRequired(false);

            builder.Property(p => p.Company)
                   .HasColumnName("sCompany")
                   .HasMaxLength(100)
                   .IsRequired(false);

            builder.Property(p => p.PatientZoneId)
                   .HasColumnName("nPatientZoneId")
                   .IsRequired(false);

            builder.Property(p => p.HasPhoto)
                   .HasColumnName("bHasPhoto")
                   .IsRequired(false);

            builder.Property(p => p.Latitude)
                   .HasColumnName("nLatitude")
                   .IsRequired(false);

            builder.Property(p => p.Longitude)
                   .HasColumnName("nLongitude")
                   .IsRequired(false);

            builder.Property(p => p.Reference)
                   .HasColumnName("sReference")
                   .HasMaxLength(200)
                   .IsRequired(false);

            builder.Property(p => p.Link)
                   .HasColumnName("sLink")
                   .HasMaxLength(200)
                   .IsRequired(false);

            builder.Property(p => p.CodeVerified)
                   .HasColumnName("sCodeVerified")
                   .HasMaxLength(50)
                   .IsRequired(false);

            builder.Property(p => p.IsVerified)
                   .HasColumnName("bIsVerified")
                   .IsRequired(false);

            builder.Property(p => p.DepartamentId)
                   .HasColumnName("nDepartamentId")
                   .IsRequired(false);

            builder.Property(p => p.CityId)
                   .HasColumnName("nCityId")
                   .IsRequired(false);

            builder.Property(p => p.GenderId)
                   .HasColumnName("nGenderId")
                   .IsRequired(false);

            builder.Property(p => p.DoctorId)
                   .HasColumnName("nDoctorId")
                   .IsRequired(false);

            builder.Property(p => p.IsActive)
                   .HasColumnName("bIsActive")
                   .IsRequired(false);

            // ==============================
            // RELACIÓN AuthUser (1 a 1)
            // ==============================

            builder
                .HasOne(p => p.AuthUser)
                .WithOne()
                .HasForeignKey<Patient>(p => p.AuthUserId)
                .HasPrincipalKey<AuthUser>(u => u.Id)
                .OnDelete(DeleteBehavior.Restrict);

            // ==============================
            // ClinicalHistory
            // ==============================

            builder
                .HasMany(p => p.ClinicalHistorys)
                .WithOne()
                .HasForeignKey(c => c.PatientId);

            builder
                .Metadata
                .FindNavigation(nameof(Patient.ClinicalHistorys))
                .SetPropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}
