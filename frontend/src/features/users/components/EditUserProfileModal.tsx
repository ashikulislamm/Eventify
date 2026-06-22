"use client";

import React from "react";
import { HiX } from "react-icons/hi";
import { User } from "@/store/useAuthStore";
import { Input } from "@/components/shared/Input";
import { TextArea } from "@/components/shared/TextArea";
import { Button } from "@/components/shared/Button";

interface EditUserProfileModalProps {
  isOpen: boolean;
  isSaving: boolean;
  formData: User | null;
  onClose: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
}

export default function EditUserProfileModal({
  isOpen,
  isSaving,
  formData,
  onClose,
  onInputChange,
  onSave,
}: EditUserProfileModalProps) {
  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 animate-in fade-in zoom-in duration-200">
          {/* Close Button */}
          <Button
            variant="ghost"
            onClick={onClose}
            className="absolute top-4 right-4 !p-2 !rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 focus:ring-gray-200"
            disabled={isSaving}
          >
            <HiX className="w-6 h-6" />
          </Button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            <p className="text-gray-600 text-sm mt-1">Update your personal information</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave();
            }}
            className="space-y-4"
          >
            <Input
              label="Full Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
              disabled={isSaving}
            />

            <Input
              label="Email Address"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              required
              disabled={isSaving}
            />

            <Input
              label="Phone Number"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              required
              disabled={isSaving}
            />

            <Input
              label="Address"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={onInputChange}
              required
              disabled={isSaving}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="University"
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={onInputChange}
                required
                disabled={isSaving}
              />
              <Input
                label="Department"
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={onInputChange}
                required
                disabled={isSaving}
              />
            </div>

            <TextArea
              label="Bio (Optional)"
              id="bio"
              name="bio"
              value={formData.bio || ""}
              onChange={onInputChange}
              rows={3}
              placeholder="Tell us about yourself..."
              disabled={isSaving}
            />

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isSaving}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSaving}
                className="flex-1"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
