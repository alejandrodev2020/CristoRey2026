using Domain.Entities.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Command.Configurations
{
    public class OptionsTratamentConfiguration : IEntityTypeConfiguration<OptionsTratament>
    {

        public void Configure(EntityTypeBuilder<OptionsTratament> builder)
        {

        }
    }
}
