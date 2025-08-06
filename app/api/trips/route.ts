import { auth } from "@/auth";
import { getCountryFromCoordinates } from "@/lib/actions/geocode";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Not authenticated", { status: 401 });
    }

    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: session.user?.id,
        },
      },
      select: {
        locationTitle: true,
        lat: true,
        lng: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });

    const transformedLocations = await Promise.all(
      locations.map(async (loc) => {
        const geoCodeResult = await getCountryFromCoordinates(loc.lat, loc.lng);

        return {
          name: `${loc.trip.title} - ${geoCodeResult.formattedAddress}`,
          lat: loc.lat,
          lng: loc.lng,
          country: geoCodeResult.country,
        };
      })
    );
    return NextResponse.json(transformedLocations);
  } catch (err) {
    console.log(err);
    return new NextResponse(`Internal error: ${err}`, { status: 500 });
  }
}
