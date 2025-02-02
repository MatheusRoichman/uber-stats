import type { Ride } from "@/app/entities/ride";

interface GroupRidesByMonthOptions {
	sort?: "asc" | "desc";
}

export function groupRidesByMonthAndYear(
	rides: Ride[],
	options: GroupRidesByMonthOptions = {},
): Record<string, Ride[]> {
	const ridesByMonth = rides.reduce(
		(acc, ride) => {
			const month = new Date(ride.request_time).toLocaleDateString("en-US", {
				month: "numeric",
				year: "numeric",
			});

			if (!acc[month]) {
				acc[month] = [];
			}

			acc[month].push(ride);

			return acc;
		},
		{} as Record<string, Ride[]>,
	);

	if (!options.sort) return ridesByMonth;

	const grouped = Object.entries(ridesByMonth).reduce(
		(acc, [month, rides]) => {
			acc[month] = rides.sort((a, b) => {
				const dateA = new Date(a.request_time);
				const dateB = new Date(b.request_time);

				if (options.sort === "asc") {
					return dateA.getTime() - dateB.getTime();
				}

				return dateB.getTime() - dateA.getTime();
			});

			return acc;
		},
		{} as Record<string, Ride[]>,
	);

	return Object.keys(grouped)
		.sort((a, b) => {
			const [month, year] = a.split("/");
			const [month2, year2] = b.split("/");

			const dateA = new Date(`1/${month}/${year}`);
			const dateB = new Date(`1/${month2}/${year2}`);

			return dateB.getTime() - dateA.getTime();
		})
		.reduce(
			(acc, key) => {
				acc[key] = grouped[key];

				return acc;
			},
			{} as Record<string, Ride[]>,
		);
}
