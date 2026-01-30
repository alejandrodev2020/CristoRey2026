using Domain.Entities.AuthAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Command.Configurations
{
    class AuthUserConfiguration : IEntityTypeConfiguration<AuthUser>
    {

        public void Configure(EntityTypeBuilder<AuthUser> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.FirstName)
                   .IsRequired();

            builder.Property(x => x.UserName)
                   .IsRequired();

            builder.Property(x => x.UserKey)
                   .IsRequired();

            builder.Property(x => x.IsActive)
                   .IsRequired();

            // 🔽 OPCIONALES
            builder.Property(x => x.LastName)
                   .IsRequired(false);

            builder.Property(x => x.Phone)
                   .IsRequired(false);

            builder.Property(x => x.Ci)
                   .IsRequired(false);

            builder.Property(x => x.Nit)
                   .IsRequired(false);

            builder.Property(x => x.Avatar)
                   .IsRequired(false);   // ⭐ ESTA ES LA QUE TE ROMPÍA TODO

            builder.Property(x => x.IsAdmin)
                   .IsRequired(false);

            builder.Property(x => x.AuthRoleId)
                   .IsRequired(false);



            builder.HasData(
              new AuthUser("Favian Alejandro","Avila Mancilla","67394939", "12890978", "12890978018", null,"kuper","jtgmad1wp",true,1,true,1),
              new AuthUser("Usuario", "Defecto", "", "User Ci", "Client Nit", null, "admin", "123456", true, 1,true,2)
            );


        }
    }
}
