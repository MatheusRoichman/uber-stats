import { Outlet } from "react-router";

import { Header } from "./components/header";

export function RootLayout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
