"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineStar,
  HiOutlineTicket,
  HiOutlineUserGroup,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineAcademicCap,
  HiOutlinePencil,
  HiX,
  HiCheckCircle,
  HiExclamationCircle,
  HiOutlineGlobe,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineLogout,
  HiOutlineCog,
  HiOutlineHome,
} from "react-icons/hi";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

interface Club {
  id: string;
  club_name: string;
  nickname?: string;
  email: string;
  phone: string;
  university: string;
  description: string;
  president_name: string;
  president_email: string;
  logo?: string;
  website?: string;
  address?: string;
  is_verified: boolean;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

export default function ClubDashboard() {
  const params = useParams();
  const router = useRouter();
  const clubname = params.clubname as string;
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Club | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Get club data from localStorage
    const clubData = localStorage.getItem("club");
    const userType = localStorage.getItem("userType");

    if (clubData && userType === "club") {
      const parsedClub = JSON.parse(clubData);
      setClub(parsedClub);
      setFormData(parsedClub);

      // Verify that the clubname in URL matches logged-in club
      const urlClubname = parsedClub.club_name
        .toLowerCase()
        .replace(/\s+/g, "");
      if (urlClubname !== clubname.toLowerCase()) {
        router.push(`/club/${urlClubname}`);
      }
    } else {
      // Not logged in as club, redirect to club login
      router.push("/club/login");
    }
    setLoading(false);
  }, [clubname, router]);

  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(club);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSaveProfile = async () => {
    if (!formData) return;

    setIsSaving(true);

    try {
      const token = localStorage.getItem("clubToken");

      if (!token) {
        showToast(
          "Authentication token not found. Please log in again.",
          "error"
        );
        router.push("/club/login");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/clubs/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            clubName: formData.club_name,
            nickname: formData.nickname || "",
            phone: formData.phone,
            university: formData.university,
            description: formData.description,
            presidentName: formData.president_name,
            presidentEmail: formData.president_email,
            website: formData.website || "",
            address: formData.address || "",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      const updatedClubData = {
        ...formData,
        ...result.data,
      };
      localStorage.setItem("club", JSON.stringify(updatedClubData));
      setClub(updatedClubData);

      setIsSaving(false);
      setIsModalOpen(false);

      showToast("Profile updated successfully!", "success");

      // If name changed, redirect to new clubname URL
      const newUrlClubname = updatedClubData.club_name
        .toLowerCase()
        .replace(/\s+/g, "");
      if (newUrlClubname !== clubname.toLowerCase()) {
        router.push(`/club/${newUrlClubname}`);
      }
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      showToast(
        error.message || "Failed to update profile. Please try again.",
        "error"
      );
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("club");
    localStorage.removeItem("clubToken");
    localStorage.removeItem("userType");
    router.push("/club/login");
  };

  if (loading || !club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = [
    {
      icon: HiOutlineCalendar,
      label: "Total Events",
      value: "24",
      color: "bg-blue-500",
    },
    {
      icon: HiOutlineUsers,
      label: "Active Members",
      value: "156",
      color: "bg-green-500",
    },
    {
      icon: HiOutlineTicket,
      label: "Event Registrations",
      value: "842",
      color: "bg-yellow-500",
    },
    {
      icon: HiOutlineChartBar,
      label: "Engagement Rate",
      value: "87%",
      color: "bg-purple-500",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: HiOutlineHome },
    { id: "events", label: "Events", icon: HiOutlineCalendar },
    { id: "members", label: "Members", icon: HiOutlineUsers },
    { id: "analytics", label: "Analytics", icon: HiOutlineChartBar },
    { id: "profile", label: "Profile", icon: HiOutlineCog },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <DashboardSidebar
        type="club"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        {/* Content Area */}
        <div className="container mx-auto px-4 py-8 lg:py-8 pt-20 lg:pt-8 max-w-7xl">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Welcome Header */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Welcome, {club.club_name}!
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your club events and members from your dashboard
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`${stat.color} rounded-lg p-3 text-white`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </h3>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Dashboard Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Events */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <HiOutlineCalendar className="w-6 h-6 text-primary" />
                      Upcoming Events
                    </h3>
                    <div className="space-y-4">
                      <div className="text-center py-12 text-gray-400">
                        <HiOutlineCalendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">No upcoming events</p>
                        <p className="text-xs mt-2">
                          Create an event to get started
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setActiveTab("events")}
                        className="w-full bg-primary text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent transition-colors text-left flex items-center gap-3"
                      >
                        <HiOutlineCalendar className="w-5 h-5" />
                        Create Event
                      </button>
                      <button
                        onClick={() => setActiveTab("members")}
                        className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-left flex items-center gap-3"
                      >
                        <HiOutlineUsers className="w-5 h-5" />
                        Manage Members
                      </button>
                      <button
                        onClick={() => setActiveTab("analytics")}
                        className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-left flex items-center gap-3"
                      >
                        <HiOutlineChartBar className="w-5 h-5" />
                        View Analytics
                      </button>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Recent Activity
                    </h3>
                    <div className="text-center py-8 text-gray-400">
                      <p className="text-sm">No recent activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Events</h2>
                <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors">
                  Create New Event
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
                <div className="text-center text-gray-400">
                  <HiOutlineCalendar className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No Events Yet
                  </h3>
                  <p className="text-sm">
                    Create your first event to get started
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Members Tab */}
          {activeTab === "members" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Members</h2>
                <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors">
                  Add Member
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
                <div className="text-center text-gray-400">
                  <HiOutlineUsers className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No Members Yet
                  </h3>
                  <p className="text-sm">Start adding members to your club</p>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
                <div className="text-center text-gray-400">
                  <HiOutlineChartBar className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No Analytics Data
                  </h3>
                  <p className="text-sm">
                    Analytics will appear once you have events and members
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-gray-900">Club Profile</h2>

              {/* Club Profile Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Logo */}
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl md:text-5xl font-bold">
                      {club.club_name?.charAt(0).toUpperCase() || "C"}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <HiOutlinePencil className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Club Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {club.club_name}
                        </h2>
                        {club.nickname && (
                          <p className="text-sm text-gray-500 mt-1">
                            @{club.nickname}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                              club.is_verified
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {club.is_verified
                              ? "✓ Verified"
                              : "Pending Verification"}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handleEditClick}
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                      >
                        Edit Profile
                      </button>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-gray-600">
                        <HiOutlineMail className="w-5 h-5 text-primary" />
                        <span className="text-sm">{club.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <HiOutlinePhone className="w-5 h-5 text-primary" />
                        <span className="text-sm">{club.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <HiOutlineAcademicCap className="w-5 h-5 text-primary" />
                        <span className="text-sm">{club.university}</span>
                      </div>
                      {club.website && (
                        <div className="flex items-center gap-3 text-gray-600">
                          <HiOutlineGlobe className="w-5 h-5 text-primary" />
                          <a
                            href={club.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:text-primary transition-colors"
                          >
                            {club.website}
                          </a>
                        </div>
                      )}
                      {club.address && (
                        <div className="flex items-center gap-3 text-gray-600">
                          <HiOutlineLocationMarker className="w-5 h-5 text-primary" />
                          <span className="text-sm">{club.address}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {club.description && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-600 text-sm">
                          {club.description}
                        </p>
                      </div>
                    )}

                    {/* President Info */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        Club President
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <HiOutlineUserGroup className="w-4 h-4 text-primary" />
                          <span className="text-sm">{club.president_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <HiOutlineMail className="w-4 h-4 text-primary" />
                          <span className="text-sm">
                            {club.president_email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Profile Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div
                className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity"
                onClick={handleCloseModal}
              ></div>

              <div className="flex items-center justify-center min-h-screen p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 animate-in fade-in zoom-in duration-200">
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isSaving}
                  >
                    <HiX className="w-6 h-6" />
                  </button>

                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Edit Club Profile
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Update your club information
                    </p>
                  </div>

                  {formData && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveProfile();
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Club Name
                        </label>
                        <input
                          type="text"
                          name="club_name"
                          value={formData.club_name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          required
                          disabled={isSaving}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nickname{" "}
                          <span className="text-gray-400 font-normal">
                            (Optional)
                          </span>
                        </label>
                        <input
                          type="text"
                          name="nickname"
                          value={formData.nickname || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="e.g., tech_club"
                          disabled={isSaving}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          required
                          disabled={isSaving}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          University
                        </label>
                        <input
                          type="text"
                          name="university"
                          value={formData.university}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          required
                          disabled={isSaving}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                          required
                          disabled={isSaving}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            President Name
                          </label>
                          <input
                            type="text"
                            name="president_name"
                            value={formData.president_name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            required
                            disabled={isSaving}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            President Email
                          </label>
                          <input
                            type="email"
                            name="president_email"
                            value={formData.president_email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            required
                            disabled={isSaving}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website{" "}
                          <span className="text-gray-400 font-normal">
                            (Optional)
                          </span>
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="https://example.com"
                          disabled={isSaving}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address{" "}
                          <span className="text-gray-400 font-normal">
                            (Optional)
                          </span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Club office location"
                          disabled={isSaving}
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                          disabled={isSaving}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span>Saving...</span>
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-[60] space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 min-w-[320px] max-w-md px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm transform transition-all duration-300 animate-in slide-in-from-right ${
              toast.type === "success"
                ? "bg-green-500/95 text-white"
                : "bg-red-500/95 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <HiCheckCircle className="w-6 h-6 flex-shrink-0" />
            ) : (
              <HiExclamationCircle className="w-6 h-6 flex-shrink-0" />
            )}
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
            >
              <HiX className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
