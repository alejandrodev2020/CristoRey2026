using Domain.Entities.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Command.Configurations
{
    public class OptionsConfiguration : IEntityTypeConfiguration<Options>
    {

        public void Configure(EntityTypeBuilder<Options> builder)
        {
            builder
               .HasMany(p => p.Diasnostics)
               .WithOne()
               .HasForeignKey(p => p.OptionsId);

            builder
                .Metadata
                .FindNavigation(nameof(Options.Diasnostics))
                .SetPropertyAccessMode(PropertyAccessMode.Field);

            builder
              .HasMany(p => p.Trataments)
              .WithOne()
              .HasForeignKey(p => p.OptionsId);

            builder
                .Metadata
                .FindNavigation(nameof(Options.Trataments))
                .SetPropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}
