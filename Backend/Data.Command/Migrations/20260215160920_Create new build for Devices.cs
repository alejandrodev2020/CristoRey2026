using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class CreatenewbuildforDevices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuthUserDevice",
                columns: table => new
                {
                    nAuthUserDeviceId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nAuthUserId = table.Column<int>(type: "integer", nullable: false),
                    sDevice = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    sDeviceToken = table.Column<string>(type: "text", nullable: false),
                    sPlatform = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    sSystemVersion = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    dRegistrationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dLastLogin = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    bIsActive = table.Column<bool>(type: "boolean", nullable: true),
                    nUsercode = table.Column<int>(type: "integer", nullable: false),
                    dCreate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dCompDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    bStatus = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthUserDevice", x => x.nAuthUserDeviceId);
                    table.ForeignKey(
                        name: "FK_AuthUserDevice_AuthUser_nAuthUserId",
                        column: x => x.nAuthUserId,
                        principalTable: "AuthUser",
                        principalColumn: "nAuthUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 2, 15, 16, 9, 19, 669, DateTimeKind.Utc).AddTicks(7808));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 2,
                column: "dCompDate",
                value: new DateTime(2026, 2, 15, 16, 9, 19, 669, DateTimeKind.Utc).AddTicks(7820));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 3,
                column: "dCompDate",
                value: new DateTime(2026, 2, 15, 16, 9, 19, 669, DateTimeKind.Utc).AddTicks(7821));

            migrationBuilder.UpdateData(
                table: "ClientZone",
                keyColumn: "nClientZoneId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 2, 15, 16, 9, 19, 671, DateTimeKind.Utc).AddTicks(735));

            migrationBuilder.CreateIndex(
                name: "IX_AuthUserDevice_nAuthUserId",
                table: "AuthUserDevice",
                column: "nAuthUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthUserDevice");

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 6, 28, 23, 782, DateTimeKind.Utc).AddTicks(6255));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 2,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 6, 28, 23, 782, DateTimeKind.Utc).AddTicks(6265));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 3,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 6, 28, 23, 782, DateTimeKind.Utc).AddTicks(6266));

            migrationBuilder.UpdateData(
                table: "ClientZone",
                keyColumn: "nClientZoneId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 6, 28, 23, 783, DateTimeKind.Utc).AddTicks(8881));
        }
    }
}
