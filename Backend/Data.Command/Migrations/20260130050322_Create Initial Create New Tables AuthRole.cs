using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class CreateInitialCreateNewTablesAuthRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuthRole",
                columns: table => new
                {
                    nAuthRoleId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nUsercode = table.Column<int>(type: "integer", nullable: false),
                    dCreate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dCompDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    sDescription = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    bStatus = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthRole", x => x.nAuthRoleId);
                });

            migrationBuilder.InsertData(
                table: "AuthRole",
                columns: new[] { "nAuthRoleId", "dCompDate", "dCreate", "sDescription", "bStatus", "nUsercode" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 1, 30, 5, 3, 22, 1, DateTimeKind.Utc).AddTicks(9162), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Administrador", true, 1 },
                    { 2, new DateTime(2026, 1, 30, 5, 3, 22, 1, DateTimeKind.Utc).AddTicks(9177), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Doctor", true, 1 },
                    { 3, new DateTime(2026, 1, 30, 5, 3, 22, 1, DateTimeKind.Utc).AddTicks(9179), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Paciente", true, 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthRole");
        }
    }
}
