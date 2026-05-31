using Dapper;
using Resources.Data.Query.Repository;
using Service.Models.Notification;
using Service.Query.NotificationQuery;
using System.Data;

namespace Data.Query.Repository
{
    public class NotificationQueryRepository : BaseQueryRepository, INotificationQueryRepository
    {
        public NotificationQueryRepository(string connectionString)
            : base(connectionString)
        {
        }

        public IEnumerable<NotificationModel> GetMyNotificationsByTargetUserId(
            int targetUserId,
            bool onlyUnread)
        {
            const string quote = "\"";

            var sql = @"SELECT 
                            " + quote + "nNotificationId" + quote + @" AS " + quote + "Id" + quote + @",
                            " + quote + "nTargetUserId" + quote + @" AS " + quote + "TargetUserId" + quote + @",
                            " + quote + "nSenderUserId" + quote + @" AS " + quote + "SenderUserId" + quote + @",
                            " + quote + "sTitle" + quote + @" AS " + quote + "Title" + quote + @",
                            " + quote + "sMessage" + quote + @" AS " + quote + "Message" + quote + @",
                            " + quote + "sType" + quote + @" AS " + quote + "Type" + quote + @",
                            " + quote + "sActionUrl" + quote + @" AS " + quote + "ActionUrl" + quote + @",
                            " + quote + "bIsRead" + quote + @" AS " + quote + "IsRead" + quote + @",
                            " + quote + "dCreatedAt" + quote + @" AS " + quote + "CreatedAt" + quote + @",
                            " + quote + "dReadAt" + quote + @" AS " + quote + "ReadAt" + quote + @"
                        FROM " + quote + "Notification" + quote + @"
                        WHERE " + quote + "nTargetUserId" + quote + @" = @TargetUserId
                          AND (
                                @OnlyUnread = FALSE
                                OR " + quote + "bIsRead" + quote + @" = FALSE
                              )
                          AND " + quote + "bStatus" + quote + @" = TRUE
                        ORDER BY " + quote + "dCreatedAt" + quote + @" DESC";

            var values = ExecutionContext(connection =>
            {
                var returnValue = connection.Query<NotificationModel>(
                    sql,
                    new
                    {
                        TargetUserId = targetUserId,
                        OnlyUnread = onlyUnread
                    },
                    commandType: CommandType.Text
                ).ToList();

                return returnValue;
            });

            return values;
        }

        public NotificationModel GetNotificationById(int notificationId)
        {
            const string quote = "\"";

            var sql = @"SELECT 
                            " + quote + "nNotificationId" + quote + @" AS " + quote + "Id" + quote + @",
                            " + quote + "nTargetUserId" + quote + @" AS " + quote + "TargetUserId" + quote + @",
                            " + quote + "nSenderUserId" + quote + @" AS " + quote + "SenderUserId" + quote + @",
                            " + quote + "sTitle" + quote + @" AS " + quote + "Title" + quote + @",
                            " + quote + "sMessage" + quote + @" AS " + quote + "Message" + quote + @",
                            " + quote + "sType" + quote + @" AS " + quote + "Type" + quote + @",
                            " + quote + "sActionUrl" + quote + @" AS " + quote + "ActionUrl" + quote + @",
                            " + quote + "bIsRead" + quote + @" AS " + quote + "IsRead" + quote + @",
                            " + quote + "dCreatedAt" + quote + @" AS " + quote + "CreatedAt" + quote + @",
                            " + quote + "dReadAt" + quote + @" AS " + quote + "ReadAt" + quote + @"
                        FROM " + quote + "Notification" + quote + @"
                        WHERE " + quote + "nNotificationId" + quote + @" = @NotificationId";

            var value = ExecutionContext(connection =>
            {
                var result = connection.QueryFirstOrDefault<NotificationModel>(
                    sql,
                    new { NotificationId = notificationId },
                    commandType: CommandType.Text
                );

                return result;
            });

            return value;
        }

        public int GetUnreadNotificationsCount(int targetUserId)
        {
            const string quote = "\"";

            var sql = @"SELECT COUNT(*)
                        FROM " + quote + "Notification" + quote + @"
                        WHERE " + quote + "nTargetUserId" + quote + @" = @TargetUserId
                          AND " + quote + "bIsRead" + quote + @" = FALSE
                          AND " + quote + "bStatus" + quote + @" = TRUE";

            var value = ExecutionContext(connection =>
            {
                return connection.ExecuteScalar<int>(
                    sql,
                    new { TargetUserId = targetUserId },
                    commandType: CommandType.Text
                );
            });

            return value;
        }
    }
}