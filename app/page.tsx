import React from "react";
import { Map as MapIcon } from "lucide-react";
import { auth } from "@/auth";
import AuthButton from "@/components/auth-button";

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#111827] text-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-[#111827] py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#E0E7FF]">
                Plan your perfect trip, every time
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Create itineraries, organize destinations, and share your travel
                plans — all in one place!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AuthButton
                  isLoggedIn={isLoggedIn}
                  className="w-full sm:w-auto bg-[#4F46E5] text-white hover:bg-[#E0E7FF] hover:text-black px-6 py-3 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center"
                >
                  {isLoggedIn ? (
                    "Let's go🚀"
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.24 1.83 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3.01.41 2.29-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.23 0 1.61-.02 2.91-.02 3.31 0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span className="ml-2 font-medium">Login</span>
                    </>
                  )}
                </AuthButton>
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-20 bg-[#111827]"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
          />
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white text-[#111827]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#374151] mb-12">
              Plan with confidence
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl border border-gray-300 shadow-sm bg-white hover:shadow-lg transition">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <MapIcon className="h-6 w-6 text-[#4F46E5]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#374151]">
                  Interactive Maps
                </h3>
                <p className="text-gray-600">
                  Visualize your trip with interactive maps. See your entire
                  itinerary at a glance.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl border border-gray-300 shadow-sm bg-white hover:shadow-lg transition">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-[#4F46E5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#374151]">
                  Day-by-Day Itineraries
                </h3>
                <p className="text-gray-600">
                  Organize your trip day by day. Never miss a beat with
                  structured planning.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl border border-gray-300 shadow-sm bg-white hover:shadow-lg transition">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-[#4F46E5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5L12 7" />
                    <path d="M15 5v4h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#374151]">
                  Drag & Drop Planning
                </h3>
                <p className="text-gray-600">
                  Easily rearrange your itinerary with simple drag and drop
                  functionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-[#111827]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to plan your next adventure?
            </h2>
            <p className="text-xl text-[#E0E7FF] mb-8 max-w-2xl mx-auto">
              Join <strong>Escapia</strong> and escape with style.
            </p>
            <AuthButton
              isLoggedIn={isLoggedIn}
              className="inline-block bg-[#4F46E5] text-white hover:bg-[#E0E7FF] hover:text-black px-6 py-3 rounded-xl shadow-md transition-all duration-200"
            >
              {isLoggedIn ? "Check it out!" : "Sign Up Now!"}
            </AuthButton>
          </div>
        </section>
      </main>
    </div>
  );
}
