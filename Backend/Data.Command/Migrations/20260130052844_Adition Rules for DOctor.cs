using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class AditionRulesforDOctor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "sUbication",
                table: "Doctor",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "sReference",
                table: "Doctor",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<byte[]>(
                name: "sPhoto",
                table: "Doctor",
                type: "bytea",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "bytea");

            migrationBuilder.AlterColumn<string>(
                name: "sPhone",
                table: "Doctor",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "sNit",
                table: "Doctor",
                type: "character varying(30)",
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "sLink",
                table: "Doctor",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "sCompany",
                table: "Doctor",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "sCi",
                table: "Doctor",
                type: "character varying(30)",
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateTable(
                name: "Patient",
                columns: table => new
                {
                    nPatientId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    sFirstName = table.Column<string>(type: "text", nullable: false),
                    sLastName = table.Column<string>(type: "text", nullable: false),
                    sPhone = table.Column<string>(type: "text", nullable: false),
                    sCi = table.Column<string>(type: "text", nullable: false),
                    sNit = table.Column<string>(type: "text", nullable: false),
                    sPhoto = table.Column<byte[]>(type: "bytea", nullable: false),
                    sUbication = table.Column<string>(type: "text", nullable: false),
                    sCompany = table.Column<string>(type: "text", nullable: false),
                    nPatientZoneId = table.Column<int>(type: "integer", nullable: true),
                    bHasPhoto = table.Column<bool>(type: "boolean", nullable: true),
                    nLatitude = table.Column<double>(type: "double precision", nullable: true),
                    nLongitude = table.Column<double>(type: "double precision", nullable: true),
                    sReference = table.Column<string>(type: "text", nullable: false),
                    sLink = table.Column<string>(type: "text", nullable: false),
                    sCodeVerified = table.Column<string>(type: "text", nullable: false),
                    bIsVerified = table.Column<bool>(type: "boolean", nullable: true),
                    nDepartamentId = table.Column<int>(type: "integer", nullable: true),
                    nCityId = table.Column<int>(type: "integer", nullable: true),
                    nGenderId = table.Column<int>(type: "integer", nullable: true),
                    nDoctorId = table.Column<int>(type: "integer", nullable: true),
                    bIsActive = table.Column<bool>(type: "boolean", nullable: true),
                    nUsercode = table.Column<int>(type: "integer", nullable: false),
                    dCreate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dCompDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    bStatus = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patient", x => x.nPatientId);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_ClinicalHistory_nPatientId",
                table: "ClinicalHistory",
                column: "nPatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClinicalHistory_Patient_nPatientId",
                table: "ClinicalHistory",
                column: "nPatientId",
                principalTable: "Patient",
                principalColumn: "nPatientId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClinicalHistory_Patient_nPatientId",
                table: "ClinicalHistory");

            migrationBuilder.DropTable(
                name: "Patient");

            migrationBuilder.DropIndex(
                name: "IX_ClinicalHistory_nPatientId",
                table: "ClinicalHistory");

            migrationBuilder.AlterColumn<string>(
                name: "sUbication",
                table: "Doctor",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "sReference",
                table: "Doctor",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<byte[]>(
                name: "sPhoto",
                table: "Doctor",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "sPhone",
                table: "Doctor",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "sNit",
                table: "Doctor",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(30)",
                oldMaxLength: 30,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "sLink",
                table: "Doctor",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "sCompany",
                table: "Doctor",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "sCi",
                table: "Doctor",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(30)",
                oldMaxLength: 30,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 1,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 5, 3, 22, 1, DateTimeKind.Utc).AddTicks(9162));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 2,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 5, 3, 22, 1, DateTimeKind.Utc).AddTicks(9177));

            migrationBuilder.UpdateData(
                table: "AuthRole",
                keyColumn: "nAuthRoleId",
                keyValue: 3,
                column: "dCompDate",
                value: new DateTime(2026, 1, 30, 5, 3, 22, 1, DateTimeKind.Utc).AddTicks(9179));
        }
    }
}
