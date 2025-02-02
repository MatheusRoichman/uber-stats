import { useMemo } from "react";

import type { Ride } from "@/app/entities/ride";

import { groupRidesByMonthAndYear } from "../utils/group-rides-by-month-and-year";
import { formatMonthAndYear } from "../utils/format-month-and-year";

import { RideCard } from "./ride-card";

interface RidesListProps {
	rides: Ride[];
}

export function RidesList({ rides }: RidesListProps) {
	const ridesByMonthAndYear = useMemo(
		() => groupRidesByMonthAndYear(rides, { sort: "desc" }),
		[rides],
	);

	return (
		<div className="space-y-4">
			{Object.entries(ridesByMonthAndYear).map(([monthAndYear, rides]) => (
				<div key={monthAndYear}>
					<h2 className="font-bold text-2xl font-title">
						{formatMonthAndYear(monthAndYear)}
					</h2>

					<ul className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
						{rides.map((ride, index) => {
							const idx = index;

							return <RideCard key={`RIDE_${idx}`} ride={ride} />;
						})}
					</ul>
				</div>
			))}
		</div>
	);
}
