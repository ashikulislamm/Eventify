"use client";

import React from "react";
import { HiX } from "react-icons/hi";
import { Club } from "@/store/useAuthStore";
import { Input } from "@/components/shared/Input";
import { TextArea } from "@/components/shared/TextArea";
import { Button } from "@/components/shared/Button";

interface EditProfileModalProps {
  isOpen: boolean;
  isSaving: boolean;
  formData: Club | null;
  onClose: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
}

export default function EditProfileModal({
  isOpen,
  isSaving,
  formData,
  onClose,
  onInputChange,
  onSave,
}: EditProfileModalProps) {
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
            <h2 className="text-2xl font-bold text-gray-900">Edit Club Profile</h2>
            <p className="text-gray-600 text-sm mt-1">Update your club information</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave();
            }}
            className="space-y-4"
          >
            <Input
              label="Club Name"
              type="text"
              name="club_name"
              value={formData.club_name}
              onChange={onInputChange}
              required
              disabled={isSaving}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nickname / Slug"
                type="text"
                name="nickname"
                value={formData.nickname || ""}
                onChange={onInputChange}
                disabled={isSaving}
                placeholder="e.g. computerclub"
              />
              <Input
                label="University"
                type="text"
                name="university"
                value={formData.university}
                onChange={onInputChange}
                required
                disabled={isSaving}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="President Name"
                type="text"
                name="president_name"
                value={formData.president_name}
                onChange={onInputChange}
                required
                disabled={isSaving}
              />
              <Input
                label="President Email"
                type="email"
                name="president_email"
                value={formData.president_email}
                onChange={onInputChange}
                required
                disabled={isSaving}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={onInputChange}
                required
                disabled={isSaving}
              />
              <Input
                label="Website"
                type="url"
                name="website"
                value={formData.website || ""}
                onChange={onInputChange}
                placeholder="https://example.com"
                disabled={isSaving}
              />
            </div>

            <Input
              label="Address"
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={onInputChange}
              disabled={isSaving}
            />

            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              rows={3}
              required
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
