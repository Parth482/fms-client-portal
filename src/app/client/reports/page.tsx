"use client";

import { FileText } from "lucide-react";
import PageContainer from "@/src/components/pageContainer";
import jsPDF from "jspdf";

type ReportId = "weekly" | "ai-quality" | "complaints";

interface ReportConfig {
  id: ReportId;
  title: string;
  dateRange: string;
  description: string;
}

// Dummy base data used inside PDF
const baseKpis = {
  totalTasks: 42,
  completedTasks: 38,
  missedTasks: 4,
  avgAIScore: 96,
  avgRating: 4.7,
};

const cleanerPerformance = [
  {
    name: "John Doe",
    tasksCompleted: 18,
    attendance: "100%",
    avgRating: 4.9,
  },
  {
    name: "Maria Smith",
    tasksCompleted: 15,
    attendance: "95%",
    avgRating: 4.6,
  },
  {
    name: "Alex Johnson",
    tasksCompleted: 9,
    attendance: "90%",
    avgRating: 4.4,
  },
];

const issues = [
  {
    area: "Pantry",
    severity: "Medium",
    description: "Coffee spill left on countertop during morning shift.",
  },
  {
    area: "Reception",
    severity: "Low",
    description: "Minor dust near brochure stand noticed by client.",
  },
  {
    area: "Meeting Room A",
    severity: "High",
    description: "Trash not cleared after late-night meeting.",
  },
];

const reports: ReportConfig[] = [
  {
    id: "weekly",
    title: "Weekly Cleaning Summary",
    dateRange: "Dec 1 - Dec 7, 2025",
    description:
      "Overview of cleaning performance, task completion and issues for the selected week.",
  },
  {
    id: "ai-quality",
    title: "AI Quality Score Report",
    dateRange: "This Month",
    description:
      "Breakdown of cleanliness scores and automated quality checks across locations.",
  },
  {
    id: "complaints",
    title: "Complaint & Feedback Report",
    dateRange: "Last 30 Days",
    description:
      "Summary of complaints, feedback and resolutions across all serviced locations.",
  },
];

// --------- PDF HELPERS ----------

const addSectionTitle = (doc: jsPDF, text: string, y: number): number => {
  doc.setFontSize(13);
  doc.setTextColor(40, 40, 40);
  doc.text(text, 14, y);
  doc.setDrawColor(200, 200, 200);
  doc.line(14, y + 2, 196, y + 2);
  return y + 10;
};

const drawSimpleBarChart = (doc: jsPDF, startY: number): number => {
  const baseX = 20;
  const baseY = startY + 40;
  const barWidth = 18;

  // Axes
  doc.setDrawColor(120, 120, 120);
  doc.line(baseX, startY + 5, baseX, baseY);
  doc.line(baseX, baseY, 190, baseY);

  const data = [
    { label: "Reception", value: 16 },
    { label: "Pantry", value: 10 },
    { label: "Lobby", value: 9 },
    { label: "Meeting", value: 7 },
  ];

  let currentX = baseX + 10;
  doc.setFontSize(9);

  data.forEach((item) => {
    const height = item.value * 2;

    doc.setFillColor(54, 162, 235);
    doc.rect(currentX, baseY - height, barWidth, height, "F");

    doc.text(item.label, currentX, baseY + 5);

    currentX += barWidth + 8;
  });

  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text("Tasks Completed per Area", baseX, startY);

  return baseY + 10;
};

const drawSimplePieLegend = (doc: jsPDF, startY: number): number => {
  const y = startY;

  const slices = [
    { label: "Completed on time", value: "78%", color: [46, 204, 113] },
    { label: "Completed late", value: "14%", color: [241, 196, 15] },
    { label: "Missed", value: "8%", color: [231, 76, 60] },
  ];

  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text("Task Outcome Breakdown", 120, y);

  let rowY = y + 8;

  slices.forEach((slice) => {
    doc.setFillColor(slice.color[0], slice.color[1], slice.color[2]);
    doc.rect(120, rowY - 4, 6, 6, "F");

    doc.setTextColor(60, 60, 60);
    doc.text(`${slice.label} - ${slice.value}`, 130, rowY);

    rowY += 7;
  });

  return rowY + 4;
};

const generatePDF = (report: ReportConfig) => {
  const doc = new jsPDF();

  // HEADER
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Facility Cleaning Report", 14, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(report.title, 14, 26);
  doc.text(`Period: ${report.dateRange}`, 14, 32);

  doc.line(14, 36, 196, 36);

  let y = 44;

  // SECTION 1: Overview KPIs
  y = addSectionTitle(doc, "1. Overview KPIs", y);

  doc.setFontSize(11);
  doc.text(`Total Tasks: ${baseKpis.totalTasks}`, 18, y);
  y += 6;
  doc.text(`Completed Tasks: ${baseKpis.completedTasks}`, 18, y);
  y += 6;
  doc.text(`Missed Tasks: ${baseKpis.missedTasks}`, 18, y);
  y += 6;
  doc.text(`Average AI Quality Score: ${baseKpis.avgAIScore}%`, 18, y);
  y += 6;
  doc.text(`Average Feedback Rating: ${baseKpis.avgRating.toFixed(1)} / 5`, 18, y);
  y += 10;

  // SECTION 2: Visual Summary
  y = addSectionTitle(doc, "2. Visual Summary (Charts)", y);

  y = drawSimpleBarChart(doc, y);
  y = drawSimplePieLegend(doc, y);

  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  // SECTION 3: Cleaner Performance
  y = addSectionTitle(doc, "3. Cleaner Performance", y);

  cleanerPerformance.forEach((cleaner) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.text(cleaner.name, 18, y);
    doc.text(
      `Tasks: ${cleaner.tasksCompleted} | Attendance: ${cleaner.attendance} | Rating: ${cleaner.avgRating.toFixed(1)}/5`,
      18,
      y + 6
    );

    y += 12;
  });

  // SECTION 4: Issues
  if (y > 230) {
    doc.addPage();
    y = 20;
  }

  y = addSectionTitle(doc, "4. Issues & Observations", y);

  issues.forEach((issue) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.text(`${issue.area} — Severity: ${issue.severity}`, 18, y);
    doc.text(issue.description, 18, y + 6);

    y += 12;
  });

  doc.save(`${report.title}.pdf`);
};

export default function ClientReports() {
  return (
    <div className="space-y-8">
      <PageContainer>
        <h2 className="text-3xl font-bold text-gray-800">Reports</h2>
        <p className="text-gray-500">
          Download weekly cleaning, task summaries, and performance reports.
        </p>

        <div className="space-y-4 mt-4">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="p-6 bg-white shadow rounded-xl border flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-purple-600" />

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {rep.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{rep.dateRange}</p>
                  <p className="text-gray-600 text-sm mt-1">{rep.description}</p>
                </div>
              </div>

              <button
                onClick={() => generatePDF(rep)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
