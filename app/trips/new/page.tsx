"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createTrip } from "@/lib/actions/create-trip";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/upload-thing";
import { useState, useTransition } from "react";
import Image from "next/image";

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="min-h-[calc(100vh-5rem)] py-10 px-4 flex items-start justify-center bg-gray-50">
      <div className="w-full max-w-xl">
        <Card className="shadow-md">
          <CardHeader className="text-2xl font-bold text-gray-800">
            New Trip🚀
          </CardHeader>
          <CardContent>
            <form
              className="space-y-6"
              action={(formData: FormData) => {
                if (imageUrl) {
                  formData.append("imageUrl", imageUrl);
                }
                startTransition(() => {
                  createTrip(formData);
                });
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Japan trip..."
                  className={cn(
                    "w-full border border-gray-300 px-4 py-2 rounded-md",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Trip description..."
                  rows={3}
                  className={cn(
                    "w-full border border-gray-300 px-4 py-2 rounded-md",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className={cn(
                      "w-full border border-gray-300 px-4 py-2 rounded-md",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500"
                    )}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    className={cn(
                      "w-full border border-gray-300 px-4 py-2 rounded-md",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500"
                    )}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trip Image
                </label>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="Trip Preview"
                    className="w-full mb-4 rounded-md max-h-48 object-cover"
                    width={500}
                    height={200}
                  />
                )}
                <UploadButton
                  className="ut-button:text-inherit text-bold italic text-[#4F46E5]"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0].ufsUrl) {
                      setImageUrl(res[0].ufsUrl);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Upload error: ", error);
                  }}
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#0F172A]"
              >
                {isPending ? "Creating..." : "Let's go!"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
