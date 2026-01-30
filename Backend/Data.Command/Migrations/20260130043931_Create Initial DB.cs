using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Command.Migrations
{
    /// <inheritdoc />
    public partial class CreateInitialDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuthUser",
                columns: table => new
                {
                    nAuthUserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    sFirstName = table.Column<string>(type: "text", nullable: false),
                    sLastName = table.Column<string>(type: "text", nullable: true),
                    sPhone = table.Column<string>(type: "text", nullable: true),
                    sCi = table.Column<string>(type: "text", nullable: true),
                    sNit = table.Column<string>(type: "text", nullable: true),
                    fAvatar = table.Column<byte[]>(type: "bytea", nullable: true),
                    sUserName = table.Column<string>(type: "text", nullable: false),
                    sUserKey = table.Column<string>(type: "text", nullable: false),
                    bIsAdmin = table.Column<bool>(type: "boolean", nullable: true),
                    nAuthRoleId = table.Column<int>(type: "integer", nullable: true),
                    bIsActive = table.Column<bool>(type: "boolean", nullable: false),
                    nUsercode = table.Column<int>(type: "integer", nullable: false),
                    dCreate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dCompDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    bStatus = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthUser", x => x.nAuthUserId);
                });

            migrationBuilder.CreateTable(
                name: "AuthUserConfiguration",
                columns: table => new
                {
                    nAuthUserConfigurationId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nAuthUserId = table.Column<int>(type: "integer", nullable: false),
                    bAllItemsSale = table.Column<bool>(type: "boolean", nullable: false),
                    nCountItemsSale = table.Column<int>(type: "integer", nullable: true),
                    bPrintNoteSale = table.Column<bool>(type: "boolean", nullable: true),
                    bAllItemsShopping = table.Column<bool>(type: "boolean", nullable: true),
                    nCountItemsShopping = table.Column<int>(type: "integer", nullable: true),
                    bPrintNoteShopping = table.Column<bool>(type: "boolean", nullable: true),
                    bIsActive = table.Column<bool>(type: "boolean", nullable: true),
                    AuthUserId1 = table.Column<int>(type: "integer", nullable: true),
                    nUsercode = table.Column<int>(type: "integer", nullable: false),
                    dCreate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dCompDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    bStatus = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthUserConfiguration", x => x.nAuthUserConfigurationId);
                    table.ForeignKey(
                        name: "FK_AuthUserConfiguration_AuthUser_AuthUserId1",
                        column: x => x.AuthUserId1,
                        principalTable: "AuthUser",
                        principalColumn: "nAuthUserId");
                    table.ForeignKey(
                        name: "FK_AuthUserConfiguration_AuthUser_nAuthUserId",
                        column: x => x.nAuthUserId,
                        principalTable: "AuthUser",
                        principalColumn: "nAuthUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AuthUser",
                columns: new[] { "nAuthUserId", "nAuthRoleId", "fAvatar", "sCi", "dCompDate", "dCreate", "sFirstName", "bIsActive", "bIsAdmin", "sLastName", "sNit", "sPhone", "bStatus", "nUsercode", "sUserKey", "sUserName" },
                values: new object[,]
                {
                    { 1, 1, null, "12890978", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Favian Alejandro", true, true, "Avila Mancilla", "12890978018", "67394939", false, 0, "jtgmad1wp", "kuper" },
                    { 2, 1, null, "User Ci", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Usuario", true, true, "Defecto", "Client Nit", "", false, 0, "123456", "admin" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuthUserConfiguration_AuthUserId1",
                table: "AuthUserConfiguration",
                column: "AuthUserId1",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuthUserConfiguration_nAuthUserId",
                table: "AuthUserConfiguration",
                column: "nAuthUserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthUserConfiguration");

            migrationBuilder.DropTable(
                name: "AuthUser");
        }
    }
}
