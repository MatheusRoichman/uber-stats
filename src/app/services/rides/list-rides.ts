import type { QueryClient } from "@tanstack/react-query";

import { parse } from "papaparse";

import type { Ride } from "@/app/entities/ride";

import { getAddressFromCoords } from "../address/get-address-from-coords";

interface ListRidesParams {
	csvContent: string;
	queryClient: QueryClient;
}

export async function listRides({ csvContent, queryClient }: ListRidesParams) {
	const parseResult = parse<Ride>(csvContent, {
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
	});

	if (!parseResult.data.some((ride) => !ride.begintrip_address)) {
		return parseResult.data;
	}

	const addresses = await Promise.all(
		parseResult.data
			.filter((ride) => !ride.begintrip_address)
			.map((ride) => {
				return queryClient.fetchQuery({
					queryKey: ["address", ride.begintrip_lat, ride.begintrip_lng],
					queryFn: () =>
						getAddressFromCoords({
							lat: ride.begintrip_lat,
							lng: ride.begintrip_lng,
						}),
					staleTime: 1000 * 60 * 60 * 24 * 14, // 2 weeks
				});
			}),
	);

	for (let i = 0; i < parseResult.data.length; i++) {
		if (!parseResult.data[i].begintrip_address) {
			parseResult.data[i].begintrip_address = addresses[i];
		}
	}

	return parseResult.data;
}
