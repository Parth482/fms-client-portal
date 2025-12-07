"use client";

import { UserCheck, MapPinned, Sparkles, AlertTriangle, ChevronDown } from "lucide-react";

export default function ClientDashboard() {
  const kpis = [
    {
      label: "Assigned cleaners",
      value: 6,
      sub: "Across all your locations",
      subColor: "text-gray-400",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-700",
      icon: UserCheck,
    },
    {
      label: "Areas cleaned today",
      value: 18,
      sub: "+5 vs yesterday",
      subColor: "text-emerald-600",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-700",
      icon: MapPinned,
    },
    {
      label: "Today’s quality score",
      value: "92%",
      sub: "+2% vs last week",
      subColor: "text-emerald-600",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-700",
      icon: Sparkles,
    },
    {
      label: "Open issues",
      value: 3,
      sub: "2 in pantry, 1 in lobby",
      subColor: "text-red-500",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-700",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="text-gray-500 text-sm md:text-base">
                Overview of cleaning quality, progress and issues for your on-site locations.
              </p>
            </div>

            <button className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">
              This week
              <ChevronDown size={12} />
            </button>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-gray-200 bg-white shadow-sm px-4 py-3 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-xs font-medium text-gray-500">
                      {item.label}
                    </p>
                    <span
                      className={`inline-flex items-center justify-center rounded-md ${item.iconBg} ${item.iconColor} p-1.5`}
                    >
                      <Icon size={16} />
                    </span>
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold text-gray-900">
                    {item.value}
                  </p>
                  <p className={`text-xs ${item.subColor}`}>{item.sub}</p>
                </div>
              );
            })}
          </div>

          {/* Middle row: cleaning summary + AI insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left: summary */}
            <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm p-4 md:p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Today’s cleaning summary
              </h3>

              <ul className="space-y-2 text-sm text-gray-700">
                <li>✔ Reception cleaned at 9:15 AM</li>
                <li>✔ Workstations sanitized at 10:00 AM</li>
                <li>✔ Meeting Room A cleaned at 11:30 AM</li>
                <li>⚠ Pantry floor wet — rework in progress</li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 md:p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Cleaning insights
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Reception and lobby scored above 95% cleanliness.</li>
                <li>✓ Washrooms improved compared to last week.</li>
                <li>⚠ Dust detected near pantry bins in last inspection.</li>
              </ul>
            </div>
          </div>

          {/* Bottom row: recent issues */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 md:p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Recent issues & complaints
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Wet pantry floor – rework in progress.</li>
              <li>• Fingerprints on glass door – resolved.</li>
              <li>• Trash not collected in Cabin 402 – resolved.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
