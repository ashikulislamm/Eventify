"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiX, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";

import DashboardSidebar from "@/components/layout/DashboardSidebar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import useAuthStore from "@/store/useAuthStore";
import { apiClient } from "@/services/api/apiClient";
import { useToast } from "@/components/shared/Toast";

// Feature components
import OverviewTab from "@/features/clubs/components/OverviewTab";
import EventsTab from "@/features/clubs/components/EventsTab";
import MembersTab from "@/features/clubs/components/MembersTab";
import AnalyticsTab from "@/features/clubs/components/AnalyticsTab";
import ProfileTab from "@/features/clubs/components/ProfileTab";
import EditProfileModal from "@/features/clubs/components/EditProfileModal";
import CreateEventModal from "@/features/clubs/components/CreateEventModal";

export default function ClubDashboardWrapper() {
  return (
    <ProtectedRoute allowedRole="club">
      <ClubDashboard />
    </ProtectedRoute>
  );
}

function ClubDashboard() {
  const params = useParams();
  const router = useRouter();
  const clubname = params.clubname as string;

  const { club, logout, updateClub } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");
  const { showToast } = useToast();

  // Modals & Saving state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  // Events list state
  const [clubEvents, setClubEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  // New Event Form State
  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    category: "",
    venue: "",
    address: "",
    city: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    max_attendees: "",
    price: "0",
    is_paid: false,
    image: "",
    tags: "",
    highlights: "",
    requirements: "",
  });

  // Dynamic routing verification
  useEffect(() => {
    if (club) {
      const urlClubname = club.club_name.toLowerCase().replace(/\s+/g, "");
      if (urlClubname !== clubname.toLowerCase()) {
        router.replace(`/club/${urlClubname}`);
      }
      setFormData(club);
    }
  }, [club, clubname, router]);

  // Fetch events list
  const fetchClubEvents = async () => {
    if (!club?.id) return;
    setLoadingEvents(true);
    try {
      const response = await apiClient.get(`api/events/club/${club.id}`);
      if (response.data?.success) {
        setClubEvents(response.data.data || []);
      }
    } catch (error: any) {
      console.error("Failed to fetch events:", error.message || error);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    if (club?.id && activeTab === "events") {
      fetchClubEvents();
    }
  }, [club?.id, activeTab]);

  const handleEditClick = () => {
    setFormData(club);
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
    setFormData((prev: any) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleEventInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setEventFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setEventFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateEvent = async () => {
    if (!eventFormData.title || !eventFormData.description || !eventFormData.category) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    setIsCreatingEvent(true);

    try {
      const tagsArray = eventFormData.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
      const highlightsArray = eventFormData.highlights.split(",").map((h) => h.trim()).filter(Boolean);
      const requirementsArray = eventFormData.requirements.split(",").map((r) => r.trim()).filter(Boolean);

      const response = await apiClient.post("api/events", {
        ...eventFormData,
        club_id: club?.id,
        max_attendees: eventFormData.max_attendees ? parseInt(eventFormData.max_attendees) : null,
        price: parseFloat(eventFormData.price || "0"),
        tags: tagsArray,
        highlights: highlightsArray,
        requirements: requirementsArray,
      });

      if (response.data?.success) {
        setIsCreatingEvent(false);
        setIsEventModalOpen(false);
        showToast("Event created successfully!", "success");

        // Refresh list
        fetchClubEvents();

        // Reset Form
        setEventFormData({
          title: "",
          description: "",
          category: "",
          venue: "",
          address: "",
          city: "",
          start_date: "",
          end_date: "",
          start_time: "",
          end_time: "",
          max_attendees: "",
          price: "0",
          is_paid: false,
          image: "",
          tags: "",
          highlights: "",
          requirements: "",
        });
      }
    } catch (error: any) {
      console.error("Failed to create event:", error);
      showToast(error.message || "Failed to create event. Please try again.", "error");
      setIsCreatingEvent(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!formData || !club) return;
    setIsSaving(true);

    try {
      const response = await apiClient.put(`api/clubs/${formData.id}`, {
        clubName: formData.club_name,
        nickname: formData.nickname || "",
        phone: formData.phone,
        university: formData.university,
        description: formData.description,
        presidentName: formData.president_name,
        presidentEmail: formData.president_email,
        website: formData.website || "",
        address: formData.address || "",
      });

      if (response.data?.success) {
        const updatedClubData = {
          ...formData,
          ...response.data.data,
        };
        // Update global auth store
        updateClub(updatedClubData);

        setIsSaving(false);
        setIsModalOpen(false);
        showToast("Profile updated successfully!", "success");
      }
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      showToast(error.message || "Failed to update profile. Please try again.", "error");
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/club/login");
  };

  if (!club) return null;

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
        <div className="container mx-auto px-4 py-8 lg:py-8 pt-20 lg:pt-8 max-w-7xl">
          
          {/* Active Tab rendering */}
          {activeTab === "overview" && (
            <OverviewTab club={club} onTabChange={setActiveTab} />
          )}

          {activeTab === "events" && (
            <EventsTab
              clubEvents={clubEvents}
              loadingEvents={loadingEvents}
              onCreateEventClick={() => setIsEventModalOpen(true)}
            />
          )}

          {activeTab === "members" && <MembersTab />}

          {activeTab === "analytics" && <AnalyticsTab />}

          {activeTab === "profile" && (
            <ProfileTab club={club} onEditClick={handleEditClick} />
          )}

        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        isSaving={isSaving}
        formData={formData}
        onClose={handleCloseModal}
        onInputChange={handleInputChange}
        onSave={handleSaveProfile}
      />

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isEventModalOpen}
        isCreating={isCreatingEvent}
        formData={eventFormData}
        onClose={() => setIsEventModalOpen(false)}
        onInputChange={handleEventInputChange}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
}
