"use client";

import Link from "next/link";
import { UserCheck } from "lucide-react";
import PageContainer from "@/src/components/pageContainer";

export default function ClientAttendance() {
  // DAILY ATTENDANCE (dummy example)
  const attendance = [
    { id: "cleaner-john", name: "Cleaner John", time: "9:00 AM", status: "Present" },
    { id: "cleaner-maria", name: "Cleaner Maria", time: "9:15 AM", status: "Late" },
    { id: "cleaner-leo", name: "Cleaner Leo", time: "-", status: "Absent" },
  ];

  return (
    <div className="space-y-8">
      <PageContainer>

        <h2 className="text-3xl font-bold text-black">Attendance</h2>
        <p className="text-gray-600">Daily attendance of assigned cleaners.</p>

        <div className="space-y-4 mt-4">
          {attendance.map((entry) => (
            <Link
              key={entry.id}
              href={`/client/attendance/${entry.id}`}
              className="block"
            >
              <div className="p-6 bg-white shadow rounded-xl border border-gray-200 flex justify-between items-center hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <UserCheck className="w-7 h-7 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {entry.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Check-in: {entry.time}
                    </p>
                  </div>
                </div>

                <span
                  className={`font-bold ${
                    entry.status === "Present"
                      ? "text-green-600"
                      : entry.status === "Late"
                      ? "text-orange-500"
                      : "text-red-600"
                  }`}
                >
                  {entry.status}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </PageContainer>
    </div>
  );
}
