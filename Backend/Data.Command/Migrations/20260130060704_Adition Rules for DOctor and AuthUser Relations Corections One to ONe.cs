using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class AditionRulesforDOctorandAuthUserRelationsCorectionsOnetoONe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patient_AuthUser_nAuthUserId",
                table: "Patient");

            migrationBuilder.DropIndex(
                name: "IX_Patient_nAuthUserId",
                table: "Patient");

            migrationBuilder.AlterColumn<int>(
                name: "nAuthUserId",
                table: "Patient",
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
                value: new DateTime(2026, 1, 30, 6, 7, 4, 112, DateTimeKind.Utc).AddTicks(5342));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 2,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 6, 7, 4, 112, DateTimeKind.Utc).AddTicks(5353));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 3,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 6, 7, 4, 112, DateTimeKind.Utc).AddTicks(5354));

            migrationBuilder.CreateIndex(
                name: "IX_Patient_nAuthUserId",
                table: "Patient",
                column: "nAuthUserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Patient_AuthUser_nAuthUserId",
                table: "Patient",
                column: "nAuthUserId",
                principalTable: "AuthUser",
                principalColumn: "nAuthUserId",
                onDelete: ReferentialAction.Restrict);
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

            migrationBuilder.AlterColumn<int>(
                name: "nAuthUserId",
                table: "Patient",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

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
    }
}
