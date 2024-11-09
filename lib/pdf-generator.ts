import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { StrategyData, ProfitScenario } from "./types";

export function generatePDF(data: StrategyData, scenarios: ProfitScenario[]) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text("Dogecoin Strategy Report", 20, 20);

  // Basic Info
  doc.setFontSize(12);
  doc.text(`Total DOGE Amount: ${data.dogeAmount.toLocaleString()}`, 20, 35);

  // Strategy Table
  const tableData = scenarios.map((scenario, index) => [
    `Tier ${index + 1}`,
    `${data.tiers[index].percentage}%`,
    `$${data.tiers[index].price}`,
    `${data.tiers[index].stopLoss}%`,
    `$${scenario.bestCase.toLocaleString()}`,
    `$${scenario.worstCase.toLocaleString()}`,
    `${scenario.probability}%`,
  ]);

  autoTable(doc, {
    head: [["Tier", "Percentage", "Target Price", "Stop Loss", "Best Case", "Worst Case", "Probability"]],
    body: tableData,
    startY: 45,
  });

  // Summary
  const totalBestCase = scenarios.reduce((sum, scenario) => sum + scenario.bestCase, 0);
  const totalWorstCase = scenarios.reduce((sum, scenario) => sum + scenario.worstCase, 0);

  doc.text("Summary", 20, doc.lastAutoTable.finalY + 20);
  doc.text(`Total Best Case: $${totalBestCase.toLocaleString()}`, 20, doc.lastAutoTable.finalY + 30);
  doc.text(`Total Worst Case: $${totalWorstCase.toLocaleString()}`, 20, doc.lastAutoTable.finalY + 40);

  // Save the PDF
  doc.save("dogecoin-strategy.pdf");
}