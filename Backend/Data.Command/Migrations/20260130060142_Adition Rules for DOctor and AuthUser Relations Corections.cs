using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class AditionRulesforDOctorandAuthUserRelationsCorections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "nAuthUserId",
                table: "Patient",
                type: "integer",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 6, 1, 42, 322, DateTimeKind.Utc).AddTicks(6914));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 2,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 6, 1, 42, 322, DateTimeKind.Utc).AddTicks(6926));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 3,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 6, 1, 42, 322, DateTimeKind.Utc).AddTicks(6927));

            migrationBuilder.CreateIndex(
                name: "IX_Patient_nAuthUserId",
                table: "Patient",
                column: "nAuthUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Patient_AuthUser_nAuthUserId",
                table: "Patient",
                column: "nAuthUserId",
                principalTable: "AuthUser",
                principalColumn: "nAuthUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patient_AuthUser_nAuthUserId",
                table: "Patient");

            migrationBuilder.DropIndex(
                name: "IX_Patient_nAuthUserId",
                table: "Patient");

            migrationBuilder.DropColumn(
                name: "nAuthUserId",
                table: "Patient");

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 5, 40, 32, 924, DateTimeKind.Utc).AddTicks(8625));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 2,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 5, 40, 32, 924, DateTimeKind.Utc).AddTicks(8638));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 3,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 5, 40, 32, 924, DateTimeKind.Utc).AddTicks(8640));
        }
    }
}
