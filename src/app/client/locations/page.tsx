"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import PageContainer from "@/src/components/pageContainer";

export default function ClientLocations() {
  const locations = [
    { id: 1, name: "Reception Area", cleaners: 2 },
    { id: 2, name: "Workstations - Floor 1", cleaners: 3 },
    { id: 3, name: "Pantry", cleaners: 1 },
    { id: 4, name: "Meeting Room A", cleaners: 1 },
  ];

  return (
    <div className="space-y-8">
      <PageContainer>
        {/* HEADER */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Locations</h2>
          <p className="text-gray-500">
            View all areas assigned for cleaning and responsible cleaners.
          </p>
        </div>

        {/* LOCATIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc) => (
            <Link
              key={loc.id}
              href={`/client/locations/${loc.id}`}
              className="p-6 bg-white shadow rounded-xl border border-gray-200 
              flex items-center gap-4 hover:shadow-md transition cursor-pointer"
            >
              <MapPin className="text-blue-600 w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{loc.name}</h3>
                <p className="text-gray-600">{loc.cleaners} Cleaners Assigned</p>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
