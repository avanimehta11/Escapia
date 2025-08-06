"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    new Set()
  );
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("api/trips");
        const data = await response.json();
        setLocations(data);

        const countries = new Set<string>(
          data.map((loc: TransformedLocation) => loc.country)
        );

        setVisitedCountries(countries);
      } catch (err) {
        console.error("error: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center text-4xl font-bold mb-12 text-[#E0E7FF] font-sans">
            Your Travel Journey
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-[#1F2937] rounded-xl shadow-lg overflow-hidden border border-[#374151]">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-[#E0E7FF]">
                  See your adventures here!
                </h2>
                <div className="h-[600px] w-full relative rounded-md overflow-hidden shadow-inner">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F46E5]"></div>
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[16/9]">
                      <Globe
                        ref={globeRef}
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                        backgroundColor="rgba(0,0,0,0)"
                        pointColor={() => "#FB7185"} // Rose shade accent
                        pointLabel="name"
                        pointsData={locations}
                        pointRadius={0.5}
                        pointAltitude={0.1}
                        pointsMerge={true}
                        width={800}
                        height={600}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-8 bg-[#1F2937] border border-[#374151] shadow-md rounded-xl">
                <CardHeader>
                  <CardTitle className="text-[#E0E7FF]">
                    Countries Visited
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F46E5]"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-[#4F46E5] bg-opacity-20 p-4 rounded-lg">
                        <p className="text-sm text-[#CBD5E1] font-medium">
                          You&apos;ve visited{" "}
                          <span className="font-semibold text-white">
                            {visitedCountries.size}{" "}
                            {visitedCountries.size === 1
                              ? "country"
                              : "countries"}
                          </span>
                        </p>
                      </div>
                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                        {Array.from(visitedCountries)
                          .sort()
                          .map((country, key) => (
                            <div
                              key={key}
                              className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#374151] transition-colors border border-[#4F46E5] bg-[#111827]"
                            >
                              <MapPin className="h-4 w-4 text-[#FB7185]" />
                              <span className="font-medium text-white">
                                {country}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
