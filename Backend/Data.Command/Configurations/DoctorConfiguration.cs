using Domain.Entities.AuthAggregate;
using Domain.Entities.DoctorAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Command.Configurations
{
    public class DoctorConfiguration : IEntityTypeConfiguration<Doctor>
    {
        public void Configure(EntityTypeBuilder<Doctor> builder)
        {
            builder.ToTable("Doctor");

            builder.HasKey(d => d.Id);

            // ===============================
            // OBLIGATORIOS
            // ===============================

            builder.Property(d => d.FirstName)
                   .HasColumnName("sFirstName")
                   .HasMaxLength(40)
                   .IsRequired();

            builder.Property(d => d.LastName)
                   .HasColumnName("sLastName")
                   .HasMaxLength(40)
                   .IsRequired();

            builder.Property(d => d.Phone)
                   .HasColumnName("sPhone")
                   .HasMaxLength(20)
                   .IsRequired();

            // ===============================
            // OPCIONALES
            // ===============================

            builder.Property(d => d.Ci)
                   .HasColumnName("sCi")
                   .HasMaxLength(30)
                   .IsRequired(false);

            builder.Property(d => d.Nit)
                   .HasColumnName("sNit")
                   .HasMaxLength(30)
                   .IsRequired(false);

            builder.Property(d => d.Photo)
                   .HasColumnName("sPhoto")
                   .IsRequired(false);

            builder.Property(d => d.Ubication)
                   .HasColumnName("sUbication")
                   .HasMaxLength(200)
                   .IsRequired(false);

            builder.Property(d => d.Company)
                   .HasColumnName("sCompany")
                   .HasMaxLength(100)
                   .IsRequired(false);

            builder.Property(d => d.ClientZoneId)
                   .HasColumnName("nClientZoneId")
                   .IsRequired(false);

            builder.Property(d => d.HasPhoto)
                   .HasColumnName("bHasPhoto")
                   .IsRequired(false);

            builder.Property(d => d.Latitude)
                   .HasColumnName("nLatitude")
                   .IsRequired(false);

            builder.Property(d => d.Longitude)
                   .HasColumnName("nLongitude")
                   .IsRequired(false);

            builder.Property(d => d.Reference)
                   .HasColumnName("sReference")
                   .HasMaxLength(200)
                   .IsRequired(false);

            builder.Property(d => d.Link)
                   .HasColumnName("sLink")
                   .HasMaxLength(200)
                   .IsRequired(false);

            builder.Property(d => d.IsEmergency)
                   .HasColumnName("bIsEmergency")
                   .IsRequired(false);

            builder.Property(d => d.IsActive)
                   .HasColumnName("bIsActive")
                   .IsRequired(false);


            builder.Property(d => d.AuthUserId)
                   .HasColumnName("nAuthUserId")
                   .IsRequired(); // 👈 ahora sí obligatorio

            builder
                .HasOne(d => d.AuthUser)
                .WithOne()
                .HasForeignKey<Doctor>(d => d.AuthUserId)
                .HasPrincipalKey<AuthUser>(u => u.Id) // MUY IMPORTANTE
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
