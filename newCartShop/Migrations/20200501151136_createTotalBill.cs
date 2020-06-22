using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace newCartShop.API.Migrations
{
    public partial class createTotalBill : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TotalBills",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    dateAdd = table.Column<DateTime>(nullable: false),
                    SumTotal = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TotalBills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubBills",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TotlBillId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    Quantity = table.Column<double>(nullable: false),
                    price = table.Column<double>(nullable: false),
                    TotalBillId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubBills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubBills_TotalBills_TotalBillId",
                        column: x => x.TotalBillId,
                        principalTable: "TotalBills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubBills_TotalBillId",
                table: "SubBills",
                column: "TotalBillId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubBills");

            migrationBuilder.DropTable(
                name: "TotalBills");
        }
    }
}
