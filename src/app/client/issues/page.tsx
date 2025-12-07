/*"use client";

import { AlertTriangle } from "lucide-react";
import PageContainer from "@/src/components/pageContainer";

type IssueStatus = "Pending" | "Resolved";

interface Issue {
  issue: string;
  status: IssueStatus;
  date: string;
}

export default function ClientIssues() {
  const issues: Issue[] = [
    { issue: "Pantry floor wet", status: "Pending", date: "Today, 10:15 AM" },
    { issue: "Dust on workstation area", status: "Resolved", date: "Yesterday" },
  ];

  const statusColor: Record<IssueStatus, string> = {
    Pending: "text-red-600",
    Resolved: "text-green-600",
  };

  return (
    <div className="space-y-8">
      <PageContainer>
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Issues</h2>
        <p className="text-gray-500">View unresolved and resolved cleaning issues.</p>
      </div>

      <div className="space-y-4">
        {issues.map((item, i) => (
          <div
            key={i}
            className="p-6 bg-white shadow rounded-xl border border-gray-200 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="font-semibold text-gray-800">{item.issue}</h3>
                <p className="text-gray-500 text-sm">{item.date}</p>
              </div>
            </div>

            <span className={`font-bold ${statusColor[item.status]}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
      </PageContainer>
    </div>
  );
}*/
