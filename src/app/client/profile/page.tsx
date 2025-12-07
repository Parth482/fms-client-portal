"use client";

import { useEffect, useState } from "react";
import {
  CircleUserRound,
  Mail,
  Phone,
  BadgeCheck,
  CalendarDays,
  ShieldCheck,
  Building2,
  MapPin,
  UsersRound,
} from "lucide-react";

interface LocationData {
  name: string;
  address?: string;
  city?: string;
  pincode?: string;
  country?: string;
}

interface CompanyData {
  _id: string;
  companyName: string;
  address?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  locations?: LocationData[];
}

interface ClientUserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  company: CompanyData;
  createdAt: string;
}

const dummyProfile: ClientUserProfile = {
  id: "dummy123",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 555 990 1234",
  role: "client-admin",
  createdAt: new Date().toISOString(),
  company: {
    _id: "comp001",
    companyName: "Demo Facility Management Ltd.",
    address: "123 Demo Street, City Center",
    contactName: "Sarah Williams",
    contactEmail: "contact@demo-facility.com",
    contactPhone: "+1 444 220 9090",
    locations: [
      {
        name: "Reception Area",
        address: "Building A",
        city: "Metropolis",
        pincode: "12345",
        country: "USA",
      },
      {
        name: "Pantry Floor 2",
        address: "Building C",
        city: "Metropolis",
        pincode: "12345",
        country: "USA",
      },
    ],
  },
};

export default function ClientUserProfilePage() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<ClientUserProfile>(dummyProfile); // default dummy

  useEffect(() => {
    fetchClientProfile();
  }, []);

const fetchClientProfile = async () => {
  try {
    const token = document.cookie
      .split("; ")
      .find((r) => r.startsWith("clientToken="))
      ?.split("=")[1];

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // If no backend URL is set, instantly fallback
    if (!backendUrl) {
      console.warn("⚠ No BACKEND_URL — using dummy profile");
      setProfile(dummyProfile);
      return;
    }

    const res = await fetch(`${backendUrl}/api/client/profile/me`, {
      method: "GET",
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    });

    // If backend unreachable → fallback
    if (!res.ok) {
      console.warn(`⚠ Backend returned ${res.status} — using dummy`);
      setProfile(dummyProfile);
      return;
    }

    const data = await res.json();

    if (!data.profile) {
      console.warn("⚠ No profile returned — using dummy");
      setProfile(dummyProfile);
      return;
    }

    setProfile(data.profile);

  } catch {
    // ❌ Silent catch (no TypeError printed)
    console.warn("⚠ Backend fetch failed — using dummy fallback");
    setProfile(dummyProfile);
  } finally {
    setLoading(false);
  }
};


  if (loading) return <p className="p-8 text-black">Loading...</p>;

  const roleColor =
    {
      "client-admin": "bg-purple-100 text-purple-700",
      manager: "bg-blue-100 text-blue-700",
      supervisor: "bg-green-100 text-green-700",
      staff: "bg-gray-100 text-gray-700",
    }[profile.role] || "bg-gray-100 text-gray-700";

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl border shadow pt-10 pb-16 px-10 space-y-12">
      {/* HEADER */}
      <div className="flex items-center gap-6">
        <CircleUserRound size={90} className="text-gray-800" />
        <div>
          <h1 className="text-3xl font-bold text-black">{profile.name}</h1>
          <p className="text-gray-600">{profile.email}</p>
          <span
            className={`mt-2 inline-block px-4 py-1 text-sm rounded-full font-medium capitalize ${roleColor}`}
          >
            {profile.role}
          </span>
        </div>
      </div>

      {/* USER DETAILS CARD */}
      <div className="bg-gray-50 rounded-xl border p-6 space-y-6">
        <DetailItem label="Full Name" value={profile.name} icon={<BadgeCheck className="text-blue-600" size={20} />} />
        <DetailItem label="Email Address" value={profile.email} icon={<Mail className="text-blue-600" size={20} />} />
        <DetailItem label="Phone Number" value={profile.phone || "-"} icon={<Phone className="text-blue-600" size={20} />} />
        <DetailItem label="Role" value={profile.role} icon={<ShieldCheck className="text-blue-600" size={20} />} />
        <DetailItem
          label="Joined On"
          value={new Date(profile.createdAt).toLocaleDateString()}
          icon={<CalendarDays className="text-blue-600" size={20} />}
        />
      </div>

      {/* COMPANY CARD */}
      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">
        <h3 className="text-xl font-semibold text-black flex items-center gap-2">
          <Building2 size={22} className="text-blue-600" />
          Company Information
        </h3>

        <DetailItem
          icon={<BadgeCheck className="text-blue-500" size={18} />}
          label="Business Name"
          value={profile.company.companyName}
        />

        {profile.company.contactName && (
          <DetailItem
            icon={<UsersRound className="text-blue-500" size={18} />}
            label="Contact Person"
            value={profile.company.contactName}
          />
        )}

        {profile.company.contactEmail && (
          <DetailItem
            icon={<Mail className="text-blue-500" size={18} />}
            label="Contact Email"
            value={profile.company.contactEmail}
          />
        )}

        {profile.company.contactPhone && (
          <DetailItem
            icon={<Phone className="text-blue-500" size={18} />}
            label="Contact Phone"
            value={profile.company.contactPhone}
          />
        )}

        {profile.company.address && (
          <DetailItem
            icon={<MapPin className="text-blue-500" size={18} />}
            label="Company Address"
            value={profile.company.address}
          />
        )}

        {/* LOCATIONS */}
        {profile.company.locations && profile.company.locations.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Branch Locations</p>
            <div className="space-y-3">
              {profile.company.locations.map((loc, idx) => (
                <div key={idx} className="bg-gray-100 rounded-lg p-3 border">
                  <p className="text-black font-medium">{loc.name}</p>

                  <p className="text-gray-600 text-sm">
                    {[loc.address, loc.city, loc.pincode, loc.country].filter(Boolean).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg text-black font-medium capitalize">{value}</p>
      </div>
    </div>
  );
}
