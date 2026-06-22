"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiX, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";

import DashboardSidebar from "@/components/layout/DashboardSidebar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import useAuthStore from "@/store/useAuthStore";
import { apiClient } from "@/services/api/apiClient";
import { useToast } from "@/components/shared/Toast";

// Feature Components
import UserOverviewTab from "@/features/users/components/UserOverviewTab";
import UserEventsTab from "@/features/users/components/UserEventsTab";
import FavoritesTab from "@/features/users/components/FavoritesTab";
import TicketsTab from "@/features/users/components/TicketsTab";
import UserProfileTab from "@/features/users/components/UserProfileTab";
import EditUserProfileModal from "@/features/users/components/EditUserProfileModal";

export default function UserDashboardWrapper() {
  return (
    <ProtectedRoute allowedRole="user">
      <UserDashboard />
    </ProtectedRoute>
  );
}

function UserDashboard() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;

  const { user, logout, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");
  const { showToast } = useToast();

  // Modals & State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  // Verify slug routing
  useEffect(() => {
    if (user) {
      const urlUsername = user.name.toLowerCase().replace(/\s+/g, "");
      if (urlUsername !== username.toLowerCase()) {
        router.replace(`/user/${urlUsername}`);
      }
      setFormData(user);
    }
  }, [user, username, router]);

  const handleEditClick = () => {
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(user);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSaveProfile = async () => {
    if (!formData || !user) return;
    setIsSaving(true);

    try {
      const response = await apiClient.put(`api/users/${formData.id}`, {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        university: formData.university,
        department: formData.department,
        bio: formData.bio || "",
      });

      if (response.data?.success) {
        const updatedUserData = {
          ...formData,
          ...response.data.data,
        };
        // Update global store
        updateUser(updatedUserData);

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
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <DashboardSidebar
        type="user"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        <div className="container mx-auto px-4 py-8 lg:py-8 pt-20 lg:pt-8 max-w-7xl">
          
          {/* Active Tab rendering */}
          {activeTab === "overview" && (
            <UserOverviewTab user={user} onTabChange={setActiveTab} />
          )}

          {activeTab === "events" && <UserEventsTab />}

          {activeTab === "favorites" && <FavoritesTab />}

          {activeTab === "tickets" && <TicketsTab />}

          {activeTab === "profile" && (
            <UserProfileTab user={user} onEditClick={handleEditClick} />
          )}

        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditUserProfileModal
        isOpen={isModalOpen}
        isSaving={isSaving}
        formData={formData}
        onClose={handleCloseModal}
        onInputChange={handleInputChange}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
