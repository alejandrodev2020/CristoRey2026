using Domain.Entities.PatientAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Command.Configurations
{
    public class ClinicalHistoryConfiguration : IEntityTypeConfiguration<ClinicalHistory>
    {
        public void Configure(EntityTypeBuilder<ClinicalHistory> builder)
        {


        }
    }
}
