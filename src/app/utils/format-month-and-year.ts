const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export function formatMonthAndYear(monthAndYear: string) {
	const [month, year] = monthAndYear.split("/");

	return `${months[Number.parseInt(month) - 1]} ${year}`;
}
