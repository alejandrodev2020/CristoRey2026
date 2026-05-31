using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class CreatenewTableForNOtificationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notification",
                columns: table => new
                {
                    nNotificationId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nTargetUserId = table.Column<int>(type: "integer", nullable: false),
                    nSenderUserId = table.Column<int>(type: "integer", nullable: false),
                    sTitle = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    sMessage = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    sType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    sActionUrl = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    bIsRead = table.Column<bool>(type: "boolean", nullable: false),
                    dCreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dReadAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    nUsercode = table.Column<int>(type: "integer", nullable: false),
                    dCreate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dCompDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    bStatus = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notification", x => x.nNotificationId);
                });

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 5, 30, 16, 43, 35, 203, DateTimeKind.Utc).AddTicks(3399));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 2,
                column: "dCompDate",
                value: new DateTime(2026, 5, 30, 16, 43, 35, 203, DateTimeKind.Utc).AddTicks(3411));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 3,
                column: "dCompDate",
                value: new DateTime(2026, 5, 30, 16, 43, 35, 203, DateTimeKind.Utc).AddTicks(3413));

            migrationBuilder.UpdateData(
                table: "ClientZone",
                keyColumn: "nClientZoneId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 5, 30, 16, 43, 35, 204, DateTimeKind.Utc).AddTicks(9452));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notification");

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 5, 30, 16, 42, 31, 65, DateTimeKind.Utc).AddTicks(6071));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 2,
                column: "dCompDate",
                value: new DateTime(2026, 5, 30, 16, 42, 31, 65, DateTimeKind.Utc).AddTicks(6083));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 3,
                column: "dCompDate",
                value: new DateTime(2026, 5, 30, 16, 42, 31, 65, DateTimeKind.Utc).AddTicks(6085));

            migrationBuilder.UpdateData(
                table: "ClientZone",
                keyColumn: "nClientZoneId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 5, 30, 16, 42, 31, 66, DateTimeKind.Utc).AddTicks(8848));
        }
    }
}
