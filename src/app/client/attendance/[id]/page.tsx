"use client";

import PageContainer from "@/src/components/pageContainer";
import Image from "next/image"; 
import { ChevronLeft, Clock, MapPin } from "lucide-react"; 
import { useRouter } from "next/navigation";

export default function AttendanceDetailPage() {
  const router = useRouter();

  const attendance = {
    cleaner: {
      name: "Cleaner John",
      image: "/assets/cleaner-default.png",
      locations: ["Reception Area", "Lobby Area"],
    },
    status: "Present",
    checkIn: "9:00 AM",
    checkOut: "5:15 PM",
    distanceFromSite: "12 meters",

    summary: {
      totalTasks: 5,
      completedTasks: 5,
      completedSubTasks: 20,
      overallPerformance: "Excellent",
      remarks: "All assigned areas were cleaned and maintained properly.",
    },
  };

  const statusColor =
    attendance.status === "Present"
      ? "text-green-600"
      : attendance.status === "Late"
      ? "text-orange-500"
      : "text-red-500";

  return (
    <div className="space-y-8">
      <PageContainer>
        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 hover:text-black"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-4 mt-4">
          <Image
            src={attendance.cleaner.image}
            alt="Cleaner profile image"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full border object-cover"
          />

          <div>
            <h1 className="text-2xl font-semibold text-black">
              {attendance.cleaner.name}
            </h1>
            <p className="text-sm text-gray-600">Assigned Cleaner</p>
          </div>
        </div>

        {/* STATUS CARD */}
        <div className="bg-white p-6 border shadow rounded-xl mt-6">
          <p className="text-sm text-gray-500">Attendance Status</p>
          <p className={`text-xl font-bold mt-1 ${statusColor}`}>
            {attendance.status}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-600" />
              <div>
                <p className="text-gray-600 text-sm">Check-in</p>
                <p className="text-black font-medium">{attendance.checkIn}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-indigo-600" />
              <div>
                <p className="text-gray-600 text-sm">Check-out</p>
                <p className="text-black font-medium">{attendance.checkOut}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-emerald-600" />
              <div>
                <p className="text-gray-600 text-sm">Distance from Site</p>
                <p className="text-black font-medium">
                  {attendance.distanceFromSite}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT WORK SUMMARY */}
        <div className="bg-white p-6 border shadow rounded-xl mt-6">
          <h2 className="text-xl font-semibold text-black mb-3">
            Recent Work Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-600">Total Tasks Today</p>
              <p className="text-2xl font-bold text-black">
                {attendance.summary.totalTasks}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-600">Completed Tasks</p>
              <p className="text-2xl font-bold text-black">
                {attendance.summary.completedTasks}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-600">Recently Completed Subtasks</p>
              <p className="text-xl font-bold text-emerald-600">
                {attendance.summary.completedSubTasks}
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
