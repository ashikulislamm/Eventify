"use client";

import React from "react";
import { HiX } from "react-icons/hi";
import { Input } from "@/components/shared/Input";
import { TextArea } from "@/components/shared/TextArea";
import { Button } from "@/components/shared/Button";

interface EventFormData {
  title: string;
  description: string;
  category: string;
  venue: string;
  address: string;
  city: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  max_attendees: string;
  price: string;
  is_paid: boolean;
  image: string;
  tags: string;
  highlights: string;
  requirements: string;
}

interface CreateEventModalProps {
  isOpen: boolean;
  isCreating: boolean;
  formData: EventFormData;
  onClose: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: () => void;
}

export default function CreateEventModal({
  isOpen,
  isCreating,
  formData,
  onClose,
  onInputChange,
  onSubmit,
}: CreateEventModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 md:p-8 animate-in fade-in zoom-in duration-200">
          {/* Close Button */}
          <Button
            variant="ghost"
            onClick={onClose}
            className="absolute top-4 right-4 !p-2 !rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 focus:ring-gray-200"
            disabled={isCreating}
          >
            <HiX className="w-6 h-6" />
          </Button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
            <p className="text-gray-600 text-sm mt-1">Publish an event to connect with students</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
          >
            <Input
              label="Event Title *"
              type="text"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              required
              disabled={isCreating}
            />

            {/* Category & Image URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 select-none">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={onInputChange}
                  required
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 bg-gray-50 focus:bg-white transition-all text-sm md:text-base text-gray-900"
                  disabled={isCreating}
                >
                  <option value="">Select Category</option>
                  <option value="Tech">Tech</option>
                  <option value="Social">Social</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Academic">Academic</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Conference">Conference</option>
                  <option value="Competition">Competition</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <Input
                label="Image URL"
                type="url"
                name="image"
                value={formData.image}
                onChange={onInputChange}
                placeholder="https://images.unsplash.com/..."
                disabled={isCreating}
              />
            </div>

            {/* Venue, Address & City */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Venue *"
                type="text"
                name="venue"
                value={formData.venue}
                onChange={onInputChange}
                required
                placeholder="e.g. Auditorium"
                disabled={isCreating}
              />
              <Input
                label="Address *"
                type="text"
                name="address"
                value={formData.address}
                onChange={onInputChange}
                required
                placeholder="e.g. 120 University Rd"
                disabled={isCreating}
              />
              <Input
                label="City *"
                type="text"
                name="city"
                value={formData.city}
                onChange={onInputChange}
                required
                placeholder="e.g. Berkeley"
                disabled={isCreating}
              />
            </div>

            {/* Start Date & End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date *"
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={onInputChange}
                required
                disabled={isCreating}
              />
              <Input
                label="End Date *"
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={onInputChange}
                required
                disabled={isCreating}
              />
            </div>

            {/* Start Time & End Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Time *"
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={onInputChange}
                required
                disabled={isCreating}
              />
              <Input
                label="End Time *"
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={onInputChange}
                required
                disabled={isCreating}
              />
            </div>

            {/* Paid status & price & max attendees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <Input
                label="Max Attendees"
                type="number"
                name="max_attendees"
                value={formData.max_attendees}
                onChange={onInputChange}
                placeholder="e.g. 100"
                disabled={isCreating}
              />
              <div className="flex items-center pb-3 h-14">
                <input
                  type="checkbox"
                  id="is_paid"
                  name="is_paid"
                  checked={formData.is_paid}
                  onChange={onInputChange}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                  disabled={isCreating}
                />
                <label htmlFor="is_paid" className="ml-2 text-sm text-gray-700 font-semibold select-none cursor-pointer">
                  This is a paid event
                </label>
              </div>
              <Input
                label="Entry Fee (₹)"
                type="number"
                name="price"
                value={formData.price}
                onChange={onInputChange}
                disabled={!formData.is_paid || isCreating}
              />
            </div>

            {/* Tags, Highlights & Requirements */}
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <Input
                label="Tags (Comma-separated)"
                type="text"
                name="tags"
                value={formData.tags}
                onChange={onInputChange}
                placeholder="e.g. web, coding, react"
                disabled={isCreating}
              />
              <Input
                label="Highlights (Comma-separated)"
                type="text"
                name="highlights"
                value={formData.highlights}
                onChange={onInputChange}
                placeholder="e.g. Hands-on labs, Certifications, Mentorship"
                disabled={isCreating}
              />
              <Input
                label="Requirements (Comma-separated)"
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={onInputChange}
                placeholder="e.g. Laptop, Basic JS knowledge, pre-register"
                disabled={isCreating}
              />
            </div>

            <TextArea
              label="Event Description *"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              rows={4}
              required
              disabled={isCreating}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isCreating}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isCreating}
                className="flex-1"
              >
                Publish Event
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
