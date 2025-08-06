interface GeoCodeResult {
  country: string;
  formattedAddress: string;
}

export async function getCountryFromCoordinates(
  lat: number,
  lng: number
): Promise<GeoCodeResult> {
  const apiKey = process.env.MAPS_API_KEY!;
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${apiKey}&language=en`
  );

  const data = await response.json();

  const result = data.results[0];
  const component = result.components;

  return {
    country: component.country || "Unknown",
    formattedAddress: result.formtted,
  };
}
