import html2canvas from "html2canvas-pro";

export async function downloadAsImage(
  element: HTMLElement,
  filename: string = "spendwise-summary.png"
) {
  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2, // Retina quality
    useCORS: true,
    logging: false,
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
