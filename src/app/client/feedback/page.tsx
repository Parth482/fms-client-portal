"use client";

import { Star, MessageCircle, PlusCircle } from "lucide-react";
import PageContainer from "@/src/components/pageContainer";
import Link from "next/link";

export default function ClientFeedback() {
  const feedbackList = [
    {
      id: 1,
      area: "Reception Area",
      message: "Very clean and well maintained.",
      rating: 5,
      date: "Today",
    },
    {
      id: 2,
      area: "Pantry",
      message: "Needs improvement.",
      rating: 3,
      date: "Yesterday",
    },
  ];

  return (
    <div className="space-y-8">
      <PageContainer>
        {/* HEADER + BUTTON */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-black">Feedback</h2>
            <p className="text-gray-600">View and submit feedback for cleaning services.</p>
          </div>

          <Link
            href="/client/feedback/create"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <PlusCircle size={20} />
            Send Feedback
          </Link>
        </div>

        {/* FEEDBACK LIST */}
        <div className="space-y-6">
          {feedbackList.map((fb) => (
            <Link
              href={`/client/feedback/${fb.id}`}
              key={fb.id}
              className="block cursor-pointer"
            >
              <div className="p-6 bg-white shadow rounded-xl border border-gray-200 hover:bg-gray-50 transition">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-black">{fb.area}</h3>
                  <p className="text-gray-500">{fb.date}</p>
                </div>

                <p className="text-black flex items-center gap-2 mt-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  {fb.message}
                </p>

                <div className="flex gap-1 mt-3">
                  {Array(fb.rating)
                    .fill(0)
                    .map((_, index) => (
                      <Star
                        key={index}
                        className="text-yellow-500 w-5 h-5 fill-yellow-500"
                      />
                    ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
