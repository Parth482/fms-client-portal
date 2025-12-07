"use client";

import { Star, MessageCircle, User, ClipboardList, MapPin, Image as ImageIcon } from "lucide-react";
import PageContainer from "@/src/components/pageContainer";
import Image from "next/image"; // ✅ Added next/image
import { useRouter } from "next/navigation";

export default function ClientFeedbackDetail() {
  const router = useRouter();

  // Dummy feedback entry (replace with API)
  const feedback = {
    area: "Reception Area",
    task: "Clean Reception Desk",
    cleaner: "John Doe",
    rating: 5,
    message: "Very clean and well maintained. Thank you!",
    image: "/assets/sample-cleaning.jpg",
    date: "2025-12-04 10:30 AM",
  };

  return (
    <div className="space-y-8">
      <PageContainer>

        {/* HEADER */}
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline mb-4"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-black">Feedback Details</h2>

        {/* CARD */}
        <div className="bg-white p-6 rounded-xl shadow border space-y-6">

          {/* AREA */}
          <div className="flex items-center gap-2">
            <MapPin className="text-blue-600" />
            <p className="text-xl font-semibold text-black">{feedback.area}</p>
          </div>

          {/* TASK */}
          <div className="flex items-center gap-2">
            <ClipboardList className="text-indigo-600" />
            <p className="text-black">
              Task: <span className="font-semibold">{feedback.task}</span>
            </p>
          </div>

          {/* CLEANER */}
          <div className="flex items-center gap-2">
            <User className="text-emerald-600" />
            <p className="text-black">
              Cleaner: <span className="font-semibold">{feedback.cleaner}</span>
            </p>
          </div>

          {/* RATING */}
          <div className="flex gap-1">
            {Array(feedback.rating)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-500 fill-yellow-500 w-6 h-6"
                />
              ))}
          </div>

          {/* MESSAGE */}
          <p className="text-black flex gap-2 mt-2">
            <MessageCircle className="text-blue-600 w-5 h-5" />
            {feedback.message}
          </p>

          {/* IMAGE */}
          {feedback.image && (
            <div>
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                Attached Image
              </p>

              <Image
                src={feedback.image}
                alt="Feedback image evidence"
                width={240}
                height={160}
                className="rounded-lg border shadow object-cover"
              />
            </div>
          )}

          {/* DATE */}
          <p className="text-gray-500 text-sm">Submitted on {feedback.date}</p>

        </div>

      </PageContainer>
    </div>
  );
}
