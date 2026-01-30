using Domain.Entities.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Command.Configurations
{
    public class OptionsDiasnosticConfiguration : IEntityTypeConfiguration<OptionsDiasnostic>
    {

        public void Configure(EntityTypeBuilder<OptionsDiasnostic> builder)
        {

        }
    }
}
