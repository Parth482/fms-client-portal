"use client";

import { useState } from "react";
import {
  Star,
  ChevronLeft,
  MessageCircle,
  ImagePlus,
  Trash2,
  ListChecks,
  User,
  MapPin
} from "lucide-react";
import PageContainer from "@/src/components/pageContainer";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ------------------------------
// TYPES
// ------------------------------
interface Cleaner {
  id: string;
  name: string;
}

interface Task {
  id: string;
  title: string;
  cleaner: Cleaner;
  subtasks: string[];
}

interface Location {
  id: string;
  name: string;
  tasks: Task[];
}

export default function ClientFeedbackCreate() {
  const router = useRouter();

  // ------------------------------
  // STATIC DATA (DUMMY FOR NOW)
  // ------------------------------
  const locations: Location[] = [
    {
      id: "loc001",
      name: "Reception Area",
      tasks: [
        {
          id: "task101",
          title: "Clean Reception Desk",
          cleaner: { id: "cleaner001", name: "John Doe" },
          subtasks: ["Wipe desk", "Sanitize phone", "Dust decor"]
        },
        {
          id: "task102",
          title: "Disinfect Entrance Glass",
          cleaner: { id: "cleaner002", name: "Maria Smith" },
          subtasks: ["Spray sanitizer", "Wipe glass", "Polish edges"]
        }
      ]
    },
    {
      id: "loc002",
      name: "Pantry",
      tasks: [
        {
          id: "task201",
          title: "Deep Clean Countertops",
          cleaner: { id: "cleaner003", name: "Alex Johnson" },
          subtasks: ["Remove stains", "Wipe spills", "Organize items"]
        }
      ]
    }
  ];

  // ------------------------------
  // STATES
  // ------------------------------
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  // ------------------------------
  // IMAGE UPLOAD
  // ------------------------------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  // ------------------------------
  // SUBMIT HANDLER
  // ------------------------------
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedLocation || !selectedTask || !rating || !message.trim()) {
      alert("Please complete all fields.");
      return;
    }

    const payload = {
      task: selectedTask.id,
      cleaner: selectedTask.cleaner.id,
      rating,
      note: message,
      image: image ? "dummy-upload-url.jpg" : null
    };

    console.log("FINAL PAYLOAD:", payload);

    alert("Feedback submitted (demo). Redirecting...");
    router.push("/client/feedback");
  };

  return (
    <div className="space-y-8">
      <PageContainer>
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg border hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>

          <div>
            <h2 className="text-3xl font-bold text-black">Submit Feedback</h2>
            <p className="text-gray-600">
              Provide feedback for a specific cleaning task.
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow border space-y-6"
        >
          {/* LOCATION SELECT */}
          <div>
            <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <MapPin size={16} className="text-blue-600" />
              Select Location
            </label>

            <select
              value={selectedLocation?.id || ""}
              onChange={(e) => {
                const loc = locations.find((l) => l.id === e.target.value) || null;
                setSelectedLocation(loc);
                setSelectedTask(null);
              }}
              className="w-full mt-2 border p-3 rounded-lg bg-gray-50 text-black"
            >
              <option value="">Choose location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* TASK SELECT */}
          {selectedLocation && (
            <div>
              <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <ListChecks size={16} className="text-indigo-600" />
                Select Task
              </label>

              <select
                value={selectedTask?.id || ""}
                onChange={(e) => {
                  const task =
                    selectedLocation.tasks.find((t) => t.id === e.target.value) ||
                    null;
                  setSelectedTask(task);
                }}
                className="w-full mt-2 border p-3 rounded-lg bg-gray-50 text-black"
              >
                <option value="">Choose task</option>
                {selectedLocation.tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title} — {task.cleaner.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* TASK DETAILS */}
          {selectedTask && (
            <div className="p-4 bg-gray-50 border rounded-xl">
              <p className="font-semibold text-black flex items-center gap-2">
                <User size={16} className="text-emerald-600" />
                Cleaner: {selectedTask.cleaner.name}
              </p>

              <p className="text-sm text-gray-600 mt-2">Subtasks:</p>
              <ul className="ml-4 list-disc text-gray-700 text-sm">
                {selectedTask.subtasks.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* RATING */}
          <div>
            <label className="text-sm font-semibold text-gray-800">Rating</label>

            <div className="flex gap-2 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`w-8 h-8 cursor-pointer transition ${
                    i < rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-500" />
              Feedback Message
            </label>

            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mt-2 border rounded-lg p-3 bg-gray-50 text-black"
              placeholder="Describe your experience..."
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <ImagePlus className="w-4 h-4 text-blue-500" />
              Upload Image (optional)
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2"
            />

            {image && (
              <div className="relative w-40 mt-4">
                <Image
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  width={160}
                  height={120}
                  className="rounded-xl border shadow-sm object-cover"
                />

                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
          >
            Submit Feedback
          </button>
        </form>
      </PageContainer>
    </div>
  );
}
