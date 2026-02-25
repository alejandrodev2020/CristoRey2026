using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class UpdateColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "sCompany",
                table: "Doctor",
                newName: "sSpecialty");

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 2, 25, 22, 26, 39, 632, DateTimeKind.Utc).AddTicks(2577));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 2,
                column: "dCompDate",
                value: new DateTime(2026, 2, 25, 22, 26, 39, 632, DateTimeKind.Utc).AddTicks(2589));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 3,
                column: "dCompDate",
                value: new DateTime(2026, 2, 25, 22, 26, 39, 632, DateTimeKind.Utc).AddTicks(2591));

            migrationBuilder.UpdateData(
                table: "ClientZone",
                keyColumn: "nClientZoneId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 2, 25, 22, 26, 39, 633, DateTimeKind.Utc).AddTicks(6421));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "sSpecialty",
                table: "Doctor",
                newName: "sCompany");

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
        }
    }
}
