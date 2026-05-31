using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class CreatenewTableForNOtification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
