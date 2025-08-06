"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { addLocation } from "@/lib/actions/add-location";

export default function NewLocationClient({ tripId }: { tripId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-[#1A202C] text-white">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-[#2D3748] border border-[#4A5568] p-8 shadow-lg rounded-xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">
            Add New Location
          </h1>
          <form
            className="space-y-6"
            action={(formData: FormData) => {
              startTransition(() => {
                addLocation(formData, tripId);
              });
            }}
          >
            <div>
              <label className="block text-sm font-medium text-[#CBD5E1] mb-2">
                Address
              </label>
              <input
                name="address"
                type="text"
                required
                className="w-full bg-[#E2E8F0] text-black border border-[#CBD5E1] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB7185]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#4F46E5] hover:bg-[#0F172A] text-white"
            >
              {isPending ? "Adding..." : "Let's go!"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
