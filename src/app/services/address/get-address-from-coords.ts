import { mapsHttpClient } from "@/app/clients/maps-http-client";

interface GetAddressFromCoordsParams {
  lat: number;
  lng: number;
}

export async function getAddressFromCoords({ lat, lng }: GetAddressFromCoordsParams): Promise<string> {
  const response = await mapsHttpClient.get("/geocode/json", {
    params: {
      latlng: `${lat},${lng}`,
      key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    },
  });

  return response.data.results[0].formatted_address;
}
