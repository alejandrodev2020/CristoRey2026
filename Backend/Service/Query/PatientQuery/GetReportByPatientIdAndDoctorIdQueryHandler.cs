using MediatR;
using PdfSharp.Drawing;
using PdfSharp.Pdf;
using Service.Models.Patient;

namespace Service.Query.PatientQuery
{
    public class GetReportByPatientIdAndDoctorIdQueryHandler
        : IRequestHandler<GetReportByPatientIdAndDoctorIdQuery, byte[]>
    {
        private readonly IPatientQueryRepository _repository;

        public GetReportByPatientIdAndDoctorIdQueryHandler(IPatientQueryRepository repository)
        {
            _repository = repository;
        }

        public Task<byte[]> Handle(GetReportByPatientIdAndDoctorIdQuery request, CancellationToken cancellationToken)
        {
            // ======================================================
            // 📥 Datos
            // ======================================================
            var records = _repository
                .GetListClinicalHistoryByPatientId(request.PatientId, request.DoctorId)
                ?.ToList();

            if (records == null || records.Count == 0)
                throw new Exception("No existen registros clínicos.");

            var patient = records[0].Patient;
            var doctor = records[0].Doctor;

            // ======================================================
            // 📄 Documento
            // ======================================================
            var pdf = new PdfDocument();
            pdf.Info.Title = "Historia Clínica";

            var page = pdf.AddPage();
            page.Width = XUnit.FromMillimeter(216);
            page.Height = XUnit.FromMillimeter(279);

            var gfx = XGraphics.FromPdfPage(page);

            // ======================================================
            // 🔤 Fuentes
            // ======================================================
            var fontTitle = new XFont("Verdana", 11, XFontStyleEx.Bold);
            var fontBold = new XFont("Verdana", 8, XFontStyleEx.Bold);
            var fontNormal = new XFont("Verdana", 8, XFontStyleEx.Regular);
            var fontSmall = new XFont("Verdana", 7, XFontStyleEx.Regular);

            // ======================================================
            // 📐 Layout
            // ======================================================
            double marginLeft = XUnit.FromMillimeter(15);
            double marginRight = XUnit.FromMillimeter(15);
            double currentY = XUnit.FromCentimeter(2);
            double rowHeight = XUnit.FromCentimeter(0.6);
            double usableWidth = page.Width - marginLeft - marginRight;

            string printDate = DateTime.Now.ToString("dd/MM/yyyy HH:mm");

            // ======================================================
            // 🧾 HEADER (con margen y esquinas redondeadas)
            // ======================================================
            void DrawHeader()
            {
                // 🔲 Contenedor del header
                double headerX = marginLeft;
                double headerY = XUnit.FromCentimeter(0.4);
                double headerWidth = usableWidth;
                double headerHeight = XUnit.FromCentimeter(3.8);
                double radius = 10;

                var headerBorderPen = new XPen(XColors.LightGray, 0.8);
                var headerFillBrush = new XSolidBrush(XColor.FromArgb(245, 245, 245));

                gfx.DrawRoundedRectangle(
                    new XSolidBrush(XColor.FromArgb(245, 245, 245)),
                    headerX,
                    headerY,
                    headerWidth,
                    headerHeight,
                    radius,
                    radius
                );

                // 🔹 Logo clínica (izquierda)
                string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";
                string logoComerce = Environment.GetEnvironmentVariable("LOGO_COMERCE");
                string imagePath = GetImagePath(environment, logoComerce);

                double contentTopY = headerY + XUnit.FromCentimeter(0.4);

                if (!string.IsNullOrWhiteSpace(imagePath))
                {
                    try
                    {
                        if (File.Exists(imagePath))
                        {
                            using var logo = XImage.FromFile(imagePath);

                            double logoWidth = XUnit.FromCentimeter(1.5);
                            double logoHeight = logo.PixelHeight * logoWidth / logo.PixelWidth;

                            gfx.DrawImage(
                                logo,
                                headerX + XUnit.FromCentimeter(0.4),
                                contentTopY,
                                logoWidth,
                                logoHeight
                            );
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"[PDF] Error cargando logo: {ex.Message}");
                    }
                }

                // 📅 Fecha impresión (derecha, dentro del header)
                gfx.DrawString(
                    $"Fecha impresión: {printDate}",
                    fontSmall,
                    XBrushes.Black,
                    headerX + headerWidth - XUnit.FromCentimeter(0.4),
                    contentTopY,
                    XStringFormats.TopRight
                );

                // 🏷️ Título (subido un poco)
                gfx.DrawString(
                    "HISTORIA CLÍNICA",
                    fontTitle,
                    XBrushes.Black,
                    page.Width / 2,
                    headerY + XUnit.FromCentimeter(1.4),
                    XStringFormats.Center
                );

                // 👤 Datos paciente / doctor
                double dataY = headerY + XUnit.FromCentimeter(2.4);

                gfx.DrawString("Paciente:", fontBold, XBrushes.Black, headerX + XUnit.FromCentimeter(0.4), dataY);
                gfx.DrawString(
                    $"{patient.FirstName} {patient.LastName}",
                    fontNormal,
                    XBrushes.Black,
                    headerX + XUnit.FromCentimeter(2.8),
                    dataY
                );

                dataY += XUnit.FromCentimeter(0.5);

                gfx.DrawString("Doctor:", fontBold, XBrushes.Black, headerX + XUnit.FromCentimeter(0.4), dataY);
                gfx.DrawString(
                    $"{doctor.FirstName} {doctor.LastName}",
                    fontNormal,
                    XBrushes.Black,
                    headerX + XUnit.FromCentimeter(2.8),
                    dataY
                );

                // ⬇️ Posición donde empieza el body
                currentY = headerY + headerHeight + XUnit.FromCentimeter(0.6);
            }

            // ======================================================
            // 📋 BODY (cards tipo bootstrap)
            // ======================================================
            void DrawCard(ClinicalHistoryModel item)
            {
                double cardX = marginLeft;
                double cardWidth = usableWidth;
                double cardPadding = XUnit.FromCentimeter(0.4);
                double cardRadius = 10;

                // Altura dinámica básica de la card
                double cardHeight = XUnit.FromCentimeter(3.2);

                // 🔲 Card contenedor (fondo + borde)
                gfx.DrawRoundedRectangle(
                    new XPen(XColor.FromArgb(210, 210, 210), 0.8),
                    new XSolidBrush(XColor.FromArgb(255, 255, 255)),
                    cardX,
                    currentY,
                    cardWidth,
                    cardHeight,
                    cardRadius,
                    cardRadius
                );

                double contentX = cardX + cardPadding;
                double contentY = currentY + cardPadding;

                // 🏷️ Título
                gfx.DrawString(
                    "Cita Clínica",
                    fontBold,
                    XBrushes.Black,
                    contentX,
                    contentY
                );

                contentY += XUnit.FromCentimeter(0.5);

                // ────────────── ROW 1 (6 / 6) ──────────────
                double colHalf = cardWidth / 2;

                // Motivo (izquierda)
                gfx.DrawString("Motivo:", fontBold, XBrushes.Black, contentX, contentY);
                gfx.DrawString(
                    item.Motive ?? "-",
                    fontNormal,
                    XBrushes.Black,
                    contentX + XUnit.FromCentimeter(1.8),
                    contentY
                );

                // Fecha (derecha)
                gfx.DrawString(
                    "Fecha:",
                    fontBold,
                    XBrushes.Black,
                    cardX + colHalf + cardPadding,
                    contentY
                );
                gfx.DrawString(
                    item.DateQuery.ToString("dd/MM/yyyy HH:mm"),
                    fontNormal,
                    XBrushes.Black,
                    cardX + colHalf + cardPadding + XUnit.FromCentimeter(1.5),
                    contentY
                );

                contentY += XUnit.FromCentimeter(0.5);

                // ────────────── ROW 2 (6 / 6) ──────────────
                gfx.DrawString("Diagnóstico:", fontBold, XBrushes.Black, contentX, contentY);
                gfx.DrawString(
                    item.Diagnostic ?? "-",
                    fontNormal,
                    XBrushes.Black,
                    contentX + XUnit.FromCentimeter(2.6),
                    contentY
                );

                // Estado (derecha)
                string statusText = item.StatusId switch
                {
                    1 => "Pendiente",
                    2 => "Aceptado",
                    3 => "Rechazado",
                    _ => "Desconocido"
                };

                gfx.DrawString(
                    "Estado:",
                    fontBold,
                    XBrushes.Black,
                    cardX + colHalf + cardPadding,
                    contentY
                );
                gfx.DrawString(
                    statusText,
                    fontNormal,
                    XBrushes.Black,
                    cardX + colHalf + cardPadding + XUnit.FromCentimeter(1.5),
                    contentY
                );

                contentY += XUnit.FromCentimeter(0.6);

                // ────────────── ROW 3 (12 columnas) ──────────────
                gfx.DrawString("Observaciones:", fontBold, XBrushes.Black, contentX, contentY);

                contentY += XUnit.FromCentimeter(0.4);

                gfx.DrawString(
                    item.Observations ?? "-",
                    fontNormal,
                    XBrushes.Black,
                    new XRect(
                        contentX,
                        contentY,
                        cardWidth - cardPadding * 2,
                        XUnit.FromCentimeter(1)
                    ),
                    XStringFormats.TopLeft
                );

                // ⬇️ Separación entre cards
                currentY += cardHeight + XUnit.FromCentimeter(0.4);
            }

            // ======================================================
            // 🦶 FOOTER
            // ======================================================
            void DrawFooter()
            {
                gfx.DrawLine(
                    XPens.LightGray,
                    marginLeft,
                    page.Height - XUnit.FromCentimeter(2),
                    page.Width - marginRight,
                    page.Height - XUnit.FromCentimeter(2));

                gfx.DrawString(
                    "Documento generado automáticamente por el sistema",
                    fontSmall,
                    XBrushes.Black,
                    marginLeft,
                    page.Height - XUnit.FromCentimeter(1.5));

                gfx.DrawString(
                    "Página 1",
                    fontSmall,
                    XBrushes.Black,
                    page.Width - marginRight,
                    page.Height - XUnit.FromCentimeter(1.5),
                    XStringFormats.TopRight);
            }

            // ======================================================
            // ▶ EJECUCIÓN
            // ======================================================
            DrawHeader();
            foreach (var item in records)
            {
                DrawCard(item);
            }

            DrawFooter();

            // ======================================================
            // 💾 Resultado
            // ======================================================
            using var ms = new MemoryStream();
            pdf.Save(ms);
            return Task.FromResult(ms.ToArray());
        }

        private string GetImagePath(string environment, string imageName)
        {
            string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
            if (environment == "Development")
            {
                string[] pathParts = baseDirectory.Split('\\');
                int backEndIndex = Array.IndexOf(pathParts, "back-end");

                if (backEndIndex != -1)
                {
                    return Path.Combine(string.Join("\\", pathParts.Take(backEndIndex + 1)), "Resources", "assets", "images", imageName);
                }
                throw new Exception("La carpeta 'back-end' no se encontró en la ruta base en el entorno local.");
            }
            return Path.Combine(baseDirectory, "Resources", "assets", "images", imageName);
        }

    }
}
