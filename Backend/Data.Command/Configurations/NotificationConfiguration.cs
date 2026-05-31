using Domain.Entities.NotificationAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Command.Configurations
{
    public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
    {
        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.ToTable("Notification");

            builder.HasKey(n => n.Id);

            builder.Property(n => n.Id)
                   .HasColumnName("nNotificationId")
                   .IsRequired();

            // ===============================
            // OBLIGATORIOS
            // ===============================

            builder.Property(n => n.TargetUserId)
                   .HasColumnName("nTargetUserId")
                   .IsRequired();

            builder.Property(n => n.SenderUserId)
                   .HasColumnName("nSenderUserId")
                   .IsRequired();

            builder.Property(n => n.Title)
                   .HasColumnName("sTitle")
                   .HasMaxLength(100)
                   .IsRequired();

            builder.Property(n => n.Message)
                   .HasColumnName("sMessage")
                   .HasMaxLength(500)
                   .IsRequired();

            builder.Property(n => n.Type)
                   .HasColumnName("sType")
                   .HasMaxLength(50)
                   .IsRequired();

            builder.Property(n => n.IsRead)
                   .HasColumnName("bIsRead")
                   .IsRequired();

            builder.Property(n => n.CreatedAt)
                   .HasColumnName("dCreatedAt")
                   .IsRequired();

            // ===============================
            // OPCIONALES
            // ===============================

            builder.Property(n => n.ActionUrl)
                   .HasColumnName("sActionUrl")
                   .HasMaxLength(250)
                   .IsRequired(false);

            builder.Property(n => n.ReadAt)
                   .HasColumnName("dReadAt")
                   .IsRequired(false);
        }
    }
}