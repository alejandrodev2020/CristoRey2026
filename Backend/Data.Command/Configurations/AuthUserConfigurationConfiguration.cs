using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Command.Configurations
{
    public class AuthUserConfigurationConfiguration : IEntityTypeConfiguration<Domain.Entities.AuthAggregate.AuthUserConfiguration>
    {
        public void Configure(EntityTypeBuilder<Domain.Entities.AuthAggregate.AuthUserConfiguration> builder)
        {

            builder.HasKey(x => x.Id);

            builder
                .HasOne(a => a.AuthUser)
                .WithOne()
                .HasForeignKey<Domain.Entities.AuthAggregate.AuthUserConfiguration>(e => e.AuthUserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
