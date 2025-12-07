"use client";

import Image from "next/image";
import {
  MapPin,
  Users,
  ClipboardList,
  CalendarCheck,
  BarChart2,
  Image as ImageIcon,
} from "lucide-react";
import PageContainer from "@/src/components/pageContainer";

export default function ClientLocationDetails() {
  const location = {
    name: "Reception Area",
    address: "Building A, Ground Floor",

    cleaners: [
      {
        id: 1,
        name: "John Doe",
        rating: 4.8,
        profileImage: "/assets/cleaner-default.png",
      },
      {
        id: 2,
        name: "Maria Smith",
        rating: 4.6,
        profileImage: "/assets/cleaner-default.png",
      },
    ],

    tasksToday: 3,

    recentTasks: [
      {
        id: 1,
        title: "Clean desks & chairs",
        status: "completed",
        date: "2025-12-04",
        time: "10:00 AM",
      },
      {
        id: 2,
        title: "Disinfect entrance area",
        status: "pending",
        date: "2025-12-04",
        time: "12:00 PM",
      },
      {
        id: 3,
        title: "Glass cleaning",
        status: "in-progress",
        date: "2025-12-04",
        time: "03:00 PM",
      },
    ],

    monthlyStats: {
      completedTasks: 42,
      avgAIScore: "96%",
      cleanerAttendance: "98%",
    },

    gallery: [
      "/assets/sample-cleaning.jpg",
      "/assets/sample-cleaning.jpg",
      "/assets/sample-cleaning.jpg",
      "/assets/sample-cleaning.jpg",
    ],
  };

  return (
    <div className="space-y-8">
      <PageContainer>
        {/* HEADER */}
        <div className="flex items-center gap-4 pb-4 border-b">
          <MapPin className="text-blue-600 w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{location.name}</h1>
            <p className="text-gray-500">{location.address}</p>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Cleaners */}
          <div className="bg-white shadow-sm rounded-xl p-5 border flex items-center gap-4">
            <Users className="text-emerald-600 w-9 h-9" />
            <div>
              <p className="text-sm text-gray-500">Cleaners Assigned</p>
              <p className="text-3xl font-semibold text-gray-900">
                {location.cleaners.length}
              </p>
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white shadow-sm rounded-xl p-5 border flex items-center gap-4">
            <ClipboardList className="text-indigo-600 w-9 h-9" />
            <div>
              <p className="text-sm text-gray-500">Tasks Today</p>
              <p className="text-3xl font-semibold text-gray-900">
                {location.tasksToday}
              </p>
            </div>
          </div>

          {/* Monthly Performance */}
          <div className="bg-white shadow-sm rounded-xl p-5 border flex items-center gap-4">
            <BarChart2 className="text-purple-600 w-9 h-9" />
            <div>
              <p className="text-sm text-gray-500">Quality Score</p>
              <p className="text-3xl font-semibold text-gray-900">
                {location.monthlyStats.avgAIScore}
              </p>
            </div>
          </div>
        </div>

        {/* ASSIGNED CLEANERS */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">Assigned Cleaners</h2>
          <p className="text-gray-500 text-sm">
            View the cleaning staff responsible for this area.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {location.cleaners.map((cleaner) => (
              <div
                key={cleaner.id}
                className="p-4 bg-white border rounded-xl shadow-sm flex items-center gap-4"
              >
                <Image
                  src={cleaner.profileImage}
                  alt={`${cleaner.name} photo`}
                  width={56}
                  height={56}
                  className="rounded-full object-cover border"
                />

                <div>
                  <p className="font-semibold text-gray-900">{cleaner.name}</p>
                  <p className="text-sm text-gray-500">
                    Rating: ⭐ {cleaner.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT TASKS */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900">
            Recent Cleaning Activities
          </h2>
          <p className="text-gray-500 text-sm">
            Overview of tasks performed in this area recently.
          </p>

          <div className="mt-4 space-y-3">
            {location.recentTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-white border rounded-xl shadow-sm"
              >
                <p className="font-semibold text-gray-900">{task.title}</p>
                <p className="text-sm text-gray-500">
                  Status: {task.status} • {task.date} {task.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MONTHLY SUMMARY */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarCheck className="text-indigo-600" /> Monthly Performance
            Summary
          </h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Tasks Completed</p>
              <p className="text-3xl font-bold text-gray-900">
                {location.monthlyStats.completedTasks}
              </p>
            </div>

            <div className="p-4 bg-white border rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Cleaner Attendance</p>
              <p className="text-3xl font-bold text-gray-900">
                {location.monthlyStats.cleanerAttendance}
              </p>
            </div>

            <div className="p-4 bg-white border rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Cleaning Score</p>
              <p className="text-3xl font-bold text-gray-900">
                {location.monthlyStats.avgAIScore}
              </p>
            </div>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ImageIcon className="text-blue-600" /> Cleaning Gallery
          </h2>
          <p className="text-gray-500 text-sm">
            Images from recent cleaning sessions.
          </p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {location.gallery.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`Cleaning gallery image ${i + 1}`}
                width={400}
                height={300}
                className="rounded-xl border shadow-sm object-cover h-32 w-full hover:scale-105 duration-200"
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
