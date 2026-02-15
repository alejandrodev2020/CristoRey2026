using Domain.Entities.AuthAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Command.Configurations
{
    public class AuthUserDeviceConfiguration : IEntityTypeConfiguration<AuthUserDevice>
    {
        public void Configure(EntityTypeBuilder<AuthUserDevice> builder)
        {

        }
    }
}
