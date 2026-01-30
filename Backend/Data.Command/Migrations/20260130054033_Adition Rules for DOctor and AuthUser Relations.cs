using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class AditionRulesforDOctorandAuthUserRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctor_AuthUser_nAuthUserId",
                table: "Doctor");

            migrationBuilder.DropIndex(
                name: "IX_Doctor_nAuthUserId",
                table: "Doctor");

            migrationBuilder.AlterColumn<int>(
                name: "nAuthUserId",
                table: "Doctor",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_Doctor_nAuthUserId",
                table: "Doctor",
                column: "nAuthUserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Doctor_AuthUser_nAuthUserId",
                table: "Doctor",
                column: "nAuthUserId",
                principalTable: "AuthUser",
                principalColumn: "nAuthUserId",
                onDelete: ReferentialAction.Restrict);
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

            migrationBuilder.AlterColumn<int>(
                name: "nAuthUserId",
                table: "Doctor",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

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
    }
}
