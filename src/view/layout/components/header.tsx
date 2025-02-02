import { Link } from "react-router";

import { LogoWhite } from "@/assets/illustrations/logo-white";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/cost-report", label: "Cost Report" },
	{ href: "/ride-history", label: "Ride History" },
];

export function Header() {
	return (
		<header className="bg-black text-white p-4">
			<div className="flex justify-between items-center max-w-5xl mx-auto">
				<Link to="/">
					<span className="sr-only">Home</span>
					<LogoWhite className="h-10 w-fit" />
				</Link>

				<nav className="hidden md:block">
					<ul className="flex items-center gap-6">
						{links.map((link) => (
							<li key={link.href}>
								<Link to={link.href} className="hover:underline">
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}
