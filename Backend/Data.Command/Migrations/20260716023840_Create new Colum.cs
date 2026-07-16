using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class CreatenewColum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "nAvailabilityStatusId",
                table: "Doctor",
                type: "integer",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 7, 16, 2, 38, 39, 88, DateTimeKind.Utc).AddTicks(6468));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 2,
                column: "dCompDate",
                value: new DateTime(2026, 7, 16, 2, 38, 39, 88, DateTimeKind.Utc).AddTicks(6481));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 3,
                column: "dCompDate",
                value: new DateTime(2026, 7, 16, 2, 38, 39, 88, DateTimeKind.Utc).AddTicks(6482));

            migrationBuilder.UpdateData(
                table: "ClientZone",
                keyColumn: "nClientZoneId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 7, 16, 2, 38, 39, 90, DateTimeKind.Utc).AddTicks(1024));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "nAvailabilityStatusId",
                table: "Doctor");

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
    }
}
