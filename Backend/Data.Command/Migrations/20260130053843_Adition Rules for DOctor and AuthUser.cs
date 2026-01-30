using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class AditionRulesforDOctorandAuthUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "nAuthUserId",
                table: "Doctor",
                type: "integer",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 5, 38, 42, 955, DateTimeKind.Utc).AddTicks(3703));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 2,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 5, 38, 42, 955, DateTimeKind.Utc).AddTicks(3714));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 3,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 5, 38, 42, 955, DateTimeKind.Utc).AddTicks(3716));

            migrationBuilder.CreateIndex(
                name: "IX_Doctor_nAuthUserId",
                table: "Doctor",
                column: "nAuthUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctor_AuthUser_nAuthUserId",
                table: "Doctor",
                column: "nAuthUserId",
                principalTable: "AuthUser",
                principalColumn: "nAuthUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctor_AuthUser_nAuthUserId",
                table: "Doctor");

            migrationBuilder.DropIndex(
                name: "IX_Doctor_nAuthUserId",
                table: "Doctor");

            migrationBuilder.DropColumn(
                name: "nAuthUserId",
                table: "Doctor");

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 5, 28, 43, 807, DateTimeKind.Utc).AddTicks(4916));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 2,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 5, 28, 43, 807, DateTimeKind.Utc).AddTicks(4927));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 3,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 5, 28, 43, 807, DateTimeKind.Utc).AddTicks(4928));
        }
    }
}
