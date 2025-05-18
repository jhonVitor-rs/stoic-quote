import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { RefObject } from "react";

type props = {
  cardRef: RefObject<HTMLDivElement | null>;
};

export async function handelSavePdfFile({ cardRef }: props) {
  if (!cardRef.current) return;

  try {
    const fixColors = (element: HTMLElement) => {
      const allElements = element.querySelectorAll("*");

      allElements.forEach((el) => {
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        const color = style.color;

        if (bgColor.includes("oklab") || bgColor.includes("oklch")) {
          (el as HTMLElement).style.backgroundColor = "#FFFFFF";
        }

        if (color.includes("oklab") || color.includes("oklch")) {
          (el as HTMLElement).style.color = "#000000";
        }

        (el as HTMLElement).style.boxShadow = "none";
        (el as HTMLElement).style.textShadow = "none";

        (el as HTMLElement).style.transition = "none";
        (el as HTMLElement).style.animation = "none";
      });
    };

    const tempElement = cardRef.current.cloneNode(true) as HTMLElement;
    tempElement.style.padding = "20px";
    tempElement.style.width = "595px";
    tempElement.style.backgroundColor = "#FFFFFF";
    tempElement.style.color = "#000000";

    fixColors(tempElement);

    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "-9999px";
    tempContainer.appendChild(tempElement);
    document.body.appendChild(tempContainer);

    const canvas = await html2canvas(tempElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#FFFFFF",
      removeContainer: true,
      onclone: (document, element) => {
        fixColors(element);
      },
    });

    document.body.removeChild(tempContainer);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const canvasRatio = canvas.width / canvas.height;
    const pageRatio = pdfWidth / pdfHeight;

    let imgWidth, imgHeight;

    if (canvasRatio > pageRatio) {
      imgWidth = pdfWidth - 20;
      imgHeight = imgWidth / canvasRatio;
    } else {
      imgHeight = pdfHeight - 20;
      imgWidth = imgHeight * canvasRatio;
    }

    const x = (pdfWidth - imgWidth) / 2;
    const y = 10;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

    const dateString = "dd/mm/yyyy";

    pdf.save(`Registro - ${dateString}.pdf`);
  } catch (error) {
    console.error("Erro ao gerar PDF: ", error);
    alert("Ocorreu um erro ao gerar PDF. Por favor, tente novamente");
  }
}
