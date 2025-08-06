import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function TripsPage() {
  const session = await auth();

  const trips = await prisma.trip.findMany({
    where: { userId: session?.user?.id },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1A202C] text-gray-300 text-xl">
        Please Sign In
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full text-[#F1F5F9] py-8">
      <div className="w-full max-w-screen-xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-[#112044]">
            Dashboard
          </h1>
          <Link href="/trips/new">
            <Button className="hover:bg-[#0F172A] bg-[#2F2F2F] text-white">
              New Trip
            </Button>
          </Link>
        </div>

        {/* Welcome Card */}
        <Card className="bg-[#182440] text-white border border-[#4A5568]">
          <CardHeader>
            <CardTitle>Welcome back, {session.user?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {trips.length === 0
                ? "Start planning your new escape!"
                : `You have ${trips.length} ${
                    trips.length === 1 ? "trip" : "trips"
                  } planned. ${
                    upcomingTrips.length > 0
                      ? `${upcomingTrips.length} upcoming!`
                      : ""
                  }`}
            </p>
          </CardContent>
        </Card>

        {/* Trip List */}
        <div>
          <h2 className="text-xl italic font-semibold mb-4 ml-2 sm:ml-5 text-[#112044]">
            Your Recent Trips
          </h2>

          {trips.length === 0 ? (
            <Card className="bg-[#2D3748] text-white border border-[#4A5568]">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <h3 className="text-xl font-medium mb-2">No trips yet</h3>
                <p className="text-center mb-4 max-w-md text-[#CBD5E1]">
                  Start planning your adventure by creating your first trip
                </p>
                <Link href="/trips/new">
                  <Button className="bg-[#4F46E5] hover:bg-[#FB7185] text-white">
                    Create Trip
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTrips.slice(0, 6).map((trip, key) => (
                <Link href={`/trips/${trip.id}`} key={key}>
                  <Card className="h-full bg-[#2D3748] text-white border border-[#4A5568] transition-all duration-200 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
                    <CardHeader>
                      <CardTitle className="line-clamp-1">
                        {trip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-2 mb-2 text-[#CBD5E1]">
                        {trip.description}
                      </p>
                      <div className="text-sm text-[#E2E8F0]">
                        {new Date(trip.startDate).toLocaleDateString()} -{" "}
                        {new Date(trip.endDate).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
