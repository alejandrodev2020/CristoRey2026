using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class CreateInitialCreateNewTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClinicalHistory",
                columns: table => new
                {
                    nClinicalHistoryId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nPatientId = table.Column<int>(type: "integer", nullable: false),
                    dDateQuery = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    sMotive = table.Column<string>(type: "text", nullable: false),
                    sDiagnostic = table.Column<string>(type: "text", nullable: false),
                    sObservations = table.Column<string>(type: "text", nullable: false),
                    tTotalCost = table.Column<decimal>(type: "numeric", nullable: true),
                    bWasPaid = table.Column<bool>(type: "boolean", nullable: true),
                    nStatusId = table.Column<int>(type: "integer", nullable: true),
                    nDoctorId = table.Column<int>(type: "integer", nullable: true),
                    bIsActive = table.Column<bool>(type: "boolean", nullable: true),
                    nUsercode = table.Column<int>(type: "integer", nullable: false),
                    dCreate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dCompDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    bStatus = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClinicalHistory", x => x.nClinicalHistoryId);
                });

            migrationBuilder.CreateTable(
                name: "Doctor",
                columns: table => new
                {
                    nDoctorId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    sFirstName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    sLastName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    sPhone = table.Column<string>(type: "text", nullable: false),
                    sCi = table.Column<string>(type: "text", nullable: false),
                    sNit = table.Column<string>(type: "text", nullable: false),
                    sPhoto = table.Column<byte[]>(type: "bytea", nullable: false),
                    sUbication = table.Column<string>(type: "text", nullable: false),
                    sCompany = table.Column<string>(type: "text", nullable: false),
                    nClientZoneId = table.Column<int>(type: "integer", nullable: true),
                    bHasPhoto = table.Column<bool>(type: "boolean", nullable: true),
                    nLatitude = table.Column<double>(type: "double precision", nullable: true),
                    nLongitude = table.Column<double>(type: "double precision", nullable: true),
                    sReference = table.Column<string>(type: "text", nullable: false),
                    sLink = table.Column<string>(type: "text", nullable: false),
                    bIsEmergency = table.Column<bool>(type: "boolean", nullable: true),
                    bIsActive = table.Column<bool>(type: "boolean", nullable: true),
                    nUsercode = table.Column<int>(type: "integer", nullable: false),
                    dCreate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dCompDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    bStatus = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doctor", x => x.nDoctorId);
                });

            migrationBuilder.CreateTable(
                name: "Options",
                columns: table => new
                {
                    nOptionsId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    sTitle = table.Column<string>(type: "text", nullable: false),
                    sDescription = table.Column<string>(type: "text", nullable: false),
                    sCode = table.Column<string>(type: "text", nullable: false),
                    bHasPicture = table.Column<bool>(type: "boolean", nullable: true),
                    fPicture = table.Column<byte[]>(type: "bytea", nullable: false),
                    bIsActive = table.Column<bool>(type: "boolean", nullable: true),
                    nUsercode = table.Column<int>(type: "integer", nullable: false),
                    dCreate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dCompDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    bStatus = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Options", x => x.nOptionsId);
                });

            migrationBuilder.CreateTable(
                name: "OptionsDiasnostic",
                columns: table => new
                {
                    nOptionsDiasnosticId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nOptionsId = table.Column<int>(type: "integer", nullable: false),
                    sTitle = table.Column<string>(type: "text", nullable: false),
                    sDescription = table.Column<string>(type: "text", nullable: false),
                    sCode = table.Column<string>(type: "text", nullable: false),
                    bHasPicture = table.Column<bool>(type: "boolean", nullable: true),
                    fPicture = table.Column<byte[]>(type: "bytea", nullable: false),
                    bIsActive = table.Column<bool>(type: "boolean", nullable: true),
                    nUsercode = table.Column<int>(type: "integer", nullable: false),
                    dCreate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dCompDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    bStatus = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OptionsDiasnostic", x => x.nOptionsDiasnosticId);
                    table.ForeignKey(
                        name: "FK_OptionsDiasnostic_Options_nOptionsId",
                        column: x => x.nOptionsId,
                        principalTable: "Options",
                        principalColumn: "nOptionsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OptionsTratament",
                columns: table => new
                {
                    nOptionsTratamentId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nOptionsId = table.Column<int>(type: "integer", nullable: false),
                    sTitle = table.Column<string>(type: "text", nullable: false),
                    sDescription = table.Column<string>(type: "text", nullable: false),
                    sCode = table.Column<string>(type: "text", nullable: false),
                    bHasPicture = table.Column<bool>(type: "boolean", nullable: true),
                    fPicture = table.Column<byte[]>(type: "bytea", nullable: false),
                    bIsActive = table.Column<bool>(type: "boolean", nullable: true),
                    nUsercode = table.Column<int>(type: "integer", nullable: false),
                    dCreate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dCompDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    bStatus = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OptionsTratament", x => x.nOptionsTratamentId);
                    table.ForeignKey(
                        name: "FK_OptionsTratament_Options_nOptionsId",
                        column: x => x.nOptionsId,
                        principalTable: "Options",
                        principalColumn: "nOptionsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OptionsDiasnostic_nOptionsId",
                table: "OptionsDiasnostic",
                column: "nOptionsId");

            migrationBuilder.CreateIndex(
                name: "IX_OptionsTratament_nOptionsId",
                table: "OptionsTratament",
                column: "nOptionsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClinicalHistory");

            migrationBuilder.DropTable(
                name: "Doctor");

            migrationBuilder.DropTable(
                name: "OptionsDiasnostic");

            migrationBuilder.DropTable(
                name: "OptionsTratament");

            migrationBuilder.DropTable(
                name: "Options");
        }
    }
}
