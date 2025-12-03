"use client";

import {
  MapPin,
  Briefcase,
  Wallet,
  Phone,
  Mail,
  Clock,
  UserCircle,
  GraduationCap,
} from "lucide-react";

export default function KeyProfile(props: any) {
  const { profileData } = props;

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-300">

      {/* Profile Header */}
      <div className="flex items-center gap-3">
        <UserCircle size={48} className="text-gray-500" />

        <div>
          <div className="text-lg font-semibold">
            {profileData?.name || "User Name"}
          </div>
          <div className="text-sm text-gray-500">
            {profileData?.designation || "Designation"}
          </div>
        </div>
      </div>

      <hr className="my-3 text-gray-300" />

      {/* Profile Info List */}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{profileData?.location || "Location"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase size={16} />
          <span>
            {profileData?.experience
              ? `${profileData?.experience} Years Experience`
              : "Experience"}
          </span>
        </div>

      <div className="flex items-center gap-2">
        <GraduationCap size={16} />
        <span>{profileData?.education || "Bsc Computer Science"}</span>
      </div>

        <div className="flex items-center gap-2">
          <Phone size={16} />
          <span>{profileData?.mobile || "Mobile Number"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail size={16} />
          <span>{profileData?.email || "Email ID"}</span>
        </div>

        {/* <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{profileData?.noticePeriod || "Notice Period"}</span>
        </div> */}
      </div>

      <hr className="my-3 text-gray-300" />

      {/* Button */}
      <button className="w-full py-2 bg-orange-400 text-white rounded-lg text-center font-bold">
        View Profile
      </button>
    </div>
  );
}
